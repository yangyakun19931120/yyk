<template>
    <div class="data-list">
      <div>
       <div class="data-list__div" v-for="(item ,ind) in dataList" :key="ind">
        <p class="data-list__div__p"><span class="data-list__div__p__span">{{item.corpName}}</span><span  class="button" @click="onLink(item)">立即认证</span></p>
        <div class="data-list__div__p2">
           <div class="data-list__div__p2-item">
            <p class="data-list__div__p2-item-p">法人</p>
            <p>{{item.legalPersonName}}</p>
           </div> 
           <div class="data-list__div__p2-item">
            <p class="data-list__div__p2-item-p">注册资本</p>
            <p>****</p>
           </div> 
           <div class="data-list__div__p2-item">
            <p class="data-list__div__p2-item-p">注册日期</p>
            <p>{{item.registeredDate.slice(0,11)}}</p>
           </div> 
        </div>
        <p>统一信用代码: <span class="data-list-p-social-code">&nbsp;{{item.socialCode}}</span></p>
       </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'data-list',
    data(){
      return{
        dataList: [
    //    {
    //     "corpName": "11百度（中国）有限公司",
    //     "legalPersonName": "11沈抖",
    //     "socialCode": "1191310000775785552L",
    //     "registeredCapital": "11310115400176517",
    //     "registeredDate": "112005-06-06 00:00:00.0",
    //     "corpStatus": "11存续",
    //     "corpTel": null,
    //     "corpProductName": null,
    //     "corpAddr": "11上海",
    //     "corpBusinessScope": null,
    //     "registeredCode": "1191310000775785552L"
    //    }
      ]
      }
    },
    methods:{
      onLink(item){
        // 存下选中的内容
        console.log('item------------',item)
        localStorage.setItem('corpName',item.corpName)
        localStorage.setItem('legalPersonName',item.legalPersonName)
        localStorage.setItem('registeredDate',item.registeredDate)
        localStorage.setItem('socialCode',item.socialCode)
        //存下选中的内容 结束
        this.$axios.get(`/API/order/V1/getCodeUrl?reUrl=https://zs.891156.vip/myH5/ren-zheng`).then((res)=>{
            console.log('/API/order/V1/getCodeUrl-------',res)
             if(res?.data?.code==0){
                window.location.href = res?.data?.data
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

          }
    },
    mounted(){
       const search = window.location.search
       var obj = this.formatSearch(search)
       this.$axios.get(`/API/corp/V1/list?tokenValue=qwz321&corpName=${obj.name}`).then((res)=>{
            const arr = res?.data?.data
            this.dataList = arr
            if(this.dataList?.length > 5){
                this.dataList.length = 5
            }
       })
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .data-list{
    padding-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 12px;
    line-height: 150%;
    overflow-y: scroll;
  }
  .data-list__div{
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
  }
  .button{
    background-color: #1989fa;
    color:#fff;
    border:1px solid #1989fa;
    width: 80px;
    line-height: 30px;
    height:30px;
    text-align: center;
    border-radius: 4px;
  }
  .data-list__div__p{
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0eded;
    justify-content: space-between;
    align-items: center;
  }
  .data-list__div__p__span{
    flex:1 ;
    font-weight: 700;
  }
  .data-list__div__p2{
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 150%;
    display: flex;
    justify-content: space-between;
  }
  .data-list__div__p2-item-p{
    color:#666;
    padding-bottom: 5px;
  }
  .data-list-p-social-code{
    color:#666;
  }

  </style>
  