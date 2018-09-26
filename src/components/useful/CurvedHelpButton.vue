<template>
  <v-layout row class="center">
    <v-flex xs12>
      <font-awesome-icon :icon="faQuestion" id="awesome" size="2x" :color="color"/>
    </v-flex>
  </v-layout>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faQuestion from '@fortawesome/fontawesome-free-solid/faQuestion'

export default {
  props: ['color'],
  components: {
    FontAwesomeIcon
  },
  computed: {
    faQuestion () {
      return faQuestion
    },
  }
}
</script>
<style scoped>
.center{
  text-align: center;
  padding: 10px;
}
#awesome{
  cursor: pointer;
}
@media screen and (max-width : 600px) {
  #awesome{
    padding:5px;
  }
}
</style>
