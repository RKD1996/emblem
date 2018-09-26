<template>
  <v-container>
    <p class="text-xs-center pt-1 mt-1 subheading">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>This is a Testing File</v-flex>
    </p>
    <div class="text-xs-center pt-1 mt-1 title">
    Welcome to
    </div>
    <v-flex xs5 sm2 class="mx-auto">
      <hr class="mt-1 black" style="height:1px;border:none;">
    </v-flex>
    <v-layout>
      <v-flex>
        <div class="logo mt-1">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <please-wait :progress="progress"></please-wait>
    <v-layout row>
      <v-flex class="text-xs-center">
        <br>
        <v-btn @click="details" fab depressed large outline>Detail</v-btn>
        <v-btn @click="logout" fab depressed large outline>Logout</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="text-xs-left">
        <b>Access-token</b> : {{allData['access-token']}}<br>
        <b>Client</b> : {{allData['client']}}<br>
        <b>Uid</b> : {{allData['uid']}}<br>
        <b>User Type</b> : {{allData['user_type']}}<br>
        <b>Step</b> : {{allData['step']}}<br>
        <b>Tariff Option</b> : {{allData['tafiff_option']}}<br>
        <b>Time</b> : {{allData['time']}}
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import EmblemLogo from '../useful/EmblemLogo.vue'
import PleaseWait from '../useful/PleaseWait.vue'
import axios from 'axios'

export default {
  components: {
    "emblem-logo": EmblemLogo,
    "please-wait":  PleaseWait
  },
  data () {
    return {
      progress: false,
      allData: ''
    }
  },
  methods: {
    details (){
      this.allData = localStorage
      console.log(localStorage)
      console.log(sessionStorage)
      var time1 = new Date(localStorage.getItem("time"))
      var time2 = new Date();
      var diff =(time2.getTime() - time1.getTime()) / 1000;
      diff /= 60;
      diff = Math.abs(Math.round(diff));
      console.log("Time Difference :: "+diff);
    },
    logout (){
      var obj = this
      //var Content-Type = "application/json"
      this.progress = true
      console.log(this.$hostname + '/auth/sign_out')
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
            //obj.$router.push('/')
          }
        }).catch(function(response){
          obj.progress = false
          //console.log(response)
        })
        localStorage.clear()
        sessionStorage.clear()
        //obj.$router.push('/')
      console.log(localStorage)
      console.log(sessionStorage)
    }
  },
  created(){
    //localStorage.setItem('step', "energysetup")
    //localStorage.setItem('step', 'tariffimport')
    //localStorage.setItem('tafiff_option', '/tariffs/daynighttariff')
    //localStorage.setItem('step', 'savings')
  }
}
</script>


<style lang="scss" scoped>
</style>
