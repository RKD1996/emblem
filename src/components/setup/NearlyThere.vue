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
      Nearly there!
      <v-spacer></v-spacer>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>Now we just need to define your parameters for buying and/or selling renewable local energy.</v-flex>
    </p>
    <br>
    <v-layout row>
      <v-flex class="text-xs-center">
        <br><br><br><br><br><br>
        <v-btn @click="buyingparams" fab depressed large outline>OK</v-btn>
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
    buyingparams () {
      localStorage.setItem('step', "buyingparams")
      this.$router.push('/buyingparams')
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
