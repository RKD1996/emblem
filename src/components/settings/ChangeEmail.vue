<template>
  <v-container>
    <v-layout class="mb-5 mt-2">
      <v-flex>
        <div class="text-xs-center headline">EMAIL</div>
      </v-flex>
    </v-layout>
    <div v-show="!successfullyChanged">
      <v-layout>
        <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
          <v-form v-model="valid">
            <v-text-field
                  v-model="oldEmail"
                  :rules="emailRules"
                  label="Old email address"
                  required
                  >
            </v-text-field>
              <v-text-field
                  v-model="newEmail"
                  :rules="emailRules"
                  label="New email address"
                  required
                  >
              </v-text-field>
                <v-text-field
                  label="Enter your password"
                  v-model="password"
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
          <v-btn fab depressed color="indigo darken-1" class="white--text">DONE</v-btn>
        </v-flex>
      </v-layout>
    </div>
    <div v-show="successfullyChanged"v>
      <p class="text-xs-center pt-5 subheading">
        Thank You!
        <br></br>
        <v-spacer></v-spacer>
        <v-flex xs8 offset-xs2 sm6 offset-sm3>
          A verification email has
          been sent to your new
          email address. Please click
          on the link to confirm and
          finalise the change.
        </v-flex>
      </p>
      <v-layout class="mt-5 pt-5">
        <v-flex class="text-xs-center">
          <v-btn fab depressed color="indigo darken-1" class="white--text">DONE</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>


<script>
import checkUser from '../../mixins/checkUserMixin'

export default {
  components: {

  },
  data () {
    return {
      successfullyChanged: false,
      valid: false,
      oldEmail: '',
      newEmail: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
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
