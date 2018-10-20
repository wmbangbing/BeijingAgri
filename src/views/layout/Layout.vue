<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar class="navbar" />      
      <app-main/> 
    </div>
  </div>
</template>
<script>
import { Navbar,Sidebar, AppMain } from './components'
import axios from "axios";
import ResizeMixin from './mixin/ResizeHandler'
import esriLoader from 'esri-loader'

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data(){
    return {
      isCollapse: false,
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted(){
  }, 
  methods: {
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    getApi() {
      axios
        .get("http://202.114.148.160/webapi/api/values")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// @import url('http://202.114.148.160/arcgis_js_api4.7/library/4.7/esri/css/main.css');
// .container {
//   position: fixed;
//   height: 100%;
//   width: 100%;
// }

// .header {
//   background-color: darkkhaki;
// }

// .aside {
//   background-color: darkseagreen;
// }

// .main {
//   background-color: whitesmoke;
// }

// .footer {
//   background-color: sienna;
// }

@import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
