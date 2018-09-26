<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <div class="text-xs-center pt-2 subheading teal--text text-lighten-2">Tariffs</div>
    <v-flex xs3 sm2 class="mx-auto mt-2">
      <hr class="teal lighten-2" xs2 offset-xs5 style="border:none;height:1px">
    </v-flex>
    <v-layout class="pt-1 mt-5">
      <v-flex></v-flex>
    </v-layout>
    <!--<v-flex xs6 class="mx-auto mt-4">
      <div class="subheading" v-centrify>Use the arrows to adjust your maximum price in pence per kilowatt hour.</div>
    </v-flex>-->
    <please-wait :progress="progress"></please-wait>
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="standardflatrate">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Standing Flat Rate
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </div>
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="daynighttariff">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Day/Night Tariff
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" /></div>
          </v-flex>
        </v-layout>
        <!--<hr class="indigo darken-1" style="border:none;height:1px">-->
      </v-flex>
    </v-layout>
    <!--<v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="basicblock">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Basic Block
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" /></div>
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="timeofuse">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Time of Use
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" /></div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>-->
    <v-layout class="mt-5 pt-5" v-show="userSteps">
      <v-flex class="text-xs-center">
        <v-btn fab depressed color="indigo darken-1" class="white--text" to="/tariff">BACK</v-btn>
      </v-flex>
    </v-layout>
    <v-layout class="mt-5 pt-3" v-show="!userSteps">
      <v-flex class="text-xs-center">
        <v-btn @click="nearlythere" fab depressed large outline>Next</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import FooterLogo from '../useful/FooterNavBar.vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import axios from 'axios'
import checkUser from '../../mixins/checkUserMixin'
import PleaseWait from '../useful/PleaseWait.vue'
import EmblemLogo from '../useful/EmblemLogo.vue'

export default {
  components: {
    "emblem-logo": EmblemLogo,
    "please-wait":  PleaseWait,
    "footer-logo": FooterLogo,
     FontAwesomeIcon,
  },
  computed: {
    faCaretRight () {
      return faCaretRight
    }
  },
  data () {
    return {
      progress: false,
      userSteps: true
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    nearlythere () {
      if(localStorage.getItem('user_type') == 'prosumer'){
        this.$router.push('tariff')
      } else {
        localStorage.setItem('step', "nearlythere")
        this.$router.push('nearlythere')
      }
    },
    standardflatrate () {
      this.$router.push('tariffs/standardflatrate')
    },
    daynighttariff () {
      this.$router.push('tariffs/daynighttariff')
    },
    basicblock () {
      this.$router.push('tariffs/basicblock')
    },
    timeofuse () {
      this.$router.push('tariffs/timeofuse')
    }
  },
  mixins: [checkUser],
  created(){
    this.checkUser()
    var step = localStorage.getItem('step')
    if ( step == 'tariff') {
      this.userSteps = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
