export const createMap = function (esriLoader, options) {
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
      "esri/core/urlUtils",
    ], options)
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
      urlUtils
    ]) => {

    urlUtils.addProxyRule({
      urlPrefix: "http://202.114.148.160/arcgis_js_api4.7",
      proxyUrl: "http://202.114.148.160/DotNet/proxy.ashx"
    });

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

    var jcLayer = new FeatureLayer({
      url:'http://202.114.148.160:8000/arcgis/rest/services/BJ/beijing9_27/MapServer/0',
      title:"土壤监测点"
    });

    var qxLayer = new FeatureLayer({
      url:'http://202.114.148.160:8000/arcgis/rest/services/BJ/beijing9_27/MapServer/1',
      title:"气象监测点"
    });

    var dkLayer = new FeatureLayer({
      url:'http://202.114.148.160:8000/arcgis/rest/services/BJ/beijing9_27/MapServer/2',
      title:"地块"
    });

    var ncLayer = new FeatureLayer({
      url:'http://202.114.148.160:8000/arcgis/rest/services/BJ/beijing9_27/MapServer/3',
      title:"农场"  
    });

    let map = new Map({
      basemap: 'satellite',
      layers:[ncLayer,dkLayer,jcLayer,qxLayer,]
    });

    var view = new MapView({
      map: map,
      container: 'map',
      zoom:18,
      center: [116.4460493354, 40.1767798551],
    });

    
    var layerList = new LayerList({
      view: view,
      listItemCreatedFunction:function(event){
        var item = event.item;
        item.actionsSections = [
          [{
            title: "Go to full extent",
            className: "esri-icon-zoom-out-fixed",
            id: "full-extent"
          }, {
            title: "Layer information",
            className: "esri-icon-description",
            id: "information"
          }],
          [{
            title: "Increase opacity",
            className: "esri-icon-up",
            id: "increase-opacity"
          }, {
            title: "Decrease opacity",
            className: "esri-icon-down",
            id: "decrease-opacity"
          }]
        ];
      }
    });
    
    var exp = new Expand({
      view: view,
      content: layerList
    })

    view.when(function(){
      layerList.on("trigger-action", function(event) {
        var layer = event.item.layer; //被选图层
        var id = event.action.id;     //被选操作

        if (id === "full-extent") {
          view.goTo(layer.fullExtent);
        } else if (id === "information") {
          window.open(layer.url);
        } else if (id === "increase-opacity") {
          if (layer.opacity < 1) {
            layer.opacity += 0.25;
          }
        } else if (id === "decrease-opacity") {
          if (layer.opacity > 0) {
            layer.opacity -= 0.25;
          }
        }
      });
    })
    view.ui.add(exp, "top-right");

    var basemapGallery = new BasemapGallery({
      view: view,
      container: document.createElement("div"),
      source: basemaps
    });

    var bgExpand = new Expand({
      view: view,
      content: basemapGallery.container,
      expandIconClass: "esri-icon-basemap"
    });

    var homeWidget = new Home({
      view: view
    });

    view.ui.add(bgExpand, "top-right");
    view.ui.add(homeWidget, "top-left");
    })
  .catch(err => {
    console.error(err);
  });
}