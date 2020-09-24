<template>
  <div class="app-container">
    <Lmap />
    <MapType />
    <MapLayerControl />
  </div>
</template>

<script>
import Lmap from '@/components/Lmap'
import MapType from '@/components/MapType'
import MapLayerControl from '@/components/MapLayerControl'
export default {
  name: 'OneMap',
  components: { Lmap, MapType, MapLayerControl }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  height: 100%;
}
</style>
