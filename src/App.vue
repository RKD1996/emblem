<template>
  <v-app id="app">
    <v-content>
      <router-view v-show="portrait"></router-view>
      <v-container fill-height v-show="!portrait">
        <v-layout row align-center justify-center >
          <v-flex xs10 offset-xs1 sm10 offset-sm1>
            <div class="black--text title">We do not support Landscape mode yet.</div>
            <div class="black--text title" >Please rotate your device to portrait mode for best experience.</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>



<script>

export default {
  name: 'app',
  components: {
  },
  
  data () {
    return {
      portrait: false
    }
  },
  methods: {
    handleResize: function() {
      if(
        (window.innerHeight < window.innerWidth) &&
        (window.innerWidth < 800) &&
        (window.innerWidth > 450)
      ){
        this.portrait = false
      } else {
        this.portrait = true
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
}
</script>

<style lang="scss" scoped>
</style>
