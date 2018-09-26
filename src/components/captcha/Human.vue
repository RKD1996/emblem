<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <p class="text-xs-center pt-4 subheading">Please confirm you are human!</p>
    <div class="text-xs-center pt-0 subheading red--text" v-show="bots">You are a Bot and We hate them!</div>

    <please-wait :progress=progress></please-wait>

    <v-layout row>
      <v-flex class="text-xs-center">
        <recaptcha ref="recaptcha" @verify="submit"></recaptcha>
        <br><br><br><br><br><br>
        <v-btn @click="executeRecaptcha" fab depressed large outline>Next</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import EmblemLogo from '../useful/EmblemLogo.vue'
import Recaptcha from './Recaptcha.vue'
import PleaseWait from '../useful/PleaseWait.vue'
import axios from 'axios'
import checkUser from '../../mixins/checkUserMixin'

export default {
  components: {
    "emblem-logo": EmblemLogo,
    "recaptcha": Recaptcha,
    "please-wait":  PleaseWait
  },
  data () {
    return {
      bots: false,
      progress: false
    }
  },
  methods: {
    // send your recaptcha token to the server to verify it
    submit (response) {
      console.log("21jhdcsds")
    },
    executeRecaptcha: function(){
      var obj = this
      this.progress = true
     axios({
       method: 'post',
       url: this.$hostname + '/verify_recaptcha',
       data: {
         response: window.grecaptcha.getResponse()
       },
       headers: {
         'access-token': localStorage.getItem('access-token'),
         'uid': localStorage.getItem('uid'),
         'client': localStorage.getItem('client')
       }
     }).then(function(response){
       obj.progress = false
       var res = response.data
       if (res['success'] == true){
         console.log('ok')
         localStorage.setItem('step', "pin")
         localStorage.setItem('time', Date())
         obj.$router.push('/pin')
       } else {
         console.log(response)
         obj.bots = true
       }
     }).catch(function(response){
       obj.progress = false
       console.log(response)
     })
   }
  },
  mixins: [checkUser],
  created(){
    this.checkUserHome()
  }
}
</script>



<style lang="scss" scoped>
.g-recaptcha{
  margin-top: 20px;
  text-align: -webkit-center;
  text-align: -moz-center;
  text-align: -o-center;
  text-align: -ms-center;
}
</style>
