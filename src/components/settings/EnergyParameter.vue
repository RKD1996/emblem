<template>
  <v-container>
    <v-layout class="mt-2 pb-5">
      <v-flex>
        <div class="text-xs-center headline">ACCOUNT</div>
      </v-flex>
    </v-layout>
    <v-flex xs5 sm2 class="mx-auto">
    </v-flex><br><br><br><br>
    <v-layout class="text-xs-center">
      <v-flex xs3></v-flex>
      <v-flex xs6>
        <div class="px-0">
          To change your energy
          parameters use the ‘
          <font-awesome-icon :icon="faSlidersH"/>
          ’
          symbol on either the
          <span style="color:#56C4C4">savings</span> or <span style="color:#FCB415">sales</span> tabs
        </div>
      </v-flex>
      <v-flex xs3></v-flex>
    </v-layout>
    <br>
    <v-layout row class="mt-5 pt-4">
      <v-flex class="text-xs-center">
        <br>
        <!--<v-btn to="settings" fab depressed large outline>Back</v-btn>-->
        <v-btn to="settings" fab depressed large outline>Done</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faSlidersH from '@fortawesome/fontawesome-free-solid/faSlidersH'
import checkUser from '../../mixins/checkUserMixin'

export default {
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      progress: false
    }
  },
  methods: {
  },
  computed: {
    faSlidersH () {
      return faSlidersH
    },
  },
  mixins: [checkUser],
  created(){
    this.checkUser()
  }
}
</script>


<style lang="scss" scoped>
</style>
