<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <p class="signup-text text-xs-center pt-4 title">Sign Up</p>

    <please-wait :progress="progress"></please-wait>

    <v-layout row v-show="invalidCredentials" class="mb-2">
      <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4>
        <v-alert color="error" :value="true" transition="scale-transition">
          <v-icon>{{ errorIcon }}</v-icon>
          {{ errorMsg }}
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4>
        <v-form @submit.prevent="submit" v-model="valid" ref="form">
          <v-layout row>
            <v-flex class="text-xs-center">
              <v-text-field
                                                       label="E-mail"
                                                       v-model="user.email"
                                                       :rules="emailRules"
                                                       required
                                                       type="email"
                                                       ref="search"
                                                       >
              </v-text-field>
              <v-text-field
                                                       label="Password"
                                                       v-model="user.password"
                                                       :rules="passwordRules"
                                                       type="password"
                                                       required
                                                       @click="setFocus"
                                                       >
              </v-text-field>
              <v-text-field
                                                       label="Confirm Password"
                                                       v-model="user.confirmPassword"
                                                       :rules="confirmPasswordRules"
                                                       type="password"
                                                       required
                                                       @click="setFocus"
                                                       >
              </v-text-field>
              <br>
              <v-btn
                                                       @click="submit"
                                                       :disabled="!valid"
                                                       fab
                                                       outline
                                                       large
                                                       >
                                                       Sign Up
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        <v-layout>
          <v-flex xs4>
            <router-link to="/signin" v-undecorate>Already a Member? Sign In!</router-link>
          </v-flex>
          <v-flex xs4 offset-xs4 class="text-xs-right">
            <router-link to="/forgot" v-undecorate>Forgot Password</router-link>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import EmblemLogo from '../useful/EmblemLogo.vue'
import PleaseWait from '../useful/PleaseWait.vue'
import {Undecorate} from '../../directives/styleDirective'
import axios from 'axios'
import checkUser from '../../mixins/checkUserMixin'

export default {
  name: 'signup',
  components: {
    "emblem-logo": EmblemLogo,
    "please-wait":  PleaseWait
  },
  directives: {
    Undecorate
  },
  data () {
    return {
      invalidCredentials: false,
      progress: false,
      errorMsg: '',
      errorIcon: '',
      user: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be 8 characters'
      ],
      confirmPasswordRules: [
        v => (v && v == this.user.password) || "Passwords don't match"
      ],
      select: null
    }
  },
  methods: {
    setFocus (){
      var email = this.user.email
      var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (email == '' || !re.test(email))
      {this.$refs.search.focus()}
    },
    submit () {
      var obj = this
      var email = this.user.email
      var password = this.user.password
      var password_confirmation = this.user.confirmPassword
      this.progress = true
      if (this.$refs.form.validate()) {
        this.$auth.register(
          {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        ).then(function(res) {
          console.log(res)
          obj.progress = false
          localStorage.setItem('access-token', res.headers["access-token"])
          localStorage.setItem('client', res.headers["client"])
          localStorage.setItem('uid', res.headers["uid"])
          localStorage.setItem('step', "human")
          localStorage.setItem('time', Date())
          obj.$router.push('/human')
        }).catch(error => {
          console.log(error.response)
          if (error.response.status == 422){
            obj.invalidCredentials = true
            obj.clear()
            obj.progress = false
            obj.errorMsg = 'Email has already been taken'
            obj.errorIcon = 'error'
          }
        })

      //  axios({
      //    method: 'post',
      //    url: 'http://localhost:3000/auth',
      //    data: {
      //      email: email,
      //      password: password,
      //      password_confirmation: password_confirmation
      //    }
      //  }).then(function(res){console.log(res)}, function(res){console.log(res)});

      }
    },
    clear () {
      this.$refs.form.reset()
    },
    checkUser () {
      //console.log(localStorage.getItem("step"))
      if(localStorage.getItem("access-token") ){
        var time1 = new Date(localStorage.getItem("time"))
        var time2 = new Date();
        var diff =(time2.getTime() - time1.getTime()) / 1000;
        diff /= 60;
        diff = Math.abs(Math.round(diff));
        if(diff <= 15)
        {
          localStorage.setItem('time', Date())
          var path = localStorage.getItem("step")
          this.$router.push('/'+path)
        }else if(diff >= 180) {
          localStorage.clear()
          sessionStorage.clear()
          this.$router.push('/')
        }else{
          localStorage.clear()
          sessionStorage.clear()
          this.$router.push('/sessionexpire')
        }
      }
    }
  },
  created(){
    this.checkUser()
  }
}
</script>

<style lang="scss" scoped>

</style>
