<template>
  <v-layout row>
    <v-flex xs12>
      <v-layout>
        <v-flex xs3 offset-xs3 class="text-xs-center">
          <div id="triangle-up" :style="borderbottom" class="mx-auto" @click="increment(true, 'number')"></div>
          <hr v-bind:class="color" class="standline">
          <div v-model="numVal" class="display-3">{{ numVal }}</div>
          <hr v-bind:class="color" class="standline">
          <div id="triangle-down" :style="bordertop" class="mx-auto" @click="increment(false, 'number')"></div>
        </v-flex>
        <v-flex xs1>
          <v-layout flex align-center justify-center fill-height>
            <div class="black decimal"></div>
          </v-layout>
        </v-flex>
        <v-flex xs3 class="text-xs-center">
          <div id="triangle-up" :style="borderbottom" class="mx-auto" @click="increment(true, 'decimal')"></div>
          <hr v-bind:class="color" class="standline">
          <div v-model="decVal" class="display-3">{{ decVal }}</div>
          <hr v-bind:class="color" class="standline">
          <div id="triangle-down" :style="bordertop" class="mx-auto" @click="increment(false, 'decimal')"></div>
        </v-flex>
        <v-flex xs3>
          <v-layout flex align-center fill-height>
            <div class="title">p/kWh</div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  props: ['color', 'numberValue', 'decimalValue'],
  components: {

  },
  computed: {
    borderbottom () {
      return 'border-bottom: 14px solid ' + this.color
    },
    bordertop () {
      return 'border-top: 14px solid ' + this.color
    }
  },
  data () {
    return {
      numVal: this.numberValue,
      decVal: this.decimalValue
    }
  },
  watch: {
    numberValue: function(newVal, oldVal) {
      this.numVal = newVal
    },
    decimalValue: function(newVal, oldVal) {
      this.decVal = newVal
    }
  },
  methods: {
    increment (isAdd, which) {
      if (
        (this.decVal == 9 && isAdd == true && which == 'decimal') ||
        (this.decVal == 0 && isAdd == false && which == 'decimal') ||
        (this.numVal == 25 && isAdd == true && which == 'number') ||
        (this.numVal == 0 && isAdd == false && which == 'number')
      ) {
        console.log(isAdd)
        return
      }
      if(isAdd){
        which == 'number'? this.numVal += 1 : this.decVal += 1;
      } else {
        which == 'number'? this.numVal -= 1 : this.decVal -= 1;
      }
      var newVal = this.numVal + (this.decVal / 10)
      console.log(newVal)
      this.$emit("increment", newVal);
    }
  },
  created() {
  }

}
</script>


<style scoped>
hr.standline {
  border:none;
  padding:0px;
  margin:0px;
  height:1px;
}

.decimal {
  border-radius:50%;
  height:7px;
  width:7px
}

#triangle-up {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
#triangle-down {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
</style>
