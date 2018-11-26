<template>
  <el-dialog
    :visible="visible"
    @close='closeDialog'
    width="90%">
    <div id="table"></div>
  </el-dialog>
</template>
<script>
import $ from 'jquery'
import jqueryui from 'jqueryui'
import pivottable from 'pivottable'
import d3 from 'd3'
import c3 from 'c3'
import {c3_renderers} from "./c3_renderers"
import { getList } from '@/api/FieldBlock'
import { getMPData } from '@/api/MonitoringPoint'




export default{
  data(){
    return {
      visible:this.pivottableParam.visible,
      renderers:$.renderers
    }
  },
  watch:{
    "pivottableParam.visible":function(curVal,oldVal){
      this.visible = true;
      if(this.pivottableParam.id === "pivotTableDK"){
        this.$nextTick(function () {
          this.initPivottable(getList)    
        })
      }else{
        this.$nextTick(function () {
          this.initPivottable(getMPData)    
        })
      }  
    }
  },
  props:["pivottableParam"],
  created(){
      c3_renderers.call(this,$,c3)
      var renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers);
  },
  methods:{
    closeDialog(){
      this.visible = false;
    },
    initPivottable(fct){

      var self = this;
      fct().then(response => {
        console.log(response)
        $("#table").pivotUI(
          response.data,{
            renderers: self.renderers,
          }
        );
      })

    }
  }
}
</script>
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/pivottable/2.20.0/pivot.min.css");
#table{
  height: 100vc; 
}
</style>

