<template>
  <v-container>
    <v-layout class="mt-2 pb-5">
      <v-flex>
        <div class="text-xs-center headline">ACCOUNT</div>
      </v-flex>
    </v-layout>
    <v-layout class="mt-5 pt-5">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="changeEmailForm">
          <v-flex xs8 offset-xs2 class="text-xs-center">
            <div class="subheading">Change your email address</div>
          </v-flex>
          <v-flex xs2 class="mt-3">
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </v-flex>
        </v-layout>
        <hr class="indigo darken-1" style="border:none;height:1px">
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout class="mb-3" @click="changePasswordForm">
          <v-flex xs6 offset-xs3 class="text-xs-center">
            <div class="subheading">Change your password</div>
          </v-flex>
          <v-flex xs2 offset-xs1 class="mt-3">
            <font-awesome-icon :icon="faCaretRight" class="indigo--text" size="2x" pull="right" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout class="mt-5 pt-4">
      <v-flex class="text-xs-center">
        <v-btn fab depressed color="indigo darken-1" class="white--text" v-on:click="goBack">BACK</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCaretRight from '@fortawesome/fontawesome-free-solid/faCaretRight'
import checkUser from '../../mixins/checkUserMixin'

export default {
  components: {
    FontAwesomeIcon,
  },
  data () {
    return {
    }
  },
  computed: {
    faCaretRight () {
      return faCaretRight
    }
  },
  methods: {
    changeEmailForm () {
      this.$router.push('/settings/change/email')
    },
    changePasswordForm () {
      this.$router.push('/settings/change/password')
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mixins: [checkUser],
  created(){
    this.checkUser()
  }
}
</script>

<style lang="scss" scoped>

</style>
