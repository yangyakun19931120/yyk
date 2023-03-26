<template>
    <div class="main">
       <div class="history">
         <p class="history-p">历史订单</p>
         <div class="data-list">
            <div class="data-list__div" v-for="(item ,ind) in dataList" :key="ind">
            <p>订单号:&nbsp;{{item.payOrderId}}</p>
            <p v-if="item.orderStatus=='PAYED'">订单状态:&nbsp;<span class="success">成功</span></p>
            <p v-if="item.orderStatus!='PAYED'">订单状态:&nbsp;<span class="fail">失败</span></p>
            <p>订单金额:&nbsp;{{item.orderAmount}}
            </p>
             <p>订单日期:&nbsp;{{item.orderDate}}</p>
             <p>申请服务类别:&nbsp;{{item.applyServiceType}}</p>
            </div>
         </div>
        </div>

    </div>
  </template>
  <script>
  
  export default {
    name: 'user-page',
    data() {
      return {
//订单号 payOrderId
//订单金额 orderAmount
//订单日期 orderDate
//订单时间 orderTime
//订单状态 orderStatus
//申请服务类别  applyServiceType

// TO_PAY("TO_PAY", "待支付"),
// PAYED("PAYED", "已支付"),
// PAYING("PAYING", "支付中"),
// PAY_FAIL("PAY_FAIL", "支付失败"),
        dataList: [
    //     {
    //     "payOrderId": "订单号",
    //     "orderAmount": "订单金额",
    //     "orderDate": "订单日期",
    //     "orderStatus": "PAYED",
    //     "applyServiceType":"申请服务类别"
    //    },
    //    {
    //     "payOrderId": "订单号",
    //     "orderAmount": "订单金额",
    //     "orderDate": "订单日期",
    //     "orderStatus": "PAY_FAIL",
    //     "applyServiceType":"申请服务类别"
    //    },
      ]
      }
    },
    methods:{
        onLink(){

        }
    },
    mounted(){
        // https://zs.891156.vip/API/order/V1/submit-annual-report/query-order
        this.$axios.get(`/API/order/V1/query-order`).then((res)=>{
            console.log('/API/order/V1/query-order---res',res)
            if(res?.data?.code == 0){
              this.dataList = res.data.data || []
            }else{
                window.alert(res?.data?.msg)
            }
        })
    }
  }
  </script>
  
  <style  scoped>
  .main{
      height: 100%;
      width: 100%;
  }
  .hi{
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    margin-left: 5px;
    margin-right: 5px;
    background-color: #fff;
  }
  .history-p{
    padding-top: 10px;
    padding-left: 15px;
  }
  .data-list{
    padding-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 12px;
    line-height: 150%;
  }
  .data-list__div{
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
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
  .success{
    color:#1989fa;
  }
  .fail{
    color:red;
  }
  </style>
  
  