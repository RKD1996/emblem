<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <please-wait :progress="progress"></please-wait>
    <div class="text-xs-center pt-2 subheading teal--text text-lighten-2">Export Standard Flat Rate</div>
    <v-flex xs3 sm2 class="mx-auto mt-2">
      <hr class="teal lighten-2" xs2 offset-xs5 style="border:none;height:1px">
    </v-flex>
    <div v-show="!successfullyChanged">
      <v-layout>
        <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
          <v-form v-model="valid">
            <v-text-field v-model="standarCharge" label="Standing Charge (per day) (p)" :rules="standarChargeRules" required></v-text-field>
            <v-text-field v-model="pricePerkWh" label="Price per kWh (p)" :rules="priceRules" required></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout class="mt-4 pt-5">
        <v-flex class="text-xs-center">
          <v-btn fab depressed color="indigo darken-1" class="white--text mr-5" v-on:click="energytariffs">BACK</v-btn>
          <v-btn :disabled="!valid" fab depressed color="indigo darken-1" class="white--text" v-on:click="updateStandingRate">DONE</v-btn>
        </v-flex>
      </v-layout>
      </div>
      <div v-show="successfullyChanged">
        <p class="text-xs-center pt-5 subheading">
          <v-flex xs8 offset-xs2 sm6 offset-sm3 class="mt-5 pt-4">
            Thank you, your Standard Flat Rate
            has been successfully
            changed.
          </v-flex>
        </p>
        <br>
        <v-layout class="mt-4 pt-4">
          <v-flex class="text-xs-center">
            <v-btn v-on:click="energytariffs" fab depressed color="indigo darken-1" class="white--text">DONE</v-btn>
          </v-flex>
        </v-layout>
      </div>
  </v-container>
</template>


<script>
import checkUser from '../../../mixins/checkUserMixin'
import EmblemLogo from '../../useful/EmblemLogo.vue'
import axios from 'axios'
import PleaseWait from '../../useful/PleaseWait.vue'

export default {
  components: {
    "emblem-logo": EmblemLogo,
     "please-wait":  PleaseWait
  },
  data () {
    return {
      valid: false,
      progress: true,
      successfullyChanged: false,
      standarCharge: '0',
      pricePerkWh: '0',
      standarChargeRules: [
        v => !!v || 'Standing Charge is required',
        v => !isNaN(v) || 'Please Enter Number Only'
      ],
      priceRules: [
        v => !!v || 'Price per kWh is required',
        v => !isNaN(v) || 'Please Enter Number Only'
      ],
    }
  },
  methods: {
    tariff () {
      if(localStorage.getItem('user_type') == 'prosumer'){
        if(localStorage.getItem('step') == 'tariff'){
          this.$router.push('/energytariffs')
        }
      } else {
        this.$router.push('energytariffs')
      }
    },
    energytariffs () {
      this.$router.push('/tariff')
    },
    getStandingRate () {
      var obj = this
      var path = '/user/get_standing_rate?tariff_type=1'
      axios({
        method:'get',
        url: this.$hostname + path,
        params: {},
        headers: {
          'Content-Type':'application/json',
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        }
      }).then(function(response) {
          obj.progress = false
          if (response.data['success']){
            obj.standarCharge = response.data['standing_charge']
            obj.pricePerkWh = response.data['price_per_unit']
          }
        }).catch(function(response){
          obj.progress = false
          console.log(response)
        });
    },
    updateStandingRate () {
      var obj = this
      if(obj.standarCharge != '' && obj.pricePerkWh != '' ){
        obj.progress = true
      var path = '/user/update_standing_rate?tariff_type=1'
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
          'standing_charge':obj.standarCharge,
          'price_per_unit':obj.pricePerkWh
        }
      })
        .then(function(response) {
          obj.progress = false
          if (response.data['success']){
            obj.successfullyChanged = true
            if(localStorage.getItem('step') == 'savings'){
            } else {
              localStorage.setItem('step', "tariffs/standardflatrate")
            }
          }
        }).catch(function(response){
          obj.progress = false
          console.log(response)
        });
      }
    }
  },
  computed: {

  },
  mixins: [checkUser],
  created(){
    this.checkUser()
    this.getStandingRate()
  }
}
</script>

<style scoped>
</style>
