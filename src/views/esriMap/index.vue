<template>
<div>
 <div id="map"></div>
  <FieldTable id="table" visible="true" />
</div>
 
</template>
<script>
import esriLoader from "esri-loader";
import FieldTable from '@/components/FieldTable'
import {createMap} from "./esriMap"

export default  {
  name: 'EsriMap',
  components:{
    FieldTable
  },
  mounted(){
    this.initMap();
  },
  methods:{
    initMap(){
      const options = {
        url: 'http://202.114.148.160/arcgis_js_api4.7/library/4.7/dojo/dojo.js'
      };
      createMap(esriLoader,options)
    }
  },
}
</script>

<style>
  @import url('http://202.114.148.160/arcgis_js_api4.7/library/4.7/esri/css/main.css');
  #map{
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
  }  
</style>

