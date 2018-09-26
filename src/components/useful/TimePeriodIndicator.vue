<template>
  <div style="line-spa">
    <hr id="line" :style="linecolor">
    <div  align="center">
      <v-layout row justify-space-between>
        <v-flex xs3>
          <div id="triangle-down" :style="bordertop" class="mx-auto" v-show="period === 'day'"></div>
          <div @click="param('day')" class="headline">Day</div>
        </v-flex>
        <v-flex xs3>
          <div id="triangle-down" :style="bordertop" class="mx-auto" v-show="period === 'week'"></div>
          <div @click="param('week')" class="headline">Week</div>
        </v-flex>
        <v-flex xs3>
          <div id="triangle-down" :style="bordertop" class="mx-auto" v-show="period === 'month'"></div>
          <div @click="param('month')" class="headline">Month</div>
        </v-flex>
        <v-flex xs3>
          <div id="triangle-down" :style="bordertop" class="mx-auto" v-show="period === 'total'"></div>
          <div @click="param('total')" class="headline">Total</div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
export default {
  props: ['color'],
  data () {
    return {
      period: ''
    }

  },
  computed: {
    linecolor () {
      return 'border-bottom: 1px solid' + this.color
    },
    bordertop () {
      return 'border-top: 14px solid ' + this.color
    }
  },
  methods: {
    param (period) {
      console.log(period)
      this.period = period
      this.$parent.showDisplay(period)
    }
  },
  mounted () {
    this.period = 'day'
  }
}
</script>
<style scoped>
#line {
  display: block;
  height: 1px;
  border: 0;
  margin: 0;
  padding: 0;
}
#triangle-down {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
</style>
