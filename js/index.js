var app = new Vue({
  el: '.site-content',
  
  data: {
    headline: `Search a City`,
    citySearch: 'boulder',
    cities: [],
    relevantCities: [],
    showMap: false
    // end data
  },
  methods: {
    
    addCity() {
      this.defaultCity = '';
      if (this.citySearch !== '') {
        this.lookupCity();
      }
    },
    
    lookupCity() {
      var cityName = this.citySearch;
      // City data
      const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
      // Use axios library to make request
      axios
        .get(endpoint)
        .then((response) => {
          this.cities = response.data;
        })
        .catch(err => console.log(err));
      // this.citySearch = '';
    },
    formattedNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
    }
        
  }, // end methods
  computed: {
    filteredCities() {
      let searched = this.citySearch;
      
      if (searched === '') this.cities = []; 
      
      return this.cities.filter((city) => {
        return city.city.toLowerCase().indexOf( searched.toLowerCase() ) > -1 || city.state.toLowerCase().indexOf( searched.toLowerCase() ) > -1;
      });
    }
    
  } // end computed
});



var modal = Vue.component('modal', {
  props: [ 'title' ],
  template: `
    <div class="modal is-active">
      <div class="modal-background" @click="$emit('close')"></div>
      <div class="modal-card">
        <header class="modal-card-head">

          <p class="modal-card-title">View {{ title }} on a map</p>

          <button class="delete" @click="$emit('close')"></button>
        </header>
        <section class="modal-card-body">

          <iframe width="100%" height="350" frameborder="0" style="border:0"
                  src="https://www.google.com/maps/embed/v1/place?q={{title}},United+States&key=AIzaSyBh0g0ArtnfdANIyo-xH8v61n2bxrhMdME">
          </iframe>

        </section>
        <footer class="modal-card-foot">

          <a class="button is-success">Save changes</a>
          <a class="button">Cancel</a>

        </footer>
      </div>
    </div>
  `
});

/* TO DO

- add st, th, nd to numbers on ranking
- map popup with google embed and co-ordinates
- top 10 things to do via yelp
- top 10 places to eat via zomatos */


//// Typed JS
//
//document.addEventListener('DOMContentLoaded', function(){
//    Typed.new('.city-search', {
//      strings: ["First sentence.", "Second sentence."],
//      attribute: 'placeholder',
//      typeSpeed: 75,
//      backDelay: 500,
//      loop: true
//    });
//  
//});
