<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <div class="text-xs-center pt-2 subheading teal--text text-lighten-2">Basic Block</div>
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
    <div v-show="!successfullyChanged1">
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="daily">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Daily
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </div>
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="weekly">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Weekly
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" /></div>
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="monthly">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Monthly
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" /></div>
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="quarterly">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Quarterly
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" /></div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout class="mt-1 pt-1">
      <v-flex class="text-xs-center">
        <v-btn fab depressed color="indigo darken-1" class="white--text" to="/energytariffs">BACK</v-btn>
      </v-flex>
    </v-layout>
  </div>
  <div v-show="!successfullyChanged2">
    <v-layout>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
        <v-form v-model="valid">
          <v-text-field v-model="standarCharge" label="Standing Charge" :rules="standarChargeRules" required></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="newBlock">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Add a new block
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" /></div>
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-4 pt-4">
      <v-flex class="text-xs-center">
        <v-btn fab depressed color="indigo darken-1" class="white--text mr-5" v-on:click="goBack">BACK</v-btn>
        <v-btn fab depressed color="indigo darken-1" class="white--text" v-on:click="submit" >DONE</v-btn>
      </v-flex>
    </v-layout>
  </div>
  <div v-show="!successfullyChanged">
    <p class="text-xs-center pt-5 subheading">
      <v-flex xs8 offset-xs2 sm6 offset-sm3 class="mt-5 pt-4">
        Thank you, your Basic Block
        has been successfully
        changed.
      </v-flex>
    </p>
    <br>
    <v-layout class="mt-5 pt-5">
      <v-flex class="text-xs-center">
        <v-btn to="/energytariffs" fab depressed color="indigo darken-1" class="white--text">DONE</v-btn>
      </v-flex>
    </v-layout>
  </div>
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
      valid: false,
      progress: false,
      successfullyChanged: true,
      successfullyChanged1: false,
      successfullyChanged2: true,
      standarCharge: '',
      standarChargeRules: [
        v => !!v || 'Standing Charge is required',
      ]
    }
  },
  methods: {
    goBack () {
      var obj = this
      obj.successfullyChanged = true
      obj.successfullyChanged1 = false
      obj.successfullyChanged2 = true
    },
    daily () {
      var obj = this
      localStorage.setItem('timescale', 'daily')
      obj.successfullyChanged = true
      obj.successfullyChanged1 = true
      obj.successfullyChanged2 = false
    },
    weekly () {
      var obj = this
      localStorage.setItem('timescale', 'weekly')
      obj.successfullyChanged = true
      obj.successfullyChanged1 = true
      obj.successfullyChanged2 = false
    },
    monthly () {
      var obj = this
      localStorage.setItem('timescale', 'monthly')
      obj.successfullyChanged = true
      obj.successfullyChanged1 = true
      obj.successfullyChanged2 = false
    },
    quarterly () {
      var obj = this
      localStorage.setItem('timescale', 'quarterly')
      obj.successfullyChanged = true
      obj.successfullyChanged1 = true
      obj.successfullyChanged2 = false
    },
    newBlock () {
      this.$router.push('newblock')
    },
    submit () {
      var obj = this
      obj.successfullyChanged = false
      obj.successfullyChanged1 = true
      obj.successfullyChanged2 = true
      /*this.progress = true

      var path = ''
      console.log(this.$hostname + path)
      axios({
        method:'put',
        url: this.$hostname + path,
        params: {},
        headers: {
          'Content-Type':'application/json',
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        },
        data: {
          //Standar Flat Rate datas
        }
      })
        .then(function(response) {
          obj.progress = false
          if (response.data['success']){
            obj.successfullyChanged = true
            console.log(response)
          }
        }).catch(function(response){
          obj.progress = false
          console.log(response)
        });*/
    }
  },
  mixins: [checkUser],
  created(){
    this.checkUser()
  }
}
</script>

<style lang="scss" scoped>

</style>
