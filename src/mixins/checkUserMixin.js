export default {
  methods:{
    checkUserHome () {
      if(localStorage.getItem("access-token") ){
        localStorage.setItem('time', Date())
        var path = localStorage.getItem("step")
        this.$router.push('/'+path)
      }
      else{
        this.$router.push('/')
      }
    },
    checkUser () {
      var obj = this
      if(localStorage.getItem("access-token") ){
        var path = localStorage.getItem("step")
        if(path == 'human' || path == 'pin'|| path == 'energysetup'|| path == 'pin'){
          localStorage.setItem('time', Date())
          var path = localStorage.getItem("step")
          this.$router.push('/'+path)
        }
        else{
          var time1 = new Date(localStorage.getItem("time"))
          var time2 = new Date();
          var diff =(time2.getTime() - time1.getTime()) / 1000;
          diff /= 60;
          diff = Math.abs(Math.round(diff));
          if(diff <= 15)
          {
            localStorage.setItem('time', Date())
          }else{
            localStorage.clear()
            sessionStorage.clear()
            obj.$router.push('/sessionexpire')
          }
        }
      }
      else{
        obj.$router.push('/')
      }
    }
  }
}
