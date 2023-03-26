<template>
    <div class="ren-zheng">
      <div class="ren-zheng-top">
        <p class="ren-zheng-title">小微管理服务</p>
        <div class="ren-zheng-corp-name">
          <div>
            <p class="ren-zheng-corp-name-p1 p-item">{{item.corpName}}</p>
            <p class="p-item">统一信用代码:&nbsp;{{item.socialCode}}</p>
            <p class="p-item">经营者:&nbsp;{{item.legalPersonName}}</p>
           </div>  
        </div>
      </div>
      <div class="main-body">
        <div class="qi-ye-nian-bao">
           <img :src="bg0" alt="">
        </div>
       <img class="bg-1" :src="img1"/>
       <div class="nian-bao">
        
        <img :src="img2" alt="" class="bg-2">
        <div class="main-tao-can">
          <p class="main-tao-can-check-box__p">
            <label class="check-box__label" :class="{'check-box__label--cur':checkedRadio==1}" @click="onCheckedRadio(1)" name="check"  value="1"> 线上作废服务费</label>
            <label class="check-box__label" :class="{'check-box__label--cur':checkedRadio==2}"  @click="onCheckedRadio(2)">1年期服务费</label>
            <label class="check-box__label" :class="{'check-box__label--cur':checkedRadio==3}"  @click="onCheckedRadio(3)">2年期服务费</label>
          </p>
        </div>
       </div>
       <div class="check-box">
        <div class="check-box__p-p">
          <p><span class="check-box__p-p-left">服务项目:</span><span class="right">{{msg}}</span></p>
          <p class="red"><span class="check-box__p-p-left">检验费用:</span>¥{{checkedRadioMoney }}</p>
          <p  class="blue"><span class="check-box__p-p-left blue">核验说明:</span>检验不通过，全额退款</p>
        </div>
        <div class="pay-button-box">
          <div class="pay-button" @click="onPay"> 立即支付</div>
        </div>
       
       </div>
      </div>
      
    </div>
  </template>
  <script>
  import img1 from './img/bg-1.png'
  import img2 from './img/bg-2.png'
  import bg0 from './img/bg-0.png'
  export default {
    name: 'ren-zheng',
    data() {
      return {
        bg0,
        img1,
        img2,
        checkedRadio:1,
        checkedRadioMoney: 283 , // 283
        item:{},
        msg:"线上作废服务费用",
      }
    },
    mounted(){
      this.getOpenId();
      this.item = {
        corpName:localStorage.getItem("corpName"),
        "legalPersonName": localStorage.getItem("legalPersonName"),
        registeredDate:localStorage.getItem("registeredDate").slice(0,11),
        socialCode:localStorage.getItem("socialCode"),
      }
    },
    methods:{
      getOpenId(){
        const search = window.location.search
        var obj = this.formatSearch(search)
        console.log('obj---------',obj)
        this.$axios.get(`/API/order/V1/getAccessToken?code=${obj.code}`).then((res)=>{
          console.log('获取openId-----------',res)
          if(res?.data?.code == 0 ){
            localStorage.setItem('openid',res?.data?.data)
          }else{
            window.alert(res?.data?.msg)
          }
        })
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
      onPay(){
          const openid =  localStorage.getItem('openid')
          if(!openid){
            window.alert("openid缺失，请退出，微信扫码重新进入")
            return false
          }

// 3.认证-选服务-确认->系统下单
// https://zs.891156.vip/API/order/V1/submit-order
// @RequestParam("orderAmount") BigDecimal orderAmount,//金额
// @RequestParam("applyServiceType") String applyServiceType,//服务类型
// @RequestParam("openid") String openid,//用户微信openid
      console.log(`/API/order/V1/submit-order?&orderAmount=${this.checkedRadioMoney}&applyServiceType=${this.msg}&openid=${openid}`)
      this.$axios.get(`/API/order/V1/submit-order?&orderAmount=${this.checkedRadioMoney}&applyServiceType=${this.msg}&openid=${openid}`).then((res)=>{
             console.log('res----------API/order/V1/submit-order---',res)
             if(res.data.code==0){
              this.payMoney(res?.data?.data)
             }else{
               window.alert(res.data.msg)
             }
          })
      },
      payMoney(data) {
        console.log('payMoney-----',data)
        const payOrderId = data;
        localStorage.setItem('payOrderId',payOrderId)
        const orderAmount = this.checkedRadioMoney;
        const description = "企业服务"
        const openId = localStorage.getItem('openid')
        const currUrl = encodeURIComponent(location.href.split('#')[0])
        console.log('支付接口4-myGetPayParam---',`payOrderId=${payOrderId}&orderAmount=${orderAmount}&description=${description}&openId=${openId}&currUrl=${currUrl}`)
        this.$axios.get(`/API/order/V1/myGetPayParam?payOrderId=${payOrderId}&orderAmount=${orderAmount}&description=${description}&openId=${openId}&currUrl=${currUrl}`).then((res)=>{
           console.log('/API/order/V1/myGetPayParam-----res',res) 
           this.truePayJava(res.data.data)
//  private String payOrderId;//系统订单号
// private String prepay_id;//微信预付号
// private String appId;//应用ID
// private String timeStamp = String.valueOf(System.currentTimeMillis()).substring(3);//时间戳
// private String nonceStr = UUID.fastUUID().toString().substring(10);//随机字符串
// private String packageStr;//订单详情扩展字符串
// private String signType = "RSA";//签名方式
// private String paySign;//支付签名
// private String signature;//签名值
// private String jsapi_ticket;
// private String url;    
        })
      },
      truePayJava(data){
        var _this = this;
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timeStamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名
          jsApiList: ['/API/corp/V1/bindStaff', '/API/corp/V1/list', '/API/order/V1/submit-order', '/API/order/V1/query-order',"/API/order/V1/myGetPayParam", "/API/order/V1/submit-annual-report"] // 必填，需要使用的JS接口列表
        });
        const payOrderId = localStorage.getItem('payOrderId')
        window.wx.chooseWXPay({
          timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
          package: data.packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: data.signType, // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
          paySign: data.paySign, // 支付签名
          success: function (res) {
            // 支付成功后的回调函数
          console.log('res-支付成功----',res)
// TO_PAY("TO_PAY", "待支付"),
// PAYED("PAYED", "已支付"),
// PAYING("PAYING", "支付中"),
// PAY_FAIL("PAY_FAIL", "支付失败")
            _this.$axios(`/API/order/V1/pay/notice?payOrderId=${payOrderId}&payStatus=PAYED`).then(()=>{
               _this.$router.push('/submit-page')
            })
          },
          cancel:function(){
            _this.$axios(`/API/order/V1/pay/notice?payOrderId=${payOrderId}&payStatus=PAY_FAIL`).then(()=>{
            })
          //  window.alert("取消支付")
          },
        });
      },
      onCheckedRadio(checkedRadio){
          this.checkedRadio = checkedRadio
          if(checkedRadio==1){
            this.checkedRadioMoney = 283 //报废 283
            this.msg = "线上作废服务费用"
          }else if(checkedRadio==2){
            this.checkedRadioMoney = 283 // 一年服务
            this.msg = "一年期服务费用"
          }else if(checkedRadio==3){
            this.checkedRadioMoney = 362 // 2年服务
            this.msg = "二年期服务费用"
          }
      }
    }
  }
  </script>
  
  <style  scoped>
  .main{
      height: 100%;
      width: 100%;
  }
  .check-box{
    background-color: #fff;
    padding: 15px 10px 30px 10px;
  }
  .check-box__p{
    display: flex;
    line-height: 200%;
    flex-direction: column;
    padding-bottom: 20px;
  }
  .data-list{
    padding-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 12px;
    line-height: 150%;
  }
  .data-list__div{
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
  }
  .check-box__p-p{
    display: flex;
    line-height: 200%;
    flex-direction: column;
  }
  .button{
    display: inline-block;
    float: right;
    background-color: #1989fa;
    color:#fff;
    border:1px solid #1989fa;
    width: 80px;
    text-align: center;
    border-radius: 2px;
  }
  .check-box__p-p-left{
    color:#333;
  }
  .blue{
    color:#1989fa
  }
  .red{
    color:#FF0000
  }
  .pay-button-box{
    position: fixed;
    left:0;
    bottom: 0;
    z-index: 99;
    width: 100vw;
    height: 60px;
    background-color: #fff;
    text-align: center;
  }
  .pay-button{
    margin:  0 auto;
    margin-top: 10px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    width: 70%;
    color:#fff;
    border-radius: 4px;
    background-color: #1989fa;
  }
  .ren-zheng-top{
    background-color: #435cf7;
    color:#fff;
    font-weight: 700;
    padding-top: 10px;
    height: 188px;
    margin-bottom: 10px;
    border-bottom-right-radius: 100px;
    border-bottom-left-radius: 100px;
    background-color: #4357fc;
    background-color: #1989fa;
    background-color: #2780ee;
  }
  .ren-zheng-title{
    padding-left: 15px;
  }
  .ren-zheng-corp-name{
    width: 95%;
    margin: 0 auto;
    margin-top: 30px;
    padding: 20px 10px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color:#fff ;
    color:#999;  
  }
  .p-item{
    line-height: 200%; 
    color:#000;
    font-weight: normal;
  }
  .ren-zheng-corp-name-p1{
    color:red;
    font-weight: 700;
  }
  .bg-1{
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    width:100%;
    height: auto;
  }

  .bg-2{
    width:auto;
    height:90px;
    margin:0 auto;
  }
  .main-body{
    width: 95%;
    margin: 0 auto;
    background-color: #fff;
  }
  .main-tao-can{
    background-color: #fff;
  }
  .main-tao-can-check-box__p{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #efefef;
    line-height: 200%;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .main-tao-can-check-box__p .check-box__label{
    height: 30px;
    line-height: 30px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 4px;
    color:#000;
  }
  .main-tao-can-check-box__p .check-box__label--cur{
      color:#1989fa;
      background-color: #fff;;
  }
  .qi-ye-nian-bao{
    padding-top: 10px;
    text-align: center;
    margin-bottom: 10px;
  }
  .nian-bao{
    text-align: center;
  }
 

  </style>
  
  