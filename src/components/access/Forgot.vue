<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <p class="text-xs-center pt-4 title">Enter Your Email</p>
    <br>
    <v-layout row>
      <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4>
        <form @submit.prevent="submit" v-model="valid" ref="form" lazy-validation>
          <v-layout row>
            <v-flex class="text-xs-center">
              <v-text-field
                                                       label="E-mail"
                                                       v-model="user.email"
                                                       :rules="emailRules"
                                                       required
                                                       type="email"
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
                                                       Reset
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
        <v-layout>
          <v-flex xs4>
            <router-link to="/signin" v-undecorate>Already a Member? Sign In!</router-link>
          </v-flex>
          <v-flex xs4 offset-xs4 class="text-xs-right">
            <router-link to="/signup" v-undecorate>New User? Sign Up</router-link>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import EmblemLogo from '../useful/EmblemLogo.vue'
import {Undecorate} from '../../directives/styleDirective'
import axios from 'axios'

export default {
  name: 'forgot',
  components: {
    "emblem-logo": EmblemLogo,
  },
  directives: {
    Undecorate
  },
  data () {
    return {
      user: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      select: null
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('/api/submit', {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        })
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
