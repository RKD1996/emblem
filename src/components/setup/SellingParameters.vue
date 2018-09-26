<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <div class="text-xs-center pt-2 subheading amber--text text-accent-4">Selling</div>
    <v-flex xs3 sm2 class="mx-auto mt-2">
      <hr class="amber accent-4" xs2 offset-xs5 style="border:none;height:1px">
    </v-flex>
    <v-flex xs6 class="mx-auto mt-4">
      <div class="subheading" v-centrify>Use the arrows to adjust your minimum price in pence per kilowatt hour.</div>
    </v-flex>

    <br><please-wait :progress=progress></please-wait>

    <trading-rates color="black" :numberValue=numberValue :decimalValue=decimalValue v-on:increment="updateRate($event)"></trading-rates>

    <v-flex xs7 class="mx-auto mt-4">
      <div class="subheading" v-centrify>Don't worry, this can easily be changed later</div>
    </v-flex>
    <br>
    <v-layout align-center>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-btn fab outline large depressed color="black" @click="setSellParams">Next</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import EmblemLogo from '../useful/EmblemLogo.vue'
import TradingRates from '../useful/TradingRates.vue'
import {Centrify} from '../../directives/styleDirective'
import store from '../../store'
import PleaseWait from '../useful/PleaseWait.vue'
import checkUser from '../../mixins/checkUserMixin'

export default {
  components: {
    "emblem-logo": EmblemLogo,
    "trading-rates": TradingRates,
    "please-wait":  PleaseWait
  },
  data () {
    return {
      numberValue: 0,
      decimalValue: 0,
      progress: true
    }
  },
  methods: {
    setSellParams: function() {
      var vm = this
      console.log(store.state.sellRate)
      store.updateSellRate()
        .then(function(res){
          var data = res.data
          if (data.success){
            localStorage.setItem('step', 'alldone')
            vm.$router.push('/alldone')
          }
        }).catch(function(res){
          console.log(res)
        })
    },
    updateRate: function(newVal){
      store.modifySellRate(newVal)
    },
    sellRates () {
      let vm = this
      store.getSellRate()
        .then(function(res){
          let data = res.data
          console.log(data)
          //vm.numberValue = Math.floor(data.sell_rate)
          //vm.decimalValue = parseInt(data.sell_rate.toString().slice(-1))

          var str = data.sell_rate.toString()
          var array = str.split('.')
          if(!array[1]){
            vm.numberValue = parseInt(array[0])
            vm.decimalValue = 0
          } else {
            vm.numberValue = parseInt(array[0])
            vm.decimalValue = parseInt(array[1])
          }
          vm.progress = false
        })
    }
  },
  directives: {
    Centrify
  },
  computed: {
  },
  mixins: [checkUser],
  created () {
    this.checkUserHome()
    this.sellRates()
    if(localStorage.getItem('user_type') == 'prosumer'){
      this.pro = true
    } else {
      this.$router.push('alldone')
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
