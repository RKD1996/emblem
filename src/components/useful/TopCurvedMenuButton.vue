<template>
  <v-layout row class="center">
    <v-flex xs12>
      <font-awesome-icon :icon="faSlidersH" id="awesome" size="2x" :color="color"/>
    </v-flex>
  </v-layout>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faSlidersH from '@fortawesome/fontawesome-free-solid/faSlidersH'

export default {
  props: ['color'],
  components: {
    FontAwesomeIcon
  },
  computed: {
    menuButton () {
      return 'border: 1px solid' + this.color
    },
    faSlidersH () {
      return faSlidersH
    },
  }
}
</script>
<style scoped>
#awesome{
  cursor: pointer;
}
.center{
  text-align: center;
  padding: 10px;
}
@media screen and (max-width : 600px) {
  #awesome{
    padding: 5px;
  }
}
</style>
