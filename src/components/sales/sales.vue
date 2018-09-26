<template>
  <div>
    <please-wait :progress="progress"></please-wait>
    <v-layout row>
      <v-flex xs6 style="border: 1px solid #FCB415">
        <menu-button color="#FCB415" @click.native="showComponent"></menu-button>
      </v-flex>
      <v-flex xs6 style="border: 1px solid #FCB415">
        <help-button  color="#FCB415" @click.native="showSalesInfo"></help-button>
      </v-flex>
    </v-layout><div class="mt-5"></div><br><br>
    <saved-rates-display color="#FCB415" :rateDisplay="ratesShow" text="earned"></saved-rates-display>
    <div class="mb-5"></div>
    <div id="savedset">
    <div align="center" class="body-1">Time Period</div>
    <price-indicator color="#FCB415" align="bottom"></price-indicator><br>
  </div>
  <footer-nav v-show="active"></footer-nav>
  <footer-nav-con v-show="!active"></footer-nav-con>
  </div>
</template>
<script>
import CMBtn from '../useful/TopCurvedMenuButton.vue';
import CHBtn from '../useful/CurvedHelpButton.vue';
import SRDis from '../useful/SavedRatesDisplay.vue';
import nav2 from '../useful/FooterNavBarconsumer.vue';
import nav1 from '../useful/FooterNavBar.vue';
import TPInd from '../useful/TimePeriodIndicator.vue';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import PleaseWait from '../useful/PleaseWait.vue'

export default {
  data () {
    return {
      active: true,
      ratesShow: '',
      progress: true,
      allRates: '',
      drawer: null,
        items: [
          // { title: 'Generate', path: '/sales/generate'},
          { title: 'Export', path: '/sales/export' },
          { title: 'Trading', path: '/sales/trading' }
        ]
    }
  },
  components: {
    "menu-button": CMBtn,
    "help-button": CHBtn,
    "saved-rates-display": SRDis,
    "price-indicator": TPInd,
    "footer-nav": nav1,
    "footer-nav-con": nav2,
    "please-wait":  PleaseWait,
    FontAwesomeIcon
  },
  computed: {

  },
  methods: {
    showComponent () {
      this.$router.push('/sales/trading')
    },
    showSalesInfo () {
      this.$router.push('/sales/sales_info')
    },
    getRates () {
      axios({
        method:'get',
        url:this.$hostname + '/user/sales_data',
        headers: {
          'Content-Type':'application/json',
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        }
      })
      .then( response => {
        this.allRates = response.data.sales_duration
        this.progress = false
        this.ratesShow = '£' + this.allRates.day/100
      })
      .catch( error => { console.log(error) })
    },
    showDisplay (event) {
      if(event == 'day'){
        this.ratesShow = '£' + this.allRates.day/100
      }
      else if(event == 'week'){
        this.ratesShow = '£' + this.allRates.week/100
      }
      else if(event == 'month'){
        this.ratesShow = '£' + this.allRates.month/100
      }
      else{
        this.ratesShow = '£' + this.allRates.total/100
      }
    },
    check () {
      if(localStorage.getItem('user_type') == 'prosumer'){
        this.active = true
      }
      else{
        this.active = false
        this.$router.push('/savings')
      }
    }
  },
  mounted () {
    this.progress = true
    this.getRates()
    this.check()
  }
}
</script>
<style scoped>
#homedot {
  height: 6px;
  width: 6px;
  border-radius: 50%;
  margin-right: 20px;
}
.light-blue{
  color: #56C4C4;
}
#peopledot{
  height: 6px;
  width: 6px;
  border-radius: 50%;
  margin-left: 23px;
}
#HomeButton, #PeopleButton{
  cursor: pointer;
}
#savedset{
  position: fixed;
  bottom: 200px;
  width: 100%;
}
@media (max-width: 600px){
  #savedset{
    position: fixed;
    bottom: 135px;
    width: 100%;
  }
}
</style>
