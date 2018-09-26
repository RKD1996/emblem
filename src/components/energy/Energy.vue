<template>
  <div>
    <please-wait :progress="progress"></please-wait>
    <v-flex xs12 style="border: 1px solid #E6402F">
      <help-button color="#E6402F" @click.native="InfoDsaplay"></help-button>
    </v-flex>
    <v-layout row class="mt-3 center" v-show="active">
      <v-flex xs6 style="line-height: 0.5;">
        <div id="powertext" @click="showButton1" :style="{ opacity: opacity1 }"><font-awesome-icon id="icon" :icon="faBolt"  size="2x" color="#E6402F" />+</div>
        <div class="red darken-1 dotx" v-show="active1"></div>
      </v-flex>
      <v-flex xs6 style="line-height: 0.5;">
        <div id="powertext" @click="showButton2" :style="{ opacity: opacity2 }"><font-awesome-icon id="icon" :icon="faBolt" size="2x" color="#E6402F"/>-</div>
        <div class="red darken-1 dotx" v-show="active2"></div>
      </v-flex>
    </v-layout>
    <v-layout row v-show="!active">
      <v-flex xs12 style="line-height: 0.5;" class="center">
        <div id="powertext" @click="showButton1" :style="{ opacity: opacity1 }"><font-awesome-icon id="icon" :icon="faBolt"  size="2x" color="#E6402F" />+</div>
        <div class="red darken-1 dotx" v-show="active1"></div>
      </v-flex>
    </v-layout>
    <div class="mt-3"></div>
    <energy-meter color="#E6402F" :rateDisplay="energyRates" :units="unitText" :text="textDsiplay"></energy-meter>
    <div id="tab">
      <div align="center" class="body-1">Time Period</div>
      <price-indicator color="#E6402F" align="bottom"></price-indicator>
    </div>
    <footer-nav v-show="active"></footer-nav>
    <footer-nav-con v-show="!active"></footer-nav-con>
  </div>
</template>
<script>
import CHBtn from '../useful/CurvedHelpButton.vue';
import EMer from '../useful/EnergyMeter.vue';
import TPInd from '../useful/TimePeriodIndicator.vue';
import nav2 from '../useful/FooterNavBarconsumer.vue';
import nav1 from '../useful/FooterNavBar.vue';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faBolt from '@fortawesome/fontawesome-free-solid/faBolt'
import axios from 'axios'
import PleaseWait from '../useful/PleaseWait.vue';

