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

      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        We’re now going to ask
you for information
regarding your current tariff
with your grid-based
energy supplier.<br><br>
This will enable us to
calculate your savings
through the EMBLEM
project.
      </v-flex>
    </p>
    <br>
    <v-layout row>
      <v-flex class="text-xs-center">
        <br><br><br>
        <v-btn @click="tariff" fab depressed large outline>OK</v-btn>
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
  methods:{
    tariff () {
      localStorage.setItem('step', "tariffimport")
      this.$router.push('/tariffs/standardflatrate')
    }
  },
  mixins: [checkUser],
  created(){
    this.checkUserHome()
  }
}
</script>


<style lang="scss" scoped>
</style>
