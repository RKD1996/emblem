<template>
  <div class="top">
    <div class="logo mb-5 pb-5">
      <emblem-logo></emblem-logo>
    </div>
    <div class="signin pt-2">
      <v-layout align-center>
        <v-flex xs12>
          <div class="text-xs-center">
            <v-btn fab outline large depressed color="black" to="/signin">Sign In</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>


<script>
import EmblemLogo from './useful/EmblemLogo.vue'
import checkUserMixin from '../mixins/checkUserMixin'

export default {
  components: {
    "emblem-logo": EmblemLogo,
  },

  data () {
    return {
    }
  },
  methods:{

  },
  mixins: [checkUserMixin],
  created(){
    this.checkUserHome()
  }
}
</script>

<style lang="scss" scoped>
.top {
  margin-top: 170px;
}

@media (min-width: 600px) and (max-width: 1263px)  {
  .top {
    margin-top: 150px;
  }
}

@media (min-width: 1264px) {
  .top {
    margin-top: 170px;
  }
}

</style>
