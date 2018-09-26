<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <div class="text-xs-center pt-2 subheading teal--text text-lighten-2">Time of Use</div>
    <v-flex xs3 sm2 class="mx-auto mt-2">
      <hr class="teal lighten-2" xs2 offset-xs5 style="border:none;height:1px">
    </v-flex>
    <div v-show="!successfullyChanged1">
      <v-layout>
        <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
          <v-form v-model="valid">
            <v-text-field v-model="standarCharge" label="Standing Charge" :rules="standarChargeRules" required></v-text-field>
            <v-text-field v-model="offPeakRate" label="Off-peak Rate" :rules="offPeakRateRules" required></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout class="mt-4 pt-4">
        <v-flex class="text-xs-center">
          <v-btn fab depressed color="indigo darken-1" class="white--text mr-5" to='/energytariffs'>BACK</v-btn>
          <v-btn fab depressed color="indigo darken-1" class="white--text" v-on:click="changeTOU1">DONE</v-btn>
        </v-flex>
      </v-layout>
      </div>
      <div v-show="!successfullyChanged2">
        <v-layout>
          <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
            <div class="text-xs-center pt-2 subheading black--text text-lighten-2">Weekday Shoulder</div>
            <v-form v-model="valid">
              <v-text-field v-model="pricePerkWh" label="Price per kWh" :rules="priceRules" required></v-text-field>
              <v-text-field v-model="startTime" label="Start Time" :rules="startTimeRules" required></v-text-field>
              <v-text-field v-model="endTime" label="End Time" :rules="endTimeRules" required></v-text-field>
            </v-form>
          </v-flex>
        </v-layout>
        <v-layout class="mt-4 pt-4">
          <v-flex class="text-xs-center">
            <v-btn fab depressed color="indigo darken-1" class="white--text mr-5" v-on:click="goBack">BACK</v-btn>
            <v-btn fab depressed color="indigo darken-1" class="white--text" v-on:click="changeTOU2">DONE</v-btn>
          </v-flex>
        </v-layout>
        </div>
        <div v-show="!successfullyChanged3">
          <v-layout>
            <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
              <div class="text-xs-center pt-2 subheading black--text text-lighten-2">Weekday Peak</div>
              <v-form v-model="valid">
                <v-text-field v-model="pricePerkWh" label="Price per kWh" :rules="priceRules" required></v-text-field>
                <v-text-field v-model="startTime" label="Start Time" :rules="startTimeRules" required></v-text-field>
                <v-text-field v-model="endTime" label="End Time" :rules="endTimeRules" required></v-text-field>
              </v-form>
            </v-flex>
          </v-layout>
          <v-layout class="mt-4 pt-4">
            <v-flex class="text-xs-center">
              <v-btn fab depressed color="indigo darken-1" class="white--text mr-5" v-on:click="goBack">BACK</v-btn>
              <v-btn fab depressed color="indigo darken-1" class="white--text" v-on:click="changeTOU3">DONE</v-btn>
            </v-flex>
          </v-layout>
          </div>
      <div v-show="!successfullyChanged">
        <p class="text-xs-center pt-5 subheading">
          <v-flex xs8 offset-xs2 sm6 offset-sm3 class="mt-5 pt-4">
            Thank you, your Day/Night Tariff
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
import checkUser from '../../mixins/checkUserMixin'
import EmblemLogo from '../useful/EmblemLogo.vue'

export default {
  components: {
    "emblem-logo": EmblemLogo,

  },
  data () {
    return {
      valid: false,
      successfullyChanged: true,
      successfullyChanged1: false,
      successfullyChanged2: true,
      successfullyChanged3: true,
      standarCharge: '',
      offPeakRate: '',
      pricePerkWh: '',
      startTime: '',
      endTime: '',
      standarChargeRules: [
        v => !!v || 'Standing Charge is required',
      ],
      offPeakRateRules: [
        v => !!v || 'Price per kWh is required'
      ],
      priceRules: [
        v => !!v || 'Price per kWh is required'
      ],
      startTimeRules: [
        v => !!v || 'Standing Charge is required',
      ],
      endTimeRules: [
        v => !!v || 'Standing Charge is required',
      ],
    }
  },
  methods: {
    goBack () {
      var obj = this
      obj.successfullyChanged = true
      obj.successfullyChanged1 = false
      obj.successfullyChanged2 = true
      obj.successfullyChanged3 = true

    },
    changeTOU1 () {
      var obj = this
      obj.successfullyChanged = false
      obj.successfullyChanged1 = true
      obj.successfullyChanged2 = false
      obj.successfullyChanged3 = false
      localStorage.setItem('standarCharge', this.standarCharge)
      localStorage.setItem('offPeakRate', this.offPeakRate)
    },
    changeTOU2 () {
      var obj = this
      var shoulder = {"pricePerkWh":this.pricePerkWh,"startTime":this.startTime,"endTime":this.endTime}
      localStorage.setItem('shoulder', shoulder)
      obj.successfullyChanged = true
      obj.successfullyChanged1 = true
      obj.successfullyChanged2 = true
      obj.successfullyChanged3 = false
    },
    changeTOU3 () {
      var obj = this
      var peak = {"pricePerkWh":this.pricePerkWh,"startTime":this.startTime,"endTime":this.endTime}
      localStorage.setItem('peak', peak)
      obj.successfullyChanged = false
      obj.successfullyChanged1 = true
      obj.successfullyChanged2 = true
      obj.successfullyChanged3 = true

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
  computed: {

  },
  mixins: [checkUser],
  created(){
    this.checkUser()
  }
}
</script>

<style scoped>
</style>
