<template>
  <div style="background-color: #38B34A">
    <v-layout row wrap>
      <v-flex xs12 style="background-color: #38B34A;" class="center">
        <font-awesome-icon :icon="faQuestion" id="awesome" size="2x" color="white"/>
      </v-flex>
    </v-layout>
    <div><br><br><br>
      <v-container>
        <p style="color: white;" align="center" class="title">This page shows the amount of carbon you have saved by
          buying and selling locally produced energy. </p>
          <br> <div class="text-xs-center">
            <p class="title" style="color: white;">This is expressed as the number of miles of car emissions that have been
              offset - a number based on a typical passenger vehicle emitting 4.7 tonnes of carbon dioxide each year.  </p>
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
        this.$router.push('/carbon')
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
