<template>
  <v-container>
    <v-layout class="mb-5 mt-2">
      <v-flex>
        <div class="text-xs-center headline">PASSWORD</div>
      </v-flex>
    </v-layout>
    <please-wait :progress="progress"></please-wait>
    <div v-show="!successfullyChanged">
      <v-layout>
        <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
          <v-form v-model="valid">
            <v-text-field
                  label="Old password"
                  v-model="oldPassword"
                  :rules="passwordRules"
                  type="password"
                  required
                  >
            </v-text-field>
              <v-text-field
                  label="New password"
                  v-model="newPassword"
                  :rules="passwordRules"
                  type="password"
                  required
                  >
              </v-text-field>
                <v-text-field
                  label="Confirm New password"
                  v-model="confirmPassword"
                  :rules="passwordRules"
                  type="password"
                  required
                  >
                </v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout class="mt-4 pt-4">
        <v-flex class="text-xs-center">
          <v-btn fab depressed color="indigo darken-1" class="white--text mr-5" v-on:click="goBack">BACK</v-btn>
          <v-btn fab depressed color="indigo darken-1" class="white--text" v-on:click="changePassword">DONE</v-btn>
        </v-flex>
      </v-layout>
    </div>
    <div v-show="successfullyChanged"v>
      <p class="text-xs-center pt-5 subheading">
        <v-flex xs8 offset-xs2 sm6 offset-sm3 class="mt-5 pt-4">
          Thank you, your password
          has been successfully
          changed.
        </v-flex>
      </p>
      <br>
      <v-layout class="mt-5 pt-5">
        <v-flex class="text-xs-center">
          <v-btn to="/settings" fab depressed color="indigo darken-1" class="white--text">DONE</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>


<script>
import axios from 'axios'
import checkUser from '../../mixins/checkUserMixin'
import PleaseWait from '../useful/PleaseWait.vue'

export default {
  components: {
    "please-wait" : PleaseWait
  },
  data () {
    return {
      progress: false,
      successfullyChanged: false,
      valid: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be 8 characters'
      ],
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    changePassword () {
      var obj = this
      //var Content-Type = "application/json"
      this.progress = true
      axios({
        method:'put',
        url: this.$hostname + '/auth/password',

        params: {},
        headers: {
          'Content-Type':'application/json',
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        },
        data: {
          'password':this.newPassword,
          'password_confirmation':this.confirmPassword,
          'current_password':this.oldPassword
        }
      })
        .then(function(response) {
          obj.progress = false
          if (response.data['success']){
            obj.successfullyChanged = true
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
    this.checkUser()
  }
}
</script>

<style scoped>
</style>
