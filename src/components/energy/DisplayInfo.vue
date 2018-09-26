<template>
  <div style="background-color: #E6402F">
    <v-layout row wrap>
      <v-flex xs12 style="background-color: #E6402F;" class="center">
        <font-awesome-icon :icon="faQuestion" id="awesome" size="2x" color="white"/>
      </v-flex>
    </v-layout>
    <div><br><br><br>
      <v-container> 
        <p style="color: white;" align="center" class="title">This page shows the amount of renewable local energy
          you have generated and consumed. Use the ‘+’ and  ‘-’ symbols to switch betwen the two numbers.</p>
          <br> <div class="text-xs-center">
            <p class="title" style="color: white;"> Watch these grow as you support your community and the environment! </p>
          </div><br>
          <div class="text-xs-center">
            <v-btn fab outline large color="white" @click="back">back</v-btn>
          </div><br>
          <emblem-logo color="white"></emblem-logo><br><br>
        </v-container>
      </div>
    </div>
  </template>
  <script>
  import TradingRates from '../useful/TradingRates.vue'
  import EmblemLogo from '../useful/EmblemLogoTextOnly.vue'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import faSlidersH from '@fortawesome/fontawesome-free-solid/faSlidersH'
  import faQuestion from '@fortawesome/fontawesome-free-solid/faQuestion'

  export default {
    components: {
      "emblem-logo": EmblemLogo,
      "trading-rates": TradingRates,
      FontAwesomeIcon
    },
    data () {
      return {
        active: true,
        numberValue: 0,
        decimalValue: 0
      }
    },
    computed: {
      faSlidersH () {
        return faSlidersH
      },
      faQuestion () {
        return faQuestion
      },
    },
    methods: {
      back () {
        this.$router.push('/energy')
      }
    }
  }
  </script>
  <style scoped>
  .center{
    text-align: center;
    padding: 10px;
  }
  #awesome{
    cursor: pointer;
  }
  @media screen and (max-width : 600px) {
    #awesome{
      padding: 5px;
    }
  }
  #btn{
    color: #56C4C4;
  }
  </style>
