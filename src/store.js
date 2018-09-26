import Vue from 'vue'
import axios from 'axios'

export default {

  state: {
    buyRate: 10.7,
    sellRate: 10.7,
    gridExportRate: 10.7
  },

  // Methods that you need, for e.g fetching data from server etc.

  getBuyRate() {
    return axios({
      method: 'get',
      url: Vue.prototype.$hostname + '/user/get_buy_rate',
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    })
  },

  getSellRate () {
    return axios({
      method: 'get',
      url: Vue.prototype.$hostname + '/user/get_sell_rate',
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    })
  },

  getGridExportRate () {
    return axios({
      method: 'get',
      url: Vue.prototype.$hostname + '/user/get_grid_sell_rate',
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    })
  },

  // Locally update the BuyRate in the store
  modifyBuyRate (newValue) {
    console.log('modifyBuyRate triggered with', newValue)
    this.state.buyRate = newValue
  },

  // Locally update the SellRate in the store
  modifySellRate (newValue) {
    console.log('modifySellRate triggered with', newValue)
    this.state.sellRate = newValue
  },

  // Locally update the GridExportRate in the store
  modifyGridExportRate (newValue) {
    console.log('modifyGridExportRate triggered with', newValue)
    this.state.gridExportRate = newValue
  },

  // Update the BuyRate in the server with axios
  updateBuyRate () {
    return axios({
      method: 'post',
      params: {
        buy_rate: this.state.buyRate
      },
      url: Vue.prototype.$hostname + '/user/update_buy_rate',
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    })
  },

  // Update the SellRate in the server with axios
  updateSellRate () {
    return axios({
      method: 'post',
      url: Vue.prototype.$hostname + '/user/update_sell_rate',
      params: {
        sell_rate: this.state.sellRate
      },
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    })
  },

  // Update the GridExportRate in the server with axios
  updateGirdExportRate () {
    return axios({
      method: 'post',
      url: Vue.prototype.$hostname + '/user/update_grid_sell_rate',
      params: {
        grid_sell_rate: this.state.gridExportRate
      },
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    })
  }

}
