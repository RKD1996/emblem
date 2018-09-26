<template>
  <div id= "xyz">
    <v-layout row>
      <v-flex xs6 style="background-color: white;">
        <menu-button color="#56C4C4" @click.native="showComponent"></menu-button>
      </v-flex>
      <v-flex xs6 style="background-color: #56C4C4;" class="center">
        <font-awesome-icon :icon="faQuestion" id="awesome" size="2x" color="white"/>
      </v-flex>
    </v-layout>
    <div><br><br><br>
      <v-container>
        <p style="color: white;" align="center" class="title">This page shows the amount of money you have saved
          compared to buying directly from the grid.</p>
          <br> <div class="text-xs-center">
            <p class="title" style="color: white;">Use the tab in the top left to adjust the <b>maximum</b> price in
              pence per kilowatt hour  price you are willing to pay for locally generated renewable energy. You could
              set it at the same price as your current electricity tariff. Or you could set it higher if you
              wanted to support local energy generation.</p>
            </div>
            <div class="text-xs-center">
              <v-btn fab outline large color="white" @click="back">back</v-btn>
            </div>
            <emblem-logo color="white"></emblem-logo>
          </v-container>
        </div>
      </div>
    </template>
    <script>
    import TradingRates from '../useful/TradingRates.vue'
    import EmblemLogo from '../useful/EmblemLogoTextOnly.vue'
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import faQuestion from '@fortawesome/fontawesome-free-solid/faQuestion'
    import CMBtn from '../useful/TopCurvedMenuButton.vue'

    export default {
      components: {
        "emblem-logo": EmblemLogo,
        "trading-rates": TradingRates,
        FontAwesomeIcon,
        "menu-button": CMBtn
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
        showComponent () {
          this.$router.push('/savings/maxprice')
        },
        back () {
          this.$router.push('/savings')
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
    #xyz {
      background-color: #56C4C4;
      height: 100%;
    }
    </style>
