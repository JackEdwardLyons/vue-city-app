<template>
  <div id="app">
    <Top></Top>
    <SearchBox></SearchBox>
    <!-- Modal -->
    <Modal v-if="show_modal" 
            :city="city"
            :type="modal_type"
            @close_modal="closeModal">
    </Modal> 
    <Bottom></Bottom>
  </div>
</template>

<script>
import Top from './components/Top'
import SearchBox from './components/SearchBox'
import Modal from './components/Modal'
import Bottom from './components/Bottom'

export default {
  name: 'app',
  components: {
    Top, SearchBox, Modal, Bottom
  },
  data () {
    return {
      input: '',
      city: '',
      cities: [],
      results: [],
      searchFilters: false,
      show_modal: false,
      show_mobile_menu: false,
      modal_type: ''
    }
  }
}
</script>

<style>

</style>
