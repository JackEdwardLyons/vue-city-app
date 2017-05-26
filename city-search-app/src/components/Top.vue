<template>
  <!-- Navigation  -->
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
          </a>
          <a class="nav-item is-tab is-hidden-mobile">Features</a>
          <a class="nav-item is-tab is-hidden-mobile">Pricing</a>
          <a class="nav-item is-tab is-hidden-mobile">About</a>
        </div>
        <span class="nav-toggle" @click="show_mobile_menu = !show_mobile_menu"
          :class="{'is-active': show_mobile_menu}">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu"
             :class="{'is-active': show_mobile_menu}">
          <a class="nav-item is-tab" @click="login()">Log In</a>
        </div>
      </div>
    </nav>
    <!-- End Navigtion -->
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      show_mobile_menu: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
