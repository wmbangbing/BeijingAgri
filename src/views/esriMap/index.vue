<template>
<div>
 <div id="map"></div>
  <!-- <FieldTable id="table" :visible=fieldTableVisible  /> -->
  <SelectDialog @returnId="getSelectedId" :selectDialogParam=selectDialogParam   />
  <ChartDialog  :chartParam=chartParam />
  <PivottableDialog :pivottableParam=pivottableParam  />
  <FieldTableDialog :fieldTableParam=fieldTableParam />
</div>
 
</template>
<script>
import esriLoader from "esri-loader";
import FieldTable from '@/components/FieldTable'
import SelectDialog from '@/components/SelectDialog' 
import ChartDialog from '@/components/ChartDialog' 
import PivottableDialog from '@/components/PivottableDialog' 
import FieldTableDialog from '@/components/FieldTableDialog' 
import {createMap} from "./esriMap"
import { getMPData } from '@/api/MonitoringPoint'
import { unique } from '@/utils/filterData'


export default  {
  name: 'EsriMap',
  data(){
    return {
      fieldTableVisible:false,
      selectDialogParam:{
        visible:false,
        data:""
      },
      chartParam:{
        visible:false,
        field:null        
      },
      pivottableParam:{
        visible:false,
        id:""
      },
      fieldTableParam:{
        visible:false,
        id:""
      },
      dialogFormVisible:false,
      selectId:[],
      jcLayer:undefined
    }
  },
  components:{
    FieldTable,
    SelectDialog,
    ChartDialog,
    PivottableDialog,
    FieldTableDialog
  },
  mounted(){    
    var self = this;
    this.initMap(self);
  },
  methods:{
    initMap(self){
      const options = {
        url: 'http://202.114.148.160/arcgis_js_api4.8/library/4.8/dojo/dojo.js',
        // url:'https://js.arcgis.com/4.9/'
      };
      createMap(esriLoader,options,self)
    },
    getSelectedId(Ids) {
      this.selectId = Ids;
      var str = "";

      for(let i = 0; i < Ids.length; i++){
        str = str + `number = ${Ids[i]} or `
      };
      var defineStr =  str.substring(0,str.length - 4);
      console.log(defineStr);
      this.jcLayer.definitionExpression = defineStr;
    },
    getData(){
      var self = this;
      getMPData().then(response => {
        var filterData = unique(response.data);
        self.selectDialogParam.data = filterData;
        self.selectDialogParam.visible = !self.selectDialogParam.visible;
      })
    },
  },
}
</script>

<style scoped>
  @import url('http://202.114.148.160/arcgis_js_api4.8/library/4.8/esri/css/main.css');
  /* @import url('https://js.arcgis.com/4.9/esri/css/main.css'); */
  #map{
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
  }  
</style>

