<template>
  <div class="app-container">
    <!-- <Lmap />
    <MapType /> -->
    <TimeLine />
  </div>
</template>

<script>
// import Lmap from '@/components/Lmap'
// import MapType from '@/components/MapType'
import TimeLine from '@/components/TimeLine'
export default {
  name: 'Dashboard',
  components: { TimeLine }
  // components: { Lmap, MapType }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  height: 100%;
}
</style>
