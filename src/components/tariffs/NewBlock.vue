<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="logo mt-3">
          <emblem-logo></emblem-logo>
        </div>
      </v-flex>
    </v-layout>
    <div class="text-xs-center pt-2 subheading teal--text text-lighten-2">Add New Block</div>
    <v-flex xs3 sm2 class="mx-auto mt-2">
      <hr class="teal lighten-2" xs2 offset-xs5 style="border:none;height:1px">
    </v-flex>
    <div v-show="successfullyChanged">
      <v-layout>
        <v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 class="mt-5">
          <v-form v-model="valid">
            <v-text-field v-model="limit" label="Limit(kWh)" :rules="limitRules" required></v-text-field>
            <v-text-field v-model="cost" label="Cost" :rules="costRules" required></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout class="mt-4 pt-4">
        <v-flex class="text-xs-center">
          <v-btn fab depressed color="indigo darken-1" class="white--text mr-5" to='basicblock'>BACK</v-btn>
          <v-btn fab depressed color="indigo darken-1" class="white--text" v-on:click="createNewBlock">DONE</v-btn>
        </v-flex>
      </v-layout>
      </div>
      <div v-show="!successfullyChanged">
        <p class="text-xs-center pt-5 subheading">
          <v-flex xs8 offset-xs2 sm6 offset-sm3 class="mt-5 pt-4">
            Thank you, your Day/Night Tariff
            has been successfully
            changed.
          </v-flex>
        </p>
        <br>
        <v-layout class="mt-5 pt-5">
          <v-flex class="text-xs-center">
            <v-btn to="basicblock" fab depressed color="indigo darken-1" class="white--text">DONE</v-btn>
          </v-flex>
        </v-layout>
      </div>
  </v-container>
</template>


<script>
import checkUser from '../../mixins/checkUserMixin'
import EmblemLogo from '../useful/EmblemLogo.vue'

export default {
  components: {
    "emblem-logo": EmblemLogo,

  },
  data () {
    return {
      valid: false,
      successfullyChanged: true,
      limit: '',
      cost: '',
      limitRules: [
        v => !!v || 'Standing Charge is required',
      ],
      costRules: [
        v => !!v || 'Price per kWh is required'
      ]
    }
  },
  methods: {
    createNewBlock () {
      var obj = this
      obj.successfullyChanged = false

      /*this.progress = true

      var path = ''
      console.log(this.$hostname + path)
      axios({
        method:'put',
        url: this.$hostname + path,
        params: {},
        headers: {
          'Content-Type':'application/json',
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client')
        },
        data: {
          //Standar Flat Rate datas
        }
      })
        .then(function(response) {
          obj.progress = false
          if (response.data['success']){
            obj.successfullyChanged = true
            console.log(response)
          }
        }).catch(function(response){
          obj.progress = false
          console.log(response)
        });*/
    }
  },
  computed: {

  },
  mixins: [checkUser],
  created(){
    this.checkUser()
  }
}
</script>

<style scoped>
</style>
