<template>
  <!-- Heading and Search -->
  <div class="columns">
    <div class="column has-text-centered">

      <h2 class="bold">Search a City</h2>

      <!-- SEARCHBAR -->
      <div class="searchbar">
          <input class="input control city-search" type="text" 
            placeholder="City Name"
            v-model="input"
            @keyup="filterCities()">
          <!-- Search -->
          <a class="button is-primary control city-search--btn" 
              @click="filterCities()">Search
          </a>
          <!-- Filter -->
          <a class="button is-success" @click="searchFilters = !searchFilters">
            <i class="fa fa-sliders" aria-hidden="true"></i>
          </a>

          <div class="results--filter columns" v-show="searchFilters">
            <div class="column">
              <div class="filter-field">
                <div class="control">
                    <p class="bold">Search by</p>
                    <label class="filter-label">
                      <input class="filter-label--checkbox" type="radio" name="city-state" /> 
                      City
                    </label>
                    <label class="filter-label">
                      <input class="filter-label--checkbox" type="radio" name="city-state" /> 
                      State
                    </label>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="filter-field">
                <div class="control">
                  <p class="bold">City Population</p>
                  <label class="filter-label">
                    <input class="filter-label--checkbox" type="checkbox" /> 
                    &lt; 50,000
                  </label>
                  <label class="filter-label">
                    <input class="filter-label--checkbox" type="checkbox" /> 
                    &gt; 50,000 &amp; &lt; 100,000
                  </label>
                  <label class="filter-label">
                    <input class="filter-label--checkbox" type="checkbox" /> 
                    &gt; 100,000 &amp; &lt; 500,000
                  </label>
                  <label class="filter-label">
                    <input class="filter-label--checkbox" type="checkbox" /> 
                    &gt; 500,000 &amp; &lt; 1,000,000
                  </label>
                  <label class="filter-label">
                    <input class="filter-label--checkbox" type="checkbox" /> 
                    &nbsp;&nbsp; 1,000,000+
                  </label>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="filter-field">
                <div class="control">
                  <p class="bold">Rank</p>
                  <label class="filter-label">
                    <input class="filter-label--checkbox" type="radio" name="city-rank" /> 
                    Ascending
                  </label>
                  <label class="filter-label">
                    <input class="filter-label--checkbox" type="radio" name="city-rank" /> 
                    Descending
                  </label>
                </div>
              </div>
            </div>
          </div>

      </div><!-- end .searchbar -->
    </div>
  </div><!-- end Heading and Search -->
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'searchbox',
  data () {
    return {
      input: '',
      city: '',
      cities: [],
      searchFilters: false
    }
  },
  methods: {
    filterCities () {
      this.results = []
      if (this.input.length > 2) {
        clearTimeout(window.delay)
        window.delay = setTimeout(() => {
          this.results = _.filter(this.cities, obj => {
            return _.lowerCase(obj.city).includes(_.lowerCase(this.input))
          })
        }, 500)
      }
    },
    getCities () {
      const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
      axios.get(url)
      .then(res => {
        this.cities = res.data
      })
    }
  },
  created () {
    this.getCities()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
