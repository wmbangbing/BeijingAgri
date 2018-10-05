<template>
  <div  class="app-wrapper">
    <!-- <div class="drawer-bg" /> -->
    <!-- <sidebar class="sidebar-container"/> -->    
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <div class="sidebar-container">
      <el-menu 
        :show-timeout="200"
        :collapse="isCollapse"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF">
        <el-submenu index="1">
          <template slot="title">
            <svg-icon icon-class="password"/>
            <span slot='title'>nitaahsdas</span>
          </template>
            <el-menu-item index="1-1">
              <svg-icon icon-class="password"/>
              <span slot='title'>16854156</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <svg-icon icon-class="password"/>
              <span slot='title'>1541566</span>
            </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    
    <div class="main-container">
      <navbar/>
      
      <!-- <app-main/>  -->
    </div>
  </div>
</template>
<script>
import { Navbar, AppMain } from './components'
import axios from "axios";
import ResizeMixin from './mixin/ResizeHandler'
import esriLoader from 'esri-loader'

export default {
  name: "Layout",
  components: {
    Navbar,
    // Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data(){
    return {
      isCollapse: false
    };
  },
  computed: {
    // sidebar() {
    //   return this.$store.state.app.sidebar
    // },
    // device() {
    //   return this.$store.state.app.device
    // },
    // classObj() {
    //   return {
    //     hideSidebar: !this.sidebar.opened,
    //     openSidebar: this.sidebar.opened,
    //     withoutAnimation: this.sidebar.withoutAnimation,
    //     mobile: this.device === 'mobile'
    //   }
    // }
  },
  mounted(){
    const options = {
      url: 'http://202.114.148.160/arcgis_js_api4.7/library/4.7/dojo/dojo.js'
    };
    esriLoader.loadModules(['esri/Map','esri/views/MapView'], options)
    .then(([Map,MapView]) => {
      let map = new Map({
        basemap: 'dark-gray'
      });

      const view = new MapView({
        map: map,
        container: 'main',
      })
    })
    .catch(err => {
      console.error(err);
    });
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
