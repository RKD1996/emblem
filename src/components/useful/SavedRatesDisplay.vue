<template>
  <div>
    <v-layout row>
      <v-flex xs12 style="line-height: 1;">
        <div id="font" align="center">{{ rateDisplay }}</div>
        <div align="center">
          <hr id="line" :style="linecolor">
        </div>
      </v-flex>
    </v-layout>
    <div align="center" :text="pagetext" style="font-size: 20px;">{{ text }}</div>
  </div>
</template>


<script>
export default {
  props: ['color', 'text', 'rateDisplay'],
  data () {
    return {
      //rateDisplay: '£ 117.8'
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
</style>
