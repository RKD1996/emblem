<template>
  <div style="background-color: #FCB415">
    <v-layout row wrap>
      <v-flex xs6 style="background-color: #FCB415" class="center">
        <v-btn @click.native="drawer = !drawer" flat large>
          <font-awesome-icon :icon="faSlidersH" id="awesome" size="2x" color="white"/>
        </v-btn>
        <v-navigation-drawer v-model="drawer" temporary absolute>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Price per kWh</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list>
            <v-divider></v-divider>
            <v-list-tile v-for="item in items" :key="item.title" @click="">
              <v-btn :to="item.path" block flat>
                <v-list-tile-content>
                  {{ item.title }}
                </v-list-tile-content>
              </v-btn>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs6 style="background-color: white;" class="center">
        <font-awesome-icon :icon="faQuestion" id="awesome" size="2x" color="#FCB415"/>
      </v-flex>
    </v-layout>
    <please-wait :progress="progress"></please-wait>
    <div><br><br><br><br>
      <trading-rates color="white" :numberValue="numberValue" :decimalValue="decimalValue" v-on:increment="updateRate($event)"></trading-rates>
      <br> <br> <br>
      <v-container>
        <div class="text-xs-center">
          <p class="title" style="color: white;">Use the arrows to adjust your <b>maximum</b> price in pence per kilowatt hour </p>
        </div>
      </v-container>
      <div class="text-xs-center">
        <v-btn fab outline large color="white" @click="back">back</v-btn>
        <v-btn fab outline large depressed color="white" @click="setSellParams" v-show="increment">Next</v-btn>
        <v-snackbar
        :timeout="timeout"
        :top="y === 'top'"
        :right="x === 'right'"
        v-model="snackbar"
        >
        {{ text }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div><br><br><br>
    <emblem-logo color="white"></emblem-logo><br>
  </div>
</div>
</template>
<script>
import TradingRates from '../useful/TradingRates.vue'
import EmblemLogo from '../useful/EmblemLogoTextOnly.vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faSlidersH from '@fortawesome/fontawesome-free-solid/faSlidersH'
import faQuestion from '@fortawesome/fontawesome-free-solid/faQuestion'
import store from '../../store'
import PleaseWait from '../useful/PleaseWait.vue'

export default {
  components: {
    "emblem-logo": EmblemLogo,
    "trading-rates": TradingRates,
    "please-wait":  PleaseWait,
    FontAwesomeIcon
  },
  data () {
    return {
      active: true,
      numberValue: 0,
      decimalValue: 0,
      progress: true,
      increment: false,
      snackbar: false,
      y: 'top',
      x: 'right',
      timeout: 6000,
      text: 'Selling Rates Are Successfully Updated',
      drawer: null,
        items: [
          { title: 'Generate', path: '/sales/generate'},
          { title: 'Export', path: '/sales/export' },
          { title: 'Trading', path: '/sales/trading' }
        ]
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
      this.$router.push('/sales')
    },
    setSellParams: function() {
      var vm = this
      console.log(store.state.sellRate)
      store.updateSellRate()
      .then(function(res){
        var data = res.data
        vm.progress = true
        if (data.success){
          vm.$router.push('/sales')
        }
      }).catch(function(res){
        console.log(res)
      })
    },
    updateRate: function(newVal){
      this.increment  = true
      store.modifySellRate(newVal)
    },
    sellRates () {
      let vm = this
      store.getSellRate()
      .then(function(res){
        let data = res.data
        vm.progress = false
        /*console.log(data)
        vm.numberValue = Math.floor(data.sell_rate)
        vm.decimalValue = parseInt(data.sell_rate.toString().slice(-1))*/

        var str = data.sell_rate.toString()
        var array = str.split('.')
        if(!array[1]){
          vm.numberValue = parseInt(array[0])
          vm.decimalValue = 0
        } else {
          vm.numberValue = parseInt(array[0])
          vm.decimalValue = parseInt(array[1])
        }
      })
    }
  },
  created () {
    this.sellRates()
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
