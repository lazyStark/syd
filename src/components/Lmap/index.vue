<template>
  <div id="lmap" style="height: 100%; width: 100%;" />
</template>

<script>
import L from 'leaflet';
// eslint-disable-next-line no-unused-vars
import chinaProvider from 'leaflet.chinatmsproviders'
// eslint-disable-next-line no-unused-vars
import MiniMap from 'leaflet-minimap';
import "leaflet-minimap/dist/Control.MiniMap.min.css";
import 'leaflet/dist/leaflet.css';
import './Control.FullScreen.css'
import './Control.FullScreen.js'
import { initChart } from './echart'
import { getPoint } from '@/api/map'
import { getPollColor } from '@/utils/map'
var map = null
export default {
  name: 'Lmap',
  data() {
    return {
      titleLayer: null,
      miniMap: null,
      provinceLayer: null,
      zoom: 5,
      map: null,
      url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
      layerMarkGroup: null,
      pullutionType: 'aqi'
    }
  },
  created() {
    this.$bus.on('mapChange', this.mapThemeFun)
    this.$bus.on('layerGroupChange', this.layerGroupChange)
  },
  mounted() {
    this._initMap()
  },
  beforeDestroy() {
    this.$bus.off('mapChange', this.mapThemeFun)
    this.$bus.off('layerGroupChange', this.layerGroupChange)
  },
  methods: {
    _initMap() {
      this.titleLayer = L.tileLayer(this.url, { id: 'lmap', minZoom: 5, maxZoom: 18 })
      map = new L.Map("lmap", {
        renderer: L.canvas(),
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: 'topleft'
        },
        center: [35, 98],
        minZoom: 5,
        maxZoom: 16,
        zoom: this.zoom, // 初始化地图的缩放.
        attributionControl: false,
        layers: [this.titleLayer]
      });
      // 比例尺
      L.control.scale().addTo(map);

      // 鹰眼图层
      const eagleEyeLayer = L.tileLayer(this.url, { minZoom: 4, maxZoom: 16 });
      this.miniMap = new L.Control.MiniMap(eagleEyeLayer, { toggleDisplay: true, position: 'bottomleft', width: 120, height: 120, minimized: true }).addTo(map);

      // 保存缩放倍数
      map.on("zoomend", this.zoomend);
      // 初始化点位
      getPoint().then(res => {
        this.geoJson = res.data
        this._initPointLayer(this.geoJson, this.pullutionType)
      })
    },
    /**
     * @function mapThemeFun
     * @param value (地图，地形，卫星，深夜)
     */
    mapThemeFun(value) {
      map.removeLayer(this.titleLayer);
      this.titleLayer = null;
      // 街道
      if (value === "normal") {
        this.url = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}';
        // 卫星
      } else if (value === "satellite") {
        this.url = 'http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
      } else {
        // 深夜
        this.url = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
      }
      this.titleLayer = L.tileLayer(this.url, { minZoom: 4, maxZoom: 16 }).addTo(map);
      const eagleEyeLayer = L.tileLayer(this.url, { minZoom: 4, maxZoom: 16 });
      this.miniMap.changeLayer(eagleEyeLayer);
    },
    zoomend(val) {
      this.zoom = val.target._animateToZoom;
      this._initPointLayer(this.geoJson, this.pullutionType);
    },
    initChart,
    popupEvent(layer) {
      let provincePopup = document.getElementById('popup-box');
      if (!provincePopup) {
        const mapDiv = document.getElementById("lmap");
        const divPopup = document.createElement("div");
        divPopup.setAttribute("id", "popup-box");
        divPopup.style.width = "300px";
        divPopup.style.height = "180px";
        mapDiv.appendChild(divPopup);
        provincePopup = divPopup
      }
      provincePopup.innerHTML = `<div id="leaflet-echart"></div>`;
      this.initChart('详情', 'leaflet-echart');
      return provincePopup;
    },
    layerGroupChange(e) {
      this.pullutionType = e.type;
      this._initPointLayer(this.geoJson, this.pullutionType);
    },
    _initPointLayer(geoJson, pollutionType) {
      if (this.provinceLayer != null && map !== null) {
        map.removeLayer(this.provinceLayer);
      }
      this.provinceLayer = L.geoJSON(geoJson, {
        pointToLayer: (feature, latlng) => {
          let color;
          let icon;
          if (feature.properties[pollutionType] === -999 || feature.properties[pollutionType] === 0) {
            color = "#a1a3a6";
            feature.properties[pollutionType] = "-";
          }
          color = getPollColor(pollutionType, feature.properties[pollutionType], "hour").color;
          if (this.zoom < 8) {
            icon = L.divIcon({
              html: `<div class='point' style='background:${color}'></div>`,
              iconAnchor: [7, 7],
              iconSize: [15, 15]
            });
          } else {
            icon = L.divIcon({
              html: `<div class='square'><span style='background:${color};border-color:${color}'>${feature.properties[pollutionType]}</span><span>${feature.properties.cityname}</span></div>`,
              iconAnchor: [7, 7]
              // iconSize: [15, 15]
            });
          }

          return L.marker(latlng, { icon: icon });
        },
        onEachFeature: function(feature, layer) {}
      })
        .addTo(map)
        .bindPopup(this.popupEvent, {
          maxWidth: "600px",
          maxHeight: "700px",
          keepInView: true
        });
    }
  }
}
</script>

<style>
.leaflet-control-scale-line:not(:first-child) {
  display: none;
}
#leaflet-echart{
  width: 100%;
  height: 100%;
  background: skyblue;
}
/* 点的样式 */
.point {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.point-info {
  background: rgba(255, 255, 255, 0.6) none repeat scroll 0 0;
  color: #fff;
  border-radius: 9px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  display: inline-block;
  font-size: 0;
  font-family: "Microsoft YaHei";
  position: relative;
  height: 16px;
  line-height: 16px;
  vertical-align: middle;
}

.leaflet-div-icon {
  background: rgba(0, 0, 0, 0);
  border: rgba(0, 0, 0, 0);
}
.square {
  width: 70px;
  text-align: center;
  margin: 0 auto;
}
.square span:nth-child(1) {
  padding: 1px 15px;
  display: inline-block;
  border-radius: 3px;
  color: #000;
  margin-bottom: 8px;
}
.square span:nth-child(1):after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px;
  border-top-color: inherit;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  position: fixed;
  margin-top: 18px;
  margin-left: -15px;
}
.square span:nth-child(2) {
  display: inline-block;
  background-color: rgba(250, 250, 250, 0.6);
  color: #000;
  padding: 2px 5px;
  border-radius: 3px;
}
</style>
