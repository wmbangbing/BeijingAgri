<template>
  <div>
    <el-dialog
      :title="chartParam.field"
      :visible="visible"
      @close='closeDialog'
      width="90%">
      <el-row>
        <el-col :span="12">
          <div>
            <el-table
              :data="pointData"
              @header-click = "headerClick"
              style="width: 95%">
              <el-table-column
                prop="Number"
                label="Id">
              </el-table-column>
              <el-table-column
                prop="NDVI"
                label="NDVI">
              </el-table-column>
              <el-table-column
                prop="LAI"
                label="LAI">
              </el-table-column>
              <el-table-column
                prop="FVC"
                label="FVC">
              </el-table-column>
              <el-table-column
                prop="Cab"
                label="Cab">
              </el-table-column>
              <el-table-column
                prop="Time"
                label="时间">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="12" >
          <div id="chartDiv">        
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts'
import Mock from 'mockjs'
import { ArrayToObj } from '@/utils/filterData'


export default {
  data(){
    return {
      visible:this.chartParam.visible,
      pointData:[],
      chart:null
    }
  },
  props:['chartParam'],
  watch:{
    "chartParam.visible":function(curVal,oldVal){
      this.visible = true;
      var PointArray = this.getPointArray();
      this.pointData = this.filterPointArray(PointArray,this.chartParam.field)
      debugger;
      // this.initChart('NDVI');   
      this.$nextTick(function () {
        this.initChart('NDVI')                     
    })
    }
  },
  created(){
  },
  mounted(){
  },
  methods:{
    setPointObject(i,j){
      var Random = Mock.Random;
      var pointObject = {};
      pointObject.Number = 10001 + i;
      pointObject.NDVI = Random.float(0,0,4,6);
      pointObject.LAI = Random.float(69,108,2,6);
      pointObject.FVC = Random.float(5,15,4,6);
      pointObject.Cab = Random.float(1,2,4,6);
      pointObject.Time = j;

      return pointObject;
    },
    getPointArray(){
      //27个点，2年数据（i为点，j为年）
      var pointArray = [];
      for(let j = 0; j < 5; j++){
          for(let i = 0; i < 27; i++){
              pointArray.push(this.setPointObject(i,j));
          }
      }
      return pointArray;
    },
    filterPointArray(pointArray,id){
      var filterPointArray = [];
      for(let i = 0; i < pointArray.length; i++){
        if(pointArray[i]['Number'] === id){
          filterPointArray.push(pointArray[i])
        }
      }
      return filterPointArray;
    },
    headerClick(column, event){
      this.initChart(column.label);
    },
    initChart(field){
      this.chart = echarts.init(document.getElementById("chartDiv"))
      this.chart.setOption({
        title:{
          text:field
        },
        xAxis: {
            type: 'category',
            data: ArrayToObj(this.pointData).Time
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: ArrayToObj(this.pointData)[field],
            type: 'line'
        }]
      })
    },
    closeDialog(){
      this.visible = false;
    }
  }
}
</script>
<style scoped>
  #chartDiv{
    height: 500px;
  }
</style>