export default {
  data () {
    return {
      active1: true,
      active2: false,
      active: true,
      opacity2: 0.5,
      opacity1: 1.0,
      energyRates: '',
      unitText:'',
      plusRead: '',
      minusRead: '',
      progress: true,
      textDsiplay: '',
      text1: 'of renewable local energy used',
      text2: 'of renewable local energy generated',
      showPeriod: 'day'
    }
  },
  components: {
    "help-button": CHBtn,
    "energy-meter": EMer,
    "price-indicator": TPInd,
    "footer-nav": nav1,
    "footer-nav-con": nav2,
    "please-wait":  PleaseWait,
    FontAwesomeIcon
  },
  computed: {
    faBolt () {
      return faBolt
    }
  },
  methods: {
    InfoDsaplay () {
      this.$router.push('/energy/info')
    },
    getUnitReading () {
      axios({
        method:'get',
        url:this.$hostname + '/user/energy_data',
        headers: {
          'Content-Type':'application/json',
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        }
      })
      .then( response => {
        this.plusRead = response.data.energy_used
        this.minusRead = response.data.energy_generated

        this.progress = false
        var set = this.plusRead.day
        if ( set >= 1000000) {
          if ( set >= 1000000000 ) {
            set = set/1000000000
            set = set.toFixed(2)
            this.unitText = 'MWh'
          } else {
            set = set/1000000
            set = set.toFixed(2)
            this.unitText = 'kWh'
          }
        } else {
          set = set/1000000
          set = set.toFixed(2)
          this.unitText = 'kWh'
        }
        this.energyRates = set
      })
      .catch( error => { console.log(error) })
    },
    showDisplay (event) {
      this.showPeriod = event
      if(this.active1 == true){
        this.sdhowDisplayPlus(event)
      }
      if(this.active2 == true) {
        this.sdhowDisplayMinus(event)
      }
    },
    sdhowDisplayPlus(event){
      if(event == 'day'){
        var set = this.plusRead.day
        if ( set >= 1000000) {
          if ( set >= 1000000000 ) {
            set = set/1000000000
            set = set.toFixed(2)
            this.unitText = 'MWh'
          } else {
            set = set/1000000
            set = set.toFixed(2)
            this.unitText = 'kWh'
          }
        } else {
          set = set/1000000
          set = set.toFixed(2)
          this.unitText = 'kWh'
        }
        this.energyRates = set
      }
      else if(event == 'week'){
        var set = this.plusRead.week
        if ( set >= 1000000) {
          if ( set >= 1000000000 ) {
            set = set/1000000000
            set = set.toFixed(2)
            this.unitText = 'MWh'
          } else {
            set = set/1000000
            set = set.toFixed(2)
            this.unitText = 'kWh'
          }
        } else {
          set = set/1000000
          set = set.toFixed(2)
          this.unitText = 'kWh'
        }
        this.energyRates = set
      }
      else if(event == 'month'){
        var set = this.plusRead.month
        if ( set >= 1000000) {
          if ( set >= 1000000000 ) {
            set = set/1000000000
            set = set.toFixed(2)
            this.unitText = 'MWh'
          } else {
            set = set/1000000
            set = set.toFixed(2)
            this.unitText = 'kWh'
          }
        } else {
          set = set/1000000
          set = set.toFixed(2)
          this.unitText = 'kWh'
        }
        this.energyRates = set
      }
      else{
        var set = this.plusRead.total
        if ( set >= 1000000) {
          if ( set >= 1000000000 ) {
            set = set/1000000000
            set = set.toFixed(2)
            this.unitText = 'MWh'
          } else {
            set = set/1000000
            set = set.toFixed(2)
            this.unitText = 'kWh'
          }
        } else {
          set = set/1000000
          set = set.toFixed(2)
          this.unitText = 'kWh'
        }
        this.energyRates = set
      }
    },
    sdhowDisplayMinus(event){
      if(event == 'day'){
        var set = this.minusRead.day
        if ( set >= 1000000) {
          if ( set >= 1000000000 ) {
            set = set/1000000000
            set = set.toFixed(2)
            this.unitText = 'MWh'
          } else {
            set = set/1000000
            set = set.toFixed(2)
            this.unitText = 'kWh'
          }
        } else {
          set = set/1000000
          set = set.toFixed(2)
          this.unitText = 'kWh'
        }
        this.energyRates = set
      }
      else if(event == 'week'){
        var set = this.minusRead.week
        if ( set >= 1000000) {
          if ( set >= 1000000000 ) {
            set = set/1000000000
            set = set.toFixed(2)
            this.unitText = 'MWh'
          } else {
            set = set/1000000
            set = set.toFixed(2)
            this.unitText = 'kWh'
          }
        } else {
          set = set/1000000
          set = set.toFixed(2)
          this.unitText = 'kWh'
        }
        this.energyRates = set
      }
      else if(event == 'month'){
        var set = this.minusRead.month
        if ( set >= 1000000) {
          if ( set >= 1000000000 ) {
            set = set/1000000000
            set = set.toFixed(2)
            this.unitText = 'MWh'
          } else {
            set = set/1000000
            set = set.toFixed(2)
            this.unitText = 'kWh'
          }
        } else {
          set = set/1000000
          set = set.toFixed(2)
          this.unitText = 'kWh'
        }
        this.energyRates = set
      }
      else{
        var set = this.minusRead.total
        if ( set >= 1000000) {
          if ( set >= 1000000000 ) {
            set = set/1000000000
            set = set.toFixed(2)
            this.unitText = 'MWh'
          } else {
            set = set/1000000
            set = set.toFixed(2)
            this.unitText = 'kWh'
          }
        } else {
          set = set/1000000
          set = set.toFixed(2)
          this.unitText = 'kWh'
        }
        this.energyRates = set
      }
    },
    showButton1 () {
      this.active1 = true
      this.active2 = false
      this.opacity2 = 0.5
      this.opacity1 = 1.0
      //this.energyRates = this.plusRead.day
      this.textDsiplay = this.text1
      this.showDisplay(this.showPeriod)
    },
    showButton2 () {
      this.active1 = false
      this.active2 = true
      this.opacity2 = 1.0
      this.opacity1 = 0.5
      //this.energyRates = this.minusRead.day
      this.textDsiplay = this.text2
      this.showDisplay(this.showPeriod)
    },
    check () {
      if(localStorage.getItem('user_type') == 'prosumer'){
        this.active = true
      }
      else{
        this.active = false
      }
    }
  },
  mounted () {
    this.progress = true
    this.getUnitReading()
    this.check()
    if (this.active1 == true) {
      this.textDsiplay = this.text1
    }
    else {
      this.textDsiplay = this.text2
    }
  },
  created () {

  }
}
</script>
<style scoped>
.center{
  text-align: center;
}
#powertext{
  color: #E6402F;
  font-size: 38px;
  cursor: pointer;
}
.dotx {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin: 0px 10px 0px 10px;
  display: inline-block;
  color: #E6402F;
}
#icon{
  padding: 12px;
}
#tab{
  position: fixed;
  bottom: 200px;
  width: 100%;
}
@media (max-width: 600px){
  #tab{
    position: fixed;
    bottom: 135px;
    width: 100%;
  }
}
</style>
