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
    <div v-show = "pro">
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="importTariff">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Import
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </div>
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="exportTariff">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Export
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" /></div>
          </v-flex>
        </v-layout>
        <!--<hr class="indigo darken-1" style="border:none;height:1px">-->
      </v-flex>
    </v-layout>
  </div>
  <div v-show = "!pro">
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="importTariff">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Import
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </div>
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
  </div>
    <v-layout class="mt-5 pt-5" v-show="userSteps">
      <v-flex class="text-xs-center">
        <v-btn fab depressed color="indigo darken-1" class="white--text" to="/settings">BACK</v-btn>
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
      userSteps: true,
      pro: false
    }
  },
  methods: {
    nearlythere () {
      localStorage.setItem('step', "nearlythere")
      this.$router.push('nearlythere')
    },
    importTariff () {
      var path = localStorage.getItem('tafiff_option', '/tariffs/standardflatrate')
      this.$router.push(path)
    },
    exportTariff () {
      this.$router.push('tariffs/standardrate')
    }
  },
  mixins: [checkUser],
  created(){
    this.checkUser()
    var step = localStorage.getItem('step')
    if ( step == 'tariff') {
      this.userSteps = false
    }
    if(localStorage.getItem('user_type') == 'prosumer'){
      this.pro = true
    } else {
      this.$router.push('energytariffs')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
