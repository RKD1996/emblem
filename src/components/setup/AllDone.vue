<template>
  <v-container>
    <p class="text-xs-center pt-5 mt-3 subheading">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>We're all done!</v-flex>
    </p>
    <br>
    <div class="text-xs-center pt-5 mt-3 title">
    Welcome to
    </div>
    <v-flex xs5 sm2 class="mx-auto">
      <hr class="mt-2 black" style="height:1px;border:none;">
    </v-flex>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row>
      <v-flex class="text-xs-center">
        <br><br>
        <v-btn @click="savings" fab depressed large outline>GO</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import EmblemLogo from '../useful/EmblemLogo.vue'
import checkUser from '../../mixins/checkUserMixin'

export default {
  components: {
    "emblem-logo": EmblemLogo,
  },
  data () {
    return {
    }
  },
  methods: {
    savings () {
      localStorage.setItem('step', "savings")
      this.$router.push('/savings')
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
