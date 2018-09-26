<template>
  <div>
  <v-container>
    <v-layout class="mt-2 pb-5">
      <v-flex>
        <div class="text-xs-center headline">SETTINGS</div>
      </v-flex>
    </v-layout>
    <please-wait :progress="progress"></please-wait>
    <v-layout class="mt-1">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-1" @click="account">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Change your account information</div>
          </v-flex>
          <v-flex xs2 class="mt-1">
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-1">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-1" @click="energyparameter">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Change your energy pricing parameters</div>
          </v-flex>
          <v-flex xs2 class="mt-1">
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-1">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-1" @click="tariff">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Change your energy tariff</div>
          </v-flex>
          <v-flex xs2 class="mt-1">
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-1">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-1" @click="logout">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Sign out of your EMBLEM account</div>
          </v-flex>
          <v-flex xs2 class="mt-1">
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
  <footer-nav v-show="active"></footer-nav>
  <footer-nav-con v-show="!active"></footer-nav-con>
</div>
</template>


<script>
import nav2 from '../useful/FooterNavBarconsumer.vue';
import nav1 from '../useful/FooterNavBar.vue';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import axios from 'axios'
import checkUser from '../../mixins/checkUserMixin'
import PleaseWait from '../useful/PleaseWait.vue'

export default {
  components: {
    "please-wait":  PleaseWait,
    "footer-nav": nav1,
    "footer-nav-con": nav2,
     FontAwesomeIcon,
  },
  computed: {
    faCaretRight () {
      return faCaretRight
    }
  },
  data () {
    return {
      active: true,
      progress: false
    }
  },
  methods: {
    account () {
      this.$router.push('settings/account')
    },
    energyparameter () {
      this.$router.push('energyparameter')
    },
    check () {
      if(localStorage.getItem('user_type') == 'prosumer'){
        this.active = true
      }
      else{
        this.active = false
      }
    },
    tariff () {
      if(localStorage.getItem('user_type') == 'prosumer'){
        this.$router.push('tariff')
      }
      else{
        var path = localStorage.getItem('tafiff_option')
        this.$router.push(path)
      }
    },
    logout () {
      var obj = this
      //var Content-Type = "application/json"
      this.progress = true
      axios({
        method:'delete',
        url: this.$hostname + '/auth/sign_out',
        params: {},
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        }
      })
        .then(function(response) {
          obj.progress = false
          if (response.data['success']){
            localStorage.clear()
            sessionStorage.clear()
            obj.$router.push('/')
          }
        }).catch(function(response){
          obj.progress = false
        });
    }
  },
  mixins: [checkUser],
  created(){
    this.checkUser()
    this.check()
  }
}
</script>

<style lang="scss" scoped>

</style>
