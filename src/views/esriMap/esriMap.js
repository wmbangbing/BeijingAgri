export const createMap = function (esriLoader, options, self) {
  esriLoader.loadModules(
    [
      'esri/Map',
      "esri/Basemap",
      'esri/views/MapView',
      "esri/layers/FeatureLayer",
      "esri/layers/TileLayer",
      "esri/widgets/Expand",
      "esri/widgets/Home",
      "esri/widgets/LayerList",
      "esri/widgets/BasemapGallery",
      "esri/widgets/Legend",
      "esri/widgets/Compass",
      "esri/widgets/Print",
      "esri/core/urlUtils",
    ],options)
  .then(
    ([
      Map,
      Basemap,
      MapView,
      FeatureLayer,
      TileLayer,
      Expand,
      Home,
      LayerList,
      BasemapGallery,
      Legend,
      Compass,
      Print,
      urlUtils
    ]) => {

    urlUtils.addProxyRule({
      urlPrefix: "http://202.114.148.160/arcgis_js_api4.7",
      proxyUrl: "http://202.114.148.160/DotNet/proxy.ashx"
    });

    var timeChart = {
      title: "详细信息",
      id: "details",
      image: require('@/assets//401_images/401.gif')
    };

    //
    var jcLayerTemplate = {
      title: `监测点编号：{Number}`,
      content: [{
        type: "media",
        mediaInfos: [{
          title: "<b>监测点图片</b>",
          type: "image",
          value: {
            // sourceURL: '../src/assets/jcImg/{Id}'+
            sourceURL: require(`@/assets/jcImg/1001.jpg`)
          }
        }]
        },{
        type: "fields",
        fieldInfos: [{
            fieldName: "person"
        }, {
            fieldName: "lon",
        }, {
            fieldName: "lat"
        }]
      }],
      actions: [timeChart]
    }; 

    var dkLayerTemplate = {
      title: `地块编号：{DK_ID}`,
      content: [{
        type: "media",
        mediaInfos: [{
          title: "<b>地块图片</b>",
          type: "image",
          value: {
            // sourceURL: '../src/assets/jcImg/{Id}'+
            sourceURL: require(`@/assets/dkImg/水稻实验田.jpg`)
            // sourceURL:`img/dkImg/水稻实验田.jpg`
          }
        }]
        },{
        type: "fields",
        fieldInfos: [{
            fieldName: "DK_name"
        }, {
            fieldName: "DK_area",
        }, {
            fieldName: "soil_grade"
        }]
      }]
    }; 

    var dkLayerRenderer = {
      type: "simple",
      symbol: {
          type: "simple-fill",  // autocasts as new SimpleFillSymbol()
          color: "green",
          outline: {  // autocasts as new SimpleLineSymbol()
              color: [150, 180, 0, 1],
              width: "1px"
        }
      }
    };

    //地图底图
    const vectorBaselayer = new TileLayer({
      url:"https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer"
    })

    var vectorBasemap = new Basemap({
        baseLayers: [vectorBaselayer],
        title: "矢量图",
        thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/fb84ad313bd3432983488ed1ba1d5bf3/info/thumbnail/ago_downloaded.png?f=json"
    });

    var rasterBaselayer = new TileLayer({
        url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
    })

    var rasterBasemap = new Basemap({
        baseLayers: [rasterBaselayer],
        title: "影像图",
        thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/25cefd52161e44b8a5eec87768f79079/info/thumbnail/thumbnail.jpeg?f=json"
    });

    const grayBaselayer = new TileLayer({
        url: "https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer",
    })


    const grayBasemap = new Basemap({
        baseLayers: [grayBaselayer],
        title: "灰色图",
        thumbnailUrl: "https://www.arcgis.com/sharing/rest/content/items/74e992f4fce3450aaf57a9a0df0007c3/info/thumbnail/cn_canvas.jpg?f=json"
    })

    var basemaps = [vectorBasemap, rasterBasemap, grayBasemap];

    self.jcLayer = new FeatureLayer({
      url:'http://202.114.148.160:8000/arcgis/rest/services/BJ/beijing9_27/MapServer/0',
      title:"土壤监测点",
      outFields:["*"],
      popupTemplate:jcLayerTemplate,
    });

    var qxLayer = new FeatureLayer({
      url:'http://202.114.148.160:8000/arcgis/rest/services/BJ/beijing9_27/MapServer/1',
      title:"气象监测点"
    });

    var dkLayer = new FeatureLayer({
      url:'http://202.114.148.160:8000/arcgis/rest/services/BJ/beijing9_27/MapServer/2',
      title:"地块",
      renderer:dkLayerRenderer,
      popupTemplate:dkLayerTemplate   
    });

    var ncLayer = new FeatureLayer({
      url:'http://202.114.148.160:8000/arcgis/rest/services/BJ/beijing9_27/MapServer/3',
      title:"农场"  
    });

    const map = new Map({
      basemap: 'satellite',
      layers:[ncLayer,dkLayer,self.jcLayer,qxLayer,]
    });

    const view = new MapView({
      map: map,
      container: 'map',
      zoom:18,
      center: [116.4460493354, 40.1767798551],
    });

    
    const layerList = new LayerList({
      view: view,
      listItemCreatedFunction:defineActions
    });

    function defineActions(event) {
      let item = event.item;    
      
      switch(item.title){
        case "土壤监测点":
          item.actionsSections = [
            [{
              title: "缩放到图层",
              className: "esri-icon-zoom-out-fixed",
              id: "full-extent"
            }, {
              title: "图层信息",
              className: "esri-icon-description",
              id: "information"
            }],
            [{
              title: "提高透明度",
              className: "esri-icon-up",
              id: "increase-opacity"
            }, {
              title: "降低透明度",
              className: "esri-icon-down",
              id: "decrease-opacity"
            }],
            [{
              title: "属性列表",
              className: "esri-icon-table",
              id: "fieldTableJC"
            },{
              title: "分析图表",
              className: "esri-icon-table",
              id: "pivotTableJC"
            }],
            [{
              title: "选择过滤",
              className: "esri-icon-filter",
              id: "filter"
            },{             
              title: "恢复默认选择",
              className: "esri-icon-rotate",
              id: "reset"
            }]        
          ];
          break;
        case "地块":
          item.actionsSections = [
            [{
              title: "缩放到图层",
              className: "esri-icon-zoom-out-fixed",
              id: "full-extent"
            }, {
              title: "图层信息",
              className: "esri-icon-description",
              id: "information"
            }],
            [{
              title: "提高透明度",
              className: "esri-icon-up",
              id: "increase-opacity"
            }, {
              title: "降低透明度",
              className: "esri-icon-down",
              id: "decrease-opacity"
            }],
            [{
              title: "属性列表",
              className: "esri-icon-table",
              id: "fieldTableDK"
            },{
              title: "分析图表",
              className: "esri-icon-table",
              id: "pivotTableDK"
            }],
            [{
              title: "默认图",
              className: "esri-icon-maps",
              id: "map"
            },{
              title: "土壤含水量专题图",
              className: "esri-icon-maps",
              id: "waterMap"
            },{
              title: "墒情监测专题图",
              className: "esri-icon-maps",
              id: "shangqingMap"
            }]
          ];
          break;
        case "农场":
          item.actionsSections = [
            [{
              title: "缩放到图层",
              className: "esri-icon-zoom-out-fixed",
              id: "full-extent"
            }, {
              title: "图层信息",
              className: "esri-icon-description",
              id: "information"
            }],
            [{
              title: "提高透明度",
              className: "esri-icon-up",
              id: "increase-opacity"
            }, {
              title: "降低透明度",
              className: "esri-icon-down",
              id: "decrease-opacity"
            }]
          ];
          break;
        case "气象监测点":
          item.actionsSections = [
            [{
              title: "缩放到图层",
              className: "esri-icon-zoom-out-fixed",
              id: "full-extent"
            }, {
              title: "图层信息",
              className: "esri-icon-description",
              id: "information"
            }],
            [{
              title: "提高透明度",
              className: "esri-icon-up",
              id: "increase-opacity"
            }, {
              title: "降低透明度",
              className: "esri-icon-down",
              id: "decrease-opacity"
            }]
          ];
          break;   
      }
    };
    
    const exp = new Expand({
      view: view,
      content: layerList
    });

    var defaultSym = {
        type: "simple-fill",
        outline: { 
            color: "lightgray",
            width: 0.5
        }
    };

    view.when(function(){
      layerList.on("trigger-action", function(event) {
        var layer = event.item.layer; //被选图层
        var id = event.action.id;     //被选操作

        if (id === "full-extent") {
          view.goTo(layer.fullExtent);
        } else if (id === "information") {
          window.open(layer.url);
        } else if (id === "increase-opacity") {
          if (layer.opacity > 0) {
            layer.opacity -= 0.25;
          }
        } else if (id === "decrease-opacity") {
          if (layer.opacity < 1) {
            layer.opacity += 0.25;
          }
        }else if (id === "filter"){
          self.getData();
        }else if (id === "reset"){
          layer.definitionExpression = '';
        }else if (id === "pivotTableJC"){
          self.pivottableParam.visible = !self.pivottableParam.visible;
          self.pivottableParam.id = "pivotTableJC";
        }else if (id === "pivotTableDK"){
          self.pivottableParam.visible = !self.pivottableParam.visible;
          self.pivottableParam.id = "pivotTableDK";          
        }else if (id === "map"){
          layer.renderer= dkLayerRenderer
        }else if (id === "waterMap"){
          layer.renderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: defaultSym,
            label: "土壤含水量",
            visualVariables: [{
              type: "color",
              field: "Water_cont",
              //normalizationField: "yield",
              stops: [
                {
                  value: 11,
                  color: "yellow",
                  label: "<11"
                },
                {
                  value: 30,
                  color: "red",
                  label: ">30"
                }
              ]
            }]
          };

          // legend.layerInfos = [
          //   {
          //       layer: layer,
          //       title: "土壤含水量"
          //   }]
          // view.ui.add(legend, "bottom-right");
        }else if (id === "shangqingMap"){
          layer.renderer =  {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: defaultSym,
            label: "墒情",
            visualVariables: [{
              type: "color",
              field: "shangqing",
              stops: [
                {
                  value: 30,
                  color: "yellow",
                  label: "<30"
                },
                {
                  value: 70,
                  color: "red",
                  label: ">70"
                }
              ]
            }]
          };

          // legend.layerInfos = [{
          //     layer: layer,
          //     title: "墒情"
          // }]
          // view.ui.add(legend, "bottom-right");
        }else if(id === "fieldTableDK"){
          self.fieldTableParam.visible = !self.fieldTableParam.visible;
          self.fieldTableParam.id = "fieldTableDK";
        }else if(id === "fieldTableJC"){
          self.fieldTableParam.visible = !self.fieldTableParam.visible;
          self.fieldTableParam.id = "fieldTableJC";
        }            
      });
    });

    function showChart(){
      self.chartParam.visible = !self.chartParam.visible;
      self.chartParam.field = view.popup.selectedFeature.attributes.Number;
    }

    view.popup.on("trigger-action", function(event) {
      if (event.action.id === "details") {
        showChart()
      }
    });

    const basemapGallery = new BasemapGallery({
      view: view,
      container: document.createElement("div"),
      source: basemaps
    });

    const bgExpand = new Expand({
      view: view,
      content: basemapGallery.container,
      expandIconClass: "esri-icon-basemap"
    });

    const homeWidget = new Home({
      view: view
    });

    const compass = new Compass({
      view: view
    })

    const print = new Print({
      view: view,
      printServiceUrl:"http://202.114.148.160:8000/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
      container: document.createElement("div")  
    })

    const printExpand = new Expand({
      view: view,
      content: print.container,
      expandIconClass: "esri-icon-printer"
    })

    const legend = new Legend({
      view: view,
      // label:"test",
      layerInfos: [{
        layer: dkLayer,
        title: `图例：${dkLayer.title}图层`
      }]
    })

    view.ui.add([
      {
        component: bgExpand,
        position: "top-right",
        index:0
      },{
        component: exp,
        position: "top-right",
        index: 1
      },
      {
        component: printExpand,
        position: "top-right",
        index: 2
      },
      {
        component: homeWidget,
        position: "top-left",
        index: 1
      },{
        component: compass,
        position: "top-left",
        index: 2
      },{
        component: legend,
        position: "bottom-right",
        index: 0
      }
      // {
      //   component: table,
      //   position: "bottom-left",
      //   index: 0
      // }
    ]);
  })
  .catch(err => {
    console.error(err);
  });
}