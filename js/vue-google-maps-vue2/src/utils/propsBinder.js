/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

const _ = require('lodash');
const assert = require('assert');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default (vueElement, googleMapsElement, props, options) => {
  options = options || {};
  var {afterModelChanged} = options;
  _.forEach(props, ({twoWay, type, trackProperties}, attribute) => {
    const setMethodName = 'set' + capitalizeFirstLetter(attribute);
    const getMethodName = 'get' + capitalizeFirstLetter(attribute);
    const eventName = attribute.toLowerCase() + '_changed';
    const initialValue = vueElement[attribute];

    assert(googleMapsElement[setMethodName], `${setMethodName} is not a method of (the Maps object corresponding to) ${vueElement.$options._componentTag}`);

    // We need to avoid an endless
    // propChanged -> event emitted -> propChanged -> event emitted loop
    // although this may really be the user's responsibility
    var timesSet = 0;
    if (type !== Object || !trackProperties) {
      // Track the object deeply
      vueElement.$watch(attribute, () => {
        const attributeValue = vueElement[attribute];

        timesSet++;
        googleMapsElement[setMethodName](attributeValue);
        if (afterModelChanged) {
          afterModelChanged(attribute, attributeValue);
        }
      }, {
        immediate: typeof initialValue !== 'undefined',
        deep: type === Object
      });
    } else if (type === Object && trackProperties) {
      // The indicator variable that is updated whenever any of the properties have changed
      // This ensures that the event handler will only be fired once
      let attributeTrackerName = `_${attribute}_changeTracker`;
      let attributeTrackerRoot = '$data._changeIndicators';
      const attributeValue = vueElement[attribute];

      vueElement.$set(vueElement.$data._changeIndicators, attributeTrackerName, 0);

      vueElement.$watch(attributeTrackerRoot + '.' + attributeTrackerName, () => {
        googleMapsElement[setMethodName](vueElement[attribute]);
        if (afterModelChanged) {
          afterModelChanged(attribute, attributeValue);
        }
      }, {
        immediate: typeof initialValue !== 'undefined',
      });

      trackProperties.forEach(propName => {
        vueElement.$watch(`${attribute}.${propName}`, () => {
          vueElement.$set(attributeTrackerRoot, attributeTrackerName,
            vueElement.$get(attributeTrackerRoot, attributeTrackerName) + 1);
        }, {
          immediate: typeof initialValue !== 'undefined',
        });
      });
    }

    if (twoWay) {
      googleMapsElement.addListener(eventName, (ev) => { // eslint-disable-line no-unused-vars
        if (timesSet > 0) {
          timesSet --;
          return;
        }
        else {
          vueElement.$emit(eventName, googleMapsElement[getMethodName]());
        }
      }
      );
    }
  });
};
