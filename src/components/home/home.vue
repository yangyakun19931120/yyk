<template>
    <div class="main">
       <div class="modal" v-if="isSHowModal">
           <div class="body">
               <div class="body-div">
                <h3 class="body-div__h3">认证登录</h3>
                <p class="body-div-p">
                 <input class="body-div-p-input" v-model="userPhone" type="text" placeholder="请输入手机号">
                </p>
                <p class="body-div-p">
                    <input v-model="code" class="body-div-p-input"  type="text"  placeholder="认证码">
                </p>
               </div>
               <div class="modal-footer">
                  <div class="modal-footer-btn" @click="onInitMsg">确认</div>
               </div>
           </div>
       </div>
    </div>
  </template>
  <script>
  import bcPNG from './img/bc.png'
//   import wenAn from './wen-an.vue' 
  export default {
    name: 'main-home-page',
    components:{
        // wenAn
    },
    data() {
      return {
        userPhone:"",
        code:"",
        bcPNG,
        isSHowModal:true, // 显示弹窗蒙层
        input:"",// 用户的查询的公司的名字
      }
    },
    mounted(){
    },
    methods:{
        onInitMsg(){
            var _this = this;
            if(!this.userPhone?.trim() || !this.code?.trim()){
                window.alert('手机号和认证码必填！')
                return false
            }
            // 传输手机号码 staffCode 员工
            this.$axios.get(`/API/corp/V1/bindStaff?staffCode=${this.code}&customerName=${this.userPhone}&customerId=${this.userPhone}`).then((res)=>{
                console.log('res/API/corp/V1/bindStaff------------',res)
                if(res?.data.code==0){
                    _this.$router.push('/home-true') 
                }else{
                    window.alert(res?.data?.msg)
                    this.isSHowModal = true 
                }
            })
        },
        onSearchList(){
            if(!this.input?.trim()){
                window.alert('必须输入公司名称或者法人后再查询')
                return false
            }
            this.$router.push(`/data-list?name=${this.input}`)
        }
    }
  }
  </script>
  
  <style  scoped>
  .main{
      width: calc(100vw - 10px);
      padding-left: 5px;
      padding-right: 5px;
      height: calc(100% - 50px)
  }
  .bg-img{
    width: calc(100vw - 10px);
    height: auto;
    border-radius: 4px;
  }
  .home-page{
    background-color: #fff;
  }
  .home-page-search{
    margin-top: 10px;
    padding: 10px;
    padding-bottom: 0;
    background-color: #fff;
    border-radius: 4px;
    min-height: 100px;
  }
  .body-div__h3{
    padding-left: 20px;
  }
  .home-page-search__h1{
    padding:10px 0 10px 0;
    color:#1989fa;
  }
  .home-page-search__input{
    float: left;
    width: 70%;
    height: 30px;
    border-radius: 4px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    outline:medium;
    font-size:15px;
    border:solid 1px #1989fa;
  }
  .home-page-search__button{
    float: left;
    width: 15%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #1989fa;
    background-color: #1989fa;
    color:#fff;
    border-left: none;
    border-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
.modal{
    position: fixed;
    top:0;
    left:0;
    z-index: 8;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
}
.body{
    width: 80vw;
    margin: 0 auto;
    margin-top: 50px;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
}
.body-div{
    padding-top: 10px;
    line-height: 200%;
}
.body-div input{
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    outline:medium;
    font-size:15px;
    border:solid 1px #ccc;
    flex:1;
}
.body-div-p{
    display: flex;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.body-div-p-span{
    display: inline-block;
    width: 120px;
}
.body-div-p-input{
    width: 80%;
    padding-left: 5px;
}

.modal-footer-btn{
    width: 50vw;
    height: 40px;
    line-height: 40px;
    color:#fff;
    background-color: #1989fa;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 4px;

}
.modal-footer{
    padding-bottom: 40px;
}
.color-blue{
    color: #1989fa; 
}
.pp{
    color:#333;
    padding-left: 10px;
    padding-bottom: 10px;
    margin-top: -10px;
}

  </style>
  
  