<template>
  <div id="main-app">
    <router-view> </router-view>
  </div>
</template>

<script>


export default {
  name: "App",
  components: {},
  data() {
    return {
     
    };
  },
  created() {
   
  },
  mounted() {
   
  },
  beforeDestroy() {
   
  },
  methods: {
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin:0;
  padding:0;
}
html,body,#app,#main-app{
  width: 100%;
  height: 100%;
  background-color:#e8e8e8;
  text-align: left;
}
 
</style>
