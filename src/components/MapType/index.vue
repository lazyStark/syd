<template>
  <div id="mapType-wrapper" :class="{'expand': isExpand}" @mouseleave="hiddenTypeChange" @mouseenter="showMapTypeChange">
    <ul id="map-type" @click="changeMapType">
      <li class="map-type-card earth" data-type="night">
        <span>深夜</span>
      </li>
      <li class="map-type-card normal" data-type="satellite">
        <span>卫星</span>
      </li>
      <li class="map-type-card panorama" data-type="normal">
        <span style="background-color: #3385FF;">地图</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce } from '@/utils'
export default {
  name: 'MapType',
  data() {
    return {
      isExpand: false
    }
  },
  methods: {
    showMap() {
      this.isExpand = true;
    },
    hiddenMap() {
      this.isExpand = false
    },
    changeMapType(e) {
      if (e.target.nodeName.toLowerCase() === 'li') {
        this.$bus.emit('mapChange', e.target.dataset.type)
      }
    },
    hiddenTypeChange: debounce(function() { this.hiddenMap() }, 500),
    showMapTypeChange: debounce(function() { this.showMap() }, 500)
  }
}
</script>

<style lang="scss" scoped>
#mapType-wrapper {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 1111;
}
#map-type {
  height: 80px;
  cursor: pointer;
  transition-property: width,background-color;
  transition-duration: .4s;
  width: 110px;
  background-color: rgba(255,255,255,0);
}
.map-type-card {
  height: 60px;
  width: 86px;
  position: absolute;
  border-radius: 2px;
  top: 10px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border: 1px solid rgba(153,153,153,.42);
  background: url(../../assets/img/maptype.png) no-repeat 0 0;
  background-size: 86px 240px;
  transition-property: right,background-image;
  transition-duration: .4s;
}
.map-type-card span {
  position: absolute;
  bottom: 0px;
  right: 0;
  display: inline-block;
  padding: 3px 3px 2px 4px;
  font-size: 12px;
  height: 21px;
  line-height: 21px;
  color: #FFF;
  border-top-left-radius: 2px;
  &:hover {
    background-color: #3385FF;
  }
}
.normal {
  z-index: 111;
  background-image: url(../../assets/img/map.png);
  background-position: 0 0px;
  right: 20px;
}
.earth {
  right: 15px;
  z-index: 222;
  background-position: 0 -181px;
}
.expand #map-type {
  width: 289px;
  background: rgb(255, 255, 255, .8);
}
.expand #map-type .normal {
  right: 202px;
}
.expand #map-type .earth {
  right: 106px;
}
.expand #map-type .map-type-card {
  background-image: url(../../assets/img/map.png);
}
#map-type .panorama {
  background-image: url(../../assets/img/map.png);
  right: 10px;
  background-position: 0 -61px;
  z-index: 333;
  border-left: 1px solid rgba(153,153,153,.6);
}
</style>
