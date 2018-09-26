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
    <div class="text-xs-center pt-2 subheading teal--text text-lighten-2">Day/Night Tariff</div>
    <v-flex xs3 sm2 class="mx-auto mt-2">
      <hr class="teal lighten-2" xs2 offset-xs5 style="border:none;height:1px">
    </v-flex>
    <div v-show="successfullyChanged1">
      <v-layout>
        <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
          <v-form v-model="valid">
            <v-text-field v-model="standarChargeDay" label="Standing Charge (per day) (p)" :rules="standarChargeRules" v-on:click="setData" required></v-text-field>
            <v-text-field v-model="pricePerkWhDay" label="Price per kWh (p)" :rules="priceRules" v-on:click="setData" required></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout class="mt-5 pt-4" v-show="userSteps">
        <v-flex class="text-xs-center">
          <v-btn fab depressed color="indigo darken-1" class="white--text mr-5" v-on:click='energytariffs'>BACK</v-btn>
          <v-btn :disabled="!valid" fab depressed color="indigo darken-1" class="white--text" v-on:click="updateDayTariff">Next</v-btn>
        </v-flex>
      </v-layout>
      <v-layout class="mt-5 pt-4" v-show="!userSteps">
        <v-flex class="text-xs-center">
          <v-btn :disabled="!valid" fab depressed large outline v-on:click="updateDayTariff">Next</v-btn>
        </v-flex>
      </v-layout>
      <!--<v-layout class="mt-5 pt-4" v-show="saveData">
        <v-flex class="text-xs-center">
          <v-btn fab depressed color="pink darken-1" class="white--text mr-5" v-on:click="cancelData">Cancel</v-btn>
          <v-btn fab depressed color="pink darken-1" class="white--text" v-on:click="updateDayTariff">Save</v-btn>
        </v-flex>
      </v-layout>-->
      </div>
      <div v-show="successfullyChanged2">
        <v-layout>
          <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
            <v-form v-model="valid">
              <v-text-field v-model="pricePerkWhNight" label="Price per kWh (p)" :rules="priceRules" required></v-text-field>

              <v-dialog ref="dialog1" v-model="time1" :return-value.sync="startTime" persistent lazy full-width width="290px">
                <v-text-field slot="activator" v-model="startTime" label="Start Time" readonly></v-text-field>
                <v-time-picker v-model="startTime" actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="time1 = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog1.save(startTime)">OK</v-btn>
                </v-time-picker>
              </v-dialog>

            <v-dialog ref="dialog2" v-model="time2" :return-value.sync="endTime" persistent lazy full-width width="290px">
              <v-text-field slot="activator" v-model="endTime" label="End Time" readonly></v-text-field>
              <v-time-picker v-model="endTime" actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="time2 = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog2.save(endTime)">OK</v-btn>
              </v-time-picker>
            </v-dialog>

            </v-form>
          </v-flex>
        </v-layout>
        <v-layout >
          <v-flex class="text-xs-center" v-show="userSteps">
            <v-btn fab depressed color="indigo darken-1" class="white--text mr-5" @click="goBack">BACK</v-btn>
            <v-btn :disabled="!valid" fab depressed color="indigo darken-1" class="white--text" v-on:click="updateNightTariff">DONE</v-btn>
          </v-flex>
        </v-layout>
        <v-layout >
          <v-flex class="text-xs-center" v-show="!userSteps">
            <v-btn :disabled="!valid" fab depressed large outline v-on:click="updateNightTariff">Next</v-btn>
          </v-flex>
        </v-layout>
        </div>
      <div v-show="successfullyChanged">
        <p class="text-xs-center pt-5 subheading">
          <v-flex xs8 offset-xs2 sm6 offset-sm3 class="mt-3 pt-2">
            Thank you, your Day/Night Tariff
            has been successfully
            changed.
          </v-flex>
        </p>
        <br>
        <v-layout class="mt-5 pt-5">
          <v-flex class="text-xs-center">
            <v-btn @click="tariff" fab depressed color="indigo darken-1" class="white--text">DONE</v-btn>
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
      successfullyChanged1: true,
      successfullyChanged2: false,
      standarChargeDay: '10',
      pricePerkWhDay: '10',
      standarChargeNight: '10',
      pricePerkWhNight: '10',
      time1: false,
      time2: false,
      startTime:'00:00',
      endTime: '00:00',
      standarChargeRules: [
        v => !!v || 'Standing Charge is required',
        v => !isNaN(v) || 'Please Enter Number Only'
      ],
      priceRules: [
        v => !!v || 'Price per kWh is required',
        v => !isNaN(v) || 'Please Enter Number Only'
      ],
      startTimeRules: [
        v => !!v || 'Standing Charge is required',
      ],
      endTimeRules: [
        v => !!v || 'Standing Charge is required',
      ],
      saveData: false,
      editData: true,
      userSteps: true
    }
  },
  methods: {
    tariff () {
      if(localStorage.getItem('user_type') == 'prosumer'){
        this.$router.push('/tariff')
      }
      else{
        this.$router.push('/settings')
      }
    },
    energytariffs () {
      if(localStorage.getItem('user_type') == 'prosumer'){
        this.$router.push('/tariff')
      }
      else{
        this.$router.push('/settings')
      }
    },
    setData () {
      this.editData = false
      this.saveData = true
    },
    cancelData () {
      this.editData = true
      this.saveData = false
    },
    goBack () {
      var obj = this
      obj.successfullyChanged = false
      obj.successfullyChanged1 = true
      obj.successfullyChanged2 = false
    },
    getDayTariff () {
      var obj = this
      var path = '/user/get_day_tariff'
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
          console.log(response)
          if (response.data['success']){
            obj.standarChargeDay = response.data['standing_charge']
            obj.pricePerkWhDay = response.data['price_per_unit']
          }
        }).catch(function(response){
          obj.progress = false
          console.log(response)
        });
    },
    getNightTariff () {
      var obj = this
      var path = '/user/get_night_tariff'
      axios({
        method:'get',
        url: obj.$hostname + path,
        params: {},
        headers: {
          'Content-Type':'application/json',
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        }
      }).then(function(response) {
        console.log(response)
          obj.progress = false
          if (response.data['success']){
            obj.pricePerkWhNight = response.data['night_price_per_unit']
            obj.startTime = response.data['start_time']
            obj.endTime = response.data['end_time']
          }
        }).catch(function(response){
          obj.progress = false
          console.log(response)
        });
    },
    changeDNT1 () {
      var obj = this
      obj.successfullyChanged = false
      obj.successfullyChanged1 = false
      obj.successfullyChanged2 = true
    },
    updateDayTariff () {
      var obj = this
      obj.progress = true

      var path = '/user/update_day_tariff'
      axios({
        method:'put',
        url: obj.$hostname + path,
        params: {},
        headers: {
          'Content-Type':'application/json',
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        },
        data: {
          'standing_charge':obj.standarChargeDay,
          'price_per_unit':obj.pricePerkWhDay
        }
      })
        .then(function(response) {
          obj.progress = false
          if (response.data['success']){
            obj.editData = true
            obj.saveData = false
            obj.successfullyChanged = false
            obj.successfullyChanged1 = false
            obj.successfullyChanged2 = true
            if(localStorage.getItem('step') == 'tariffimport' ){
              localStorage.setItem('tafiff_option', '/tariffs/daynighttariff')
              localStorage.setItem('step', 'tariffs/daynighttariff')
            }
          }
        }).catch(function(response){
          obj.progress = false
          console.log(response)
        });
    },
    updateNightTariff () {
      var obj = this
      obj.progress = true
      var path = '/user/update_night_tariff'
      axios({
        method:'put',
        url: obj.$hostname + path,
        params: {},
        headers: {
          'Content-Type':'application/json',
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        },
        data: {
          'night_price_per_unit':obj.pricePerkWhNight,
          'start_time':obj.startTime,
          'end_time':obj.endTime
        }
      })
        .then(function(response) {
          obj.progress = false
          if (response.data['success']){
            obj.successfullyChanged = true
            obj.successfullyChanged1 = false
            obj.successfullyChanged2 = false
            if(localStorage.getItem('step') == 'tariffimport' || localStorage.getItem('step') == 'tariffs/daynighttariff'){
              if(localStorage.getItem('user_type') == 'prosumer') {
                localStorage.setItem('tafiff_option', '/tariffs/daynighttariff')
                localStorage.setItem('step', "tariffexport")
                obj.$router.push('/tariffexport')
              } else {
                localStorage.setItem('step', "nearlythere")
                localStorage.setItem('tafiff_option', '/tariffs/daynighttariff')
                obj.$router.push('/nearlythere')
              }
            }
          }
        }).catch(function(response){
          obj.progress = false
          console.log(response)
        });
    }
  },
  computed: {

  },
  mixins: [checkUser],
  created(){
    if(localStorage.getItem('step') == 'tariffexport' || localStorage.getItem('step') == 'nearlythere') {
      this.checkUserHome()
    } else {
      this.checkUser()
    }
    this.getDayTariff()
    this.getNightTariff()
    var step = localStorage.getItem('step')
    if ( step == 'tariffimport' || step == 'tariffs/daynighttariff') {
      this.userSteps = false
    }
  }
}
</script>

<style scoped>
</style>
