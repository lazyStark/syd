<template>
  <div class="map-group">
    <span class="marker_title">监测点</span>
    <ul class="radio-group">
      <li v-for="(item, index) in layerList" :key="index" :data-index="index" class="radio-item" :class="{active: index === activeIndex}" @click="changeLayer(item,index)">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LayerControl",
  data() {
    return {
      activeIndex: 0,
      layerList: [
        {
          label: 'AQI',
          type: 'aqi'
        },
        {
          label: 'PM2.5',
          type: 'pm25'
        },
        {
          label: 'PM10',
          type: 'pm10'
        },
        {
          label: 'O3',
          type: 'o3'
        },
        {
          label: 'NO2',
          type: 'no2'
        },
        {
          label: 'SO2',
          type: 'so2'
        },
        {
          label: 'CO',
          type: 'co'
        }
      ]
    }
  },
  methods: {
    changeLayer(item, index) {
      this.activeIndex = index;
      this.$bus.emit('layerGroupChange', item)
    }
  }
};
</script>

<style lang="scss" scoped>
.map-group {
  position: absolute;
  right: 20px;
  top: 25%;
  z-index: 999;
  width: 57px;
}
.marker_title {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #094;
  background: hsla(0, 0%, 100%, 0.8);
  margin-top: 10px;
  display: block;
}
.radio-group {
  background: rgba(51, 51, 51, 0.55);
  cursor: pointer;
}
.radio-item {
  font-size: 12px;
  height: 28px;
  line-height: 26px;
  text-align: center;
  color: #fff;
}
.active {
  background: #094;
}
</style>
