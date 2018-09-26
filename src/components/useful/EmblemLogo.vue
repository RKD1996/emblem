<template>
  <div class="text-xs-center">
    <div class="logo">-EMBLEM-</div>
    <div class="dots">
      <div class="indigo darken-2 dotx"></div>
      <div class="cyan lighten-1 dotx"></div>
      <div class="yellow darken-2 dotx"></div>
      <div class="red darken-1 dotx"></div>
      <div class="green darken-1 dotx"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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

@media (min-width: 960px) {
  .logo {
    font-size: 5em;
  }
  .dotx {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin: 0px 10px 0px 10px;
    display: inline-block;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  .logo {
    font-size: 4em;
  }
  .dotx {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    margin: 0px 7px 0px 7px;
    display: inline-block;
  }
}

@media (max-width: 599px) {
  .logo {
    font-size: 3em;
  }
  .dotx {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    margin: 0px 4px 0px 4px;
    display: inline-block;
  }
}

</style>
