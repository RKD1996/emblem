<template>
  <div class="text-xs-center">
    <div class="logo">-EMBLEM-</div>
  </div>
</template>

<script>
import checkUser from '../../mixins/checkUserMixin'
export default {
  data () {
    return {
    }
  },
  mixins: [checkUser],
  created () {
      this.checkUser()
  }
}
</script>

<style lang="scss" scoped>
.logo {
  font-size: 2.7em;
  font-family: Helvetica;
  color: white;
}

@media (min-width: 960px) {
  .logo {
    font-size: 5em;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  .logo {
    font-size: 4em;
  }
}

@media (max-width: 599px) {
  .logo {
    font-size: 3em;
  }
}

</style>
