<template>
  <div>
    <v-layout row>
      <v-flex xs12 style="line-height: 1;">
        <div id="font" align="center" style="word-spacing: 10px;">{{ rateDisplay }}<span id="indicator"> {{units}}</span></div>
        <div align="center">
          <hr id="line" :style="linecolor">
        </div>
      </v-flex>
    </v-layout>
    <div align="center" :text="pagetext" id="text">{{ text }}</div>
  </div>
</template>


<script>
export default {
  props: ['color', 'text' , 'rateDisplay', 'units'],
  data () {
    return {
      unit: ''
    }
  },
  computed: {
    linecolor () {
      return 'border-bottom: 2px solid' + this.color
    },
    pagetext () {
      return this.text
    }
  }

}
</script>


<style scoped>
#line {
  display: block;
  height: 1px;
  border: 0;
  margin: 1em 0;
  padding: 0;
  width: 250px;
}
#font{
  font-family: Trebuchet, Helvetica, sans-serif;
  font-weight: 100;
  font-size: 3.8em;
}
#indicator{
  font-size: 20px;
  padding-right: 2px;
}
#text{
  font-size: 20px;
}
@media (max-width: 400px){
  #text{
    font-size: 16px;
  }
}
</style>
