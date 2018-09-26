<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <p class="text-xs-center pt-4 subheading">
      Thanks!
      <v-spacer></v-spacer>
      <v-flex xs8 offset-xs2>Please enter the 4-digit pin you have been given.</v-flex>
    </p>
    <v-layout row v-show="incorrectPin" class="mb-2">
      <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4>
        <v-alert color="error" :value="true" transition="scale-transition">
          <v-icon>error</v-icon>
          {{ errorMsg }}
        </v-alert>
      </v-flex>
    </v-layout>
    <br>

    <please-wait :progress=progress></please-wait>


    <v-layout row>
      <v-flex class="text-xs-center" xs10 offset-xs1 sm4 offset-sm4>
        <div class="pin-box">
          <input type="number" v-model="a" onKeyDown="if(this.value.length==1) return false;" maxlength=1 id="a" v-on:keyup="moveNext('a','b')" />
          <input type="number" v-model="b" onKeyDown="if(this.value.length==1) return false;" maxlength=1 id="b" v-on:keyup="moveNext('b','c')" />
          <input type="number" v-model="c" onKeyDown="if(this.value.length==1) return false;" maxlength=1 id="c" v-on:keyup="moveNext('c','d')" />
          <input type="number" v-model="d" onKeyDown="if(this.value.length==1) return false;" maxlength=1 id="d" v-on:keyup="checkPin" />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import EmblemLogo from '../useful/EmblemLogo.vue'
import PleaseWait from '../useful/PleaseWait.vue'
import axios from 'axios'
import checkUser from '../../mixins/checkUserMixin'

export default {
  components: {
    "emblem-logo": EmblemLogo,
    "please-wait":  PleaseWait
  },
  data () {
    return {
      a: '',
      b: '',
      c: '',
      d: '',
      errorMsg: '',
      incorrectPin: false,
      progress: false
    }
  },
  methods: {
    moveNext: function (fieldID, nextFieldID) {
      this.incorrectPin = false
      this.pinAssigned = false
      var field = document.getElementById(fieldID)
      if (field.value.length == 1) {
        document.getElementById(nextFieldID).focus();
      }
    },
    reset: function() {
      this.a = ''
      this.b = ''
      this.c = ''
      this.d = ''
    },
    checkPin: function() {
      this.progress = true
      var obj = this
      //document.getElementById('d').disabled = true
      var enteredPin = this.a + this.b + this.c + this.d
      axios({
        method:'get',
        url: this.$hostname + '/user/checkpin',
        params: {
          entered_pin: enteredPin
        },
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        }
      })
        .then(function(response) {
          //console.log(response)
          obj.progress = false
          if (response.data['success']){
            localStorage.setItem('user_type', response.data['user_type'])
            localStorage.setItem('step', "energysetup")
            localStorage.setItem('time', Date())
            obj.$router.push('/energysetup')
          } else {
            obj.errorMsg = response.data['message']
            obj.incorrectPin = true
            obj.reset()
            obj.focus('a')
          }
        }).catch(function(response){
          obj.progress = false
        });
    },
    focus: function(input) {
      document.getElementById(input).focus();
    },
    allowOneDigit: function(value){
      if(value.length==1) return false;
    }
  },
  mounted() {
    this.focus('a')
  },
  mixins: [checkUser],
  created(){
    this.checkUserHome()
  }
}
</script>


<style lang="scss" scoped>
input{
  border: none;
  width: 50px;
  text-align: center;
  font-size: 30px;
  border-bottom: 1px solid black;
}

input:focus {
  outline: none;
}

.pin-box {
  padding: 8px;
  border: 1px solid black;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
