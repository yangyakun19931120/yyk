<template>
    <div class="main-index">
        <router-view class="div-body"></router-view>
        <div class="footer" v-if="isSHowFooter" v-show="isOriginHeight">
            <div @click="onHome" class="footer-home" :class="{'is-home-cur':isHomeCur}">首页</div>
            <div @click="onUser"  class="footer-user" :class="{'is-my-cur':isMyCur}">我的订单</div>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'main-home',
    data() {
      return {
        isHomeCur:true,
        isMyCur:true,
        isSHowFooter:true,
        screenHeight: document.documentElement.clientHeight,     // 当前高度
        originHeight: document.documentElement.clientHeight,     //默认高度，用作比较
        isOriginHeight: true    //当前高度是否仍等于默认高度
      }
    },
    methods:{
        onHome(){
            this.$router.push(`/home-true?${window.location.search}`)
        },
        onUser(){
            this.$router.push(`/user?${window.location.search}`)
        },
         formatSearch(se) {
              if (typeof se !== "undefined") {
                  se = se.substr(1); //name=a&age=20
                  var arr = se.split("&"); //['name=a', 'age=20']
                  var obj = {};
                  var newarr = [];
                  arr.forEach((item) => {
                      newarr = item.split("=");  //['name', 'a']
                      if (typeof obj[newarr[0]] === "undefined") {
                          obj[newarr[0]] = newarr[1];    //{name: 'a'}

                      }
                  })

                  return obj   //{name: 'a', age: '20'}
              }

      },
      getWeiXinToken(){
        var searchOBJ = this.formatSearch(window.location.search)
        if(searchOBJ.code){
            localStorage.setItem("code",searchOBJ.code)
        }
      }
    },
mounted(){
   this.getWeiXinToken();
   window.onresize = () => {
    return (() => {
      this.screenHeight = document.documentElement.clientHeight;
    })()
   }
},
watch:{
 screenHeight (val) {
    console.log('this.originHeight',this.originHeight)
    console.log('this.originHeight--val',val)
    if(this.originHeight - val > 60) {    //这里以防万一改了下判断形式，当屏幕高度减少了60px以上时才隐藏footer
      this.isOriginHeight = false;
    }else{
      this.isOriginHeight = true;
    }
  },
   $route:{
     handler(to){
       const path = to.path || ''
       if(path.indexOf('home-true')>-1 ){
           this.isHomeCur = true
           this.isMyCur = false
        }else if(path.indexOf('user')>-1){
           this.isHomeCur = false
           this.isMyCur = true
        }else{
            this.isHomeCur = false
           this.isMyCur = false
        }
        if(path=='/home'){
            this.isSHowFooter = false;
        }else{
            this.isSHowFooter = true;
        }
     },
     immediate:true,//第一次就执行
   }
}
  }
  </script>
  
  <style  scoped>
  .main-index{
      width:100vw;
      height: 100vh;
  }
  .footer{
    position:absolute;
    bottom:0;
    width: 100vw;
    height: 50px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    line-height: 50px;
    text-align: center;
    color:#333;
    font-weight: 700;
    font-size: 16px;
  }
  .footer-home{
    flex: 1;
    border-right:  1px solid #ccc;
  }
  .footer-user{
    flex: 1;
  }
  .is-home-cur{
    color:#1989fa;
  }
  .is-my-cur{
    color:#1989fa;
  }
  .div-body{
    height: calc(100% - 50px) !important;
    overflow: scroll;
  }

  </style>
  
  