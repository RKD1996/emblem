<template>
  <div id= "xyz">
    <v-layout row>
      <v-flex xs6 style="border: 1px solid #56C4C4" class="center">
        <font-awesome-icon :icon="faSlidersH" id="awesome" size="2x" color="white"/>
      </v-flex>
      <v-flex xs6 style="background-color: white;">
        <help-button color="#56C4C4" @click.native="showInfo"></help-button>
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
        <v-btn fab outline large depressed color="white" @click="setBuyParams" v-show="increment">Next</v-btn>
        <v-snackbar
        :timeout="timeout"
        :top="y === 'top'"
        :right="x === 'right'"
        v-model="snackbar"
        >
        {{ text }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
    <emblem-logo color="white"></emblem-logo>
  </div>
</div>
</template>
<script>
import TradingRates from '../useful/TradingRates.vue'
import EmblemLogo from '../useful/EmblemLogoTextOnly.vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faSlidersH from '@fortawesome/fontawesome-free-solid/faSlidersH'
import store from '../../store'
import PleaseWait from '../useful/PleaseWait.vue'
import CHBtn from '../useful/CurvedHelpButton.vue'

export default {
  components: {
    "emblem-logo": EmblemLogo,
    "trading-rates": TradingRates,
    "please-wait":  PleaseWait,
    FontAwesomeIcon,
    "help-button": CHBtn
  },
  data () {
    return {
      active: true,
      numberValue: 0,
      progress: true,
      decimalValue: 0,
      increment: false,
      snackbar: false,
      y: 'top',
      x: 'right',
      timeout: 6000,
      text: 'Buying Rates Are Successfully Updated'
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
    showInfo () {
      this.$router.push('/savings/info')
    },
    back () {
      this.$router.push('/savings')
    },
    setBuyParams: function() {
      var vm = this
      console.log(store.state.buyRate)
      store.updateBuyRate()
      .then(function(res){
        var data = res.data
        vm.progress = true
        if (data.success){
          vm.snackbar = true
          vm.$router.push('/savings')
        }
      }).catch(function(res){
        console.log(res)
      })
    },
    updateRate: function(newVal){
      console.log(newVal)
      this.increment  = true
      store.modifyBuyRate(newVal)
    },
    buyRates () {
      let vm = this
      store.getBuyRate()
      .then(function(res){
        let data = res.data
        vm.progress = false
        /*console.log(data)
        vm.numberValue = Math.floor(data.buy_rate)
        console.log(vm.numberValue)
        vm.decimalValue = parseInt(data.buy_rate.toString().slice(-1))
        console.log(vm.decimalValue)*/

        var str = data.buy_rate.toString()
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
    this.buyRates()
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
