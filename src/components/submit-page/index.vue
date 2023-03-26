<template>
    <div class="submit-page">
      <h4 class="submit-page-h4">企业法人法人信息</h4>
       <p class="submit-page-p">{{corpName}}</p>
       <input class="submit-page--input" v-model="legalPersonIdCard" type="text" placeholder="请输入法人身份证号码">
       <input class="submit-page--input" v-model="legalPersonPhone" type="text" placeholder="请输入法人手机号">
       <div class="submit-button" @click="onSubmit">提交</div>
    </div>
  </template>
  <script>
  
  export default {
    name: 'submit-page',
    data() {
      return {
        legalPersonIdCard:"",
        legalPersonPhone:"",
        corpName:"",
        payOrderId:""
      }
    },
    methods:{
      onSubmit(){
          if(!this.legalPersonIdCard?.trim() || !this.legalPersonPhone?.trim() ) {
            window.alert('法人身份证号码和法人手机号码必填')
            return false
          }
          console.log(`/API/order/V1/submit-annual-report?applyCorpName=${this.corpName}&legalPersonIdCard=${this.legalPersonIdCard}&legalPersonPhone=${this.legalPersonPhone}&payOrderId=${this.payOrderId}`)
          this.$axios.get(`/API/order/V1/submit-annual-report?applyCorpName=${this.corpName}&legalPersonIdCard=${this.legalPersonIdCard}&legalPersonPhone=${this.legalPersonPhone}&payOrderId=${this.payOrderId}`).then((res)=>{
            if(res?.data?.code == 0){
                console.log('---/API/order/V1/submit-annual-report---res',res)
               this.$router.push('/home-true')
            }else{
              window.alert(res?.data?.msg)
            }
          })
      }
    },
    mounted(){
       this.corpName = localStorage.getItem('corpName') 
       this.payOrderId = localStorage.getItem('payOrderId')
    }
  }
  </script>
  
  <style  scoped>
 .submit-page {
  margin:5px;
  background-color: #fff;
  padding: 10px;
 }
 .submit-page-h4{
   padding-bottom: 10px;
 }
 .submit-page--input{
  width: 80%;
  height: 30px;
  outline:medium;
  font-size:15px;
  border:solid 1px #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
 }
 .submit-page-p{
  padding-left: 0px;
  padding-bottom: 15px;
 }
 .submit-button{
   margin-top: 20px;
   margin-bottom: 20px;
   height: 30px;
   width: 80%;
   line-height: 30px;
   border-radius: 4px;
   text-align: center;
   border:1px solid #1989fa;
   color:#fff;
   background-color: #1989fa;;
 }

  </style>
  
  