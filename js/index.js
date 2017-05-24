new Vue({
  el: '#app',
  data: {
      input: '',
      city: '',
      cities: [],
      results: [],
      searchFilters: false,
      show_modal: false,
      show_mobile_menu: false,
      modal_type: ''
  },
  
  methods: {
    getCities() {
      const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
            
      axios.get(url)
      .then(res => {
        this.cities = res.data;
      });
      
    },
    
    filterCities() {
      this.results = [];
      
      if ( this.input.length > 2 ) {
        
        clearTimeout(window.delay);

        window.delay = setTimeout(() => {
          this.results = _.filter(this.cities, obj => {
            return _.lowerCase(obj.city).includes(_.lowerCase(this.input));
          });
        }, 500);
        
      }
    },
    
    showMap(city) {
      this.city = city;
      this.modal_type = 'map';
      this.show_modal = true;
    },
    
    login() {
      this.modal_type = 'login';
      this.show_modal = true;
    },
    
    closeModal() {
      this.show_modal = false;
    },
    
    formattedNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
    }
  },
  
  created() {
    this.getCities();
  }
});




/* 
* ----------------
* MODAL COMPONENT
* ----------------
*/
Vue.component('modal', {
  template: '#modal',
  
  props: ['city', 'type'],
  
  data() {
    return {
      loaded: false,
      map_url: '',
      user: {
        email: '',
        password: ''
      }
    }
  },
  
  methods: {
    showMap() {
      const iframe = document.getElementById('iframe'),
            url = `https://www.google.com/maps/embed/v1/place?q=${this.city},United+States&key=AIzaSyBh0g0ArtnfdANIyo-xH8v61n2bxrhMdME`,
            // .onload will only work with es5 as of right now, so we need this
            self = this;
    
      this.map_url = url;
      
      iframe.onload = function() {
        self.loaded = true;
      }
    },
    
    login() {
      // handle auth
      console.log(this.user);
    },
    
    closeModal() {
      this.$emit('close_modal');
    }
  },
  
  mounted() {
    this.showMap();
  }
});







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