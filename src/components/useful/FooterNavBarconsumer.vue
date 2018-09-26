<template>
  <div id="nav">
    <v-layout row v-show="set === 'settings'" hidden-sm-and-down>
      <v-flex xs2>
        <div style="color: blue;" class="line indigo darken-2"></div>
      </v-flex>
      <v-flex xs2>
        <div class="indigo darken-2 dotx center"></div>
      </v-flex>
      <v-flex xs8>
        <div style="color: blue;" class="line indigo darken-2"></div>
      </v-flex>
    </v-layout>
    <v-layout row v-show="set === 'savings'" hidden-sm-and-down>
      <v-flex xs4>
        <div class="line light-blue lighten-3"></div>
      </v-flex>
      <v-flex xs2>
        <div class="light-blue lighten-3 dotx center"></div>
      </v-flex>
      <v-flex xs6>
        <div class="line light-blue lighten-3"></div>
      </v-flex>
    </v-layout>
    <v-layout row v-show="set === 'energy'" hidden-sm-and-down>
      <v-flex xs6>
        <div class="line deep-orange darken-1"></div>
      </v-flex>
      <v-flex xs2>
        <div class="deep-orange darken-1 dotx center"></div>
      </v-flex>
      <v-flex xs4>
        <div class="line deep-orange darken-1"></div>
      </v-flex>
    </v-layout>
    <v-layout row v-show="set === 'co2'" hidden-sm-and-down>
      <v-flex xs8>
        <div class="line green accent-4"></div>
      </v-flex>
      <v-flex xs2>
        <div class="green accent-4 dotx center"></div>
      </v-flex>
      <v-flex xs2>
        <div class="line green accent-4"></div>
      </v-flex>
    </v-layout>
    <v-layout row v-show="set === 'settings'" hidden-sm-and-up>
      <v-flex xs1>
        <div style="color: blue;" class="line indigo darken-2"></div>
      </v-flex>
      <v-flex xs1>
        <div class="indigo darken-2 dotx center"></div>
      </v-flex>
      <v-flex xs10>
        <div style="color: blue;" class="line indigo darken-2"></div>
      </v-flex>
    </v-layout>
    <v-layout row v-show="set === 'savings'" hidden-sm-and-up>
      <v-flex xs4>
        <div class="line light-blue lighten-3"></div>
      </v-flex>
      <v-flex xs1>
        <div class="light-blue lighten-3 dotx center"></div>
      </v-flex>
      <v-flex xs7>
        <div class="line light-blue lighten-3"></div>
      </v-flex>
    </v-layout>
    <v-layout row v-show="set === 'energy'" hidden-sm-and-up>
      <v-flex xs7>
        <div class="line deep-orange darken-1"></div>
      </v-flex>
      <v-flex xs1>
        <div class="deep-orange darken-1 dotx center"></div>
      </v-flex>
      <v-flex xs4>
        <div class="line deep-orange darken-1"></div>
      </v-flex>
    </v-layout>
    <v-layout row v-show="set === 'co2'" hidden-sm-and-up>
      <v-flex xs10>
        <div class="line green accent-4"></div>
      </v-flex>
      <v-flex xs1>
        <div class="green accent-4 dotx center"></div>
      </v-flex>
      <v-flex xs1>
        <div class="line green accent-4"></div>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row align-center>
      <v-flex hidden-md-and-down xs2 ></v-flex>
      <v-flex xs3 hidden-sm-and-up>
        <img @click="clickSetting" class="center Settings" src="../../assets/Settings.png" alt="Settings">
      </v-flex>
      <v-flex xs3 hidden-sm-and-up>
        <img @click="clickSaved" class="center Savings" src="../../assets/Savings.png" alt="Savings">
      </v-flex>
      <v-flex xs3 hidden-sm-and-up>
        <img @click="clickEnergy" class="center Energy" src="../../assets/Energy.png" alt="Energy">
      </v-flex>
      <v-flex xs3 hidden-sm-and-up>
        <img @click="clickCo2" class="center CO2" src="../../assets/CO2.png" alt="CO2">
      </v-flex>
      <v-flex xs2 hidden-sm-and-down>
        <img @click="clickSetting" class="center Settings" src="../../assets/Settings.png" alt="Settings">
      </v-flex>
      <v-flex xs2 hidden-sm-and-down>
        <img @click="clickSaved" class="center Savings" src="../../assets/Savings.png" alt="Savings">
      </v-flex>
      <v-flex xs2 hidden-sm-and-down>
        <img @click="clickEnergy" class="center Energy" src="../../assets/Energy.png" alt="Energy">
      </v-flex>
      <v-flex xs2 hidden-sm-and-down>
        <img @click="clickCo2" class="center CO2" src="../../assets/CO2.png" alt="CO2">
      </v-flex>
      <v-flex hidden-md-and-down xs2></v-flex>
    </v-layout>
    <div class="text-xs-center">
      <div class="logo">-EMBLEM-</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      set: 'settings'
    }
  },
  methods: {
    clickSetting () {
      this.$router.push('/settings')
    },
    clickSaved () {
       this.$router.push('/savings')
    },
    clickEnergy () {
        this.$router.push('/energy')
    },
    clickCo2 () {
       this.$router.push('/carbon')
    }
  },
  created () {
      if(this.$route["fullPath"].startsWith("/savings")){
        this.set = 'savings'
      }
      if(this.$route["fullPath"].startsWith("/energy")){
        this.set = 'energy'
      }
      if(this.$route["fullPath"].startsWith("/carbon")){
        this.set = 'co2'
      }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 2.7em;
  font-family: Helvetica;
  color: #686868;
}
.dotx {
  height: 6px;
  width: 6px;
  border-radius: 50%;
  margin: 0px 4px 0px 4px;
  display: inline-block;
}
.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.Settings{
  height: 50px;
  width: 50px;
}
.Savings{
  height: 50px;
  width: 65px;
}
.Energy{
  height: 50px;
  width: 30px;
}
.CO2{
  height: 50px;
  width: 65px;
}
.line{
  height: 3px;
  background-color: black;
}
#nav{
  position: fixed;
  bottom: 5px;
  width: 100%;
}
@media (max-width: 600px){
  .Settings{
    height: 36px;
    width: 36px;
  }
  .Savings{
    height: 36px;
    width: 45px;
  }
  .Energy{
    height: 36px;
    width: 23px;
  }
  .CO2{
    height: 35px;
    width: 45px;
  }
  .Settings, .Savings, .Energy, .CO2{

  }
}
</style>
