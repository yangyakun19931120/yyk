<template>
  <div class="wen-an">
      <h4 class="wen-an-h3">最新公告</h4>
      <div class="item">
        <p><span class="pre-title">最新</span> <span class="title">企业管理6字真言</span></p>
        <span class="time">2023-03-01</span> 
      </div>
      <div class="item">
        <p><span class="pre-title">最新</span> <span class="title">企业管理5步法</span></p>
        <span class="time">2023-03-16</span> 
      </div>
      <div class="item">
        <p><span class="pre-title">最新</span> <span class="title">企业管理就是抓住客户</span></p>
        <span class="time">2023-03-17</span> 
      </div>
  </div>
</template>

<script>
export default {
    name:"wen-an",
    data(){
        return {

        }
    }
}
</script>

<style scoped>
.wen-an{
    background-color: #fff;
    padding: 10px;
}
.wen-an-h3{
  
}
.item{
    line-height: 200%;
    display: flex;
    justify-content: space-between;
    color:#333;
}
.pre-title{
    color:#8cbef0;
    border:1px solid #8cbef0;
    border-radius: 1px;
    font-size: 14px;
}

</style>