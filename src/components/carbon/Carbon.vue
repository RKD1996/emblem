<template>
  <div>
      <please-wait :progress="progress"></please-wait>
    <v-flex xs12 style="border: 1px solid #38B34A">
      <help-button color="#38B34A" @click.native="InfoDsaplay"></help-button>
    </v-flex>
    <div class="mt-5"></div><br><br>
    <saved-rates-display color="#38B34A" :rateDisplay="ratesShow" :text="textDsiplay"></saved-rates-display>
    <div class="mb-5"></div><br><br><br><br>
    <div id="tab">
    <hr size="1px" color="#38B34A">
    <div id="triangle-down" style="border-top: 14px solid #38B34A" class="mx-auto"></div>
    <div class="headline center">Total</div><br>
  </div>
  <footer-nav v-show="active"></footer-nav>
  <footer-nav-con v-show="!active"></footer-nav-con>
  </div>
</template>
<script>
import CHBtn from '../useful/CurvedHelpButton.vue';
import SRDis from '../useful/SavedRatesDisplay.vue';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import nav2 from '../useful/FooterNavBarconsumer.vue';
import nav1 from '../useful/FooterNavBar.vue';
import PleaseWait from '../useful/PleaseWait.vue'
import axios from 'axios'

export default {
  data () {
    return {
      ratesShow: '10',
      active: true,
      progress: true,
      allRates: '',
      textDsiplay: 'miles of car emissions offset'
    }
  },
  components: {
    "help-button": CHBtn,
    "saved-rates-display": SRDis,
    "footer-nav": nav1,
    "footer-nav-con": nav2,
    "please-wait":  PleaseWait,
    FontAwesomeIcon
  },
  methods: {
    InfoDsaplay () {
      this.$router.push('/carbon/info')
    },
    getRates () {
      axios({
        method:'get',
        url: this.$hostname + '/user/carbon_offset',
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        }
      })
        .then( response => {
          console.log(response.data.carbon_offset)
          var carbonOffset = response.data.carbon_offset
          this.allRates = {
            unit: carbonOffset
          }
          this.progress = false
          this.ratesShow =  this.allRates.unit
        })
        .catch( error => { console.log(error) })
    },
    check () {
      if(localStorage.getItem('user_type') == 'prosumer'){
        this.active = true
        console.log(localStorage.getItem('user_type'))
      }
      else{
        this.active = false
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
#triangle-down {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.center{
  text-align: center;
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
