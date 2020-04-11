<template>
  <div id="WorldRegionMap">
      <div id='app'></div>
  </div>
</template>


<script>
import 'leaflet/dist/leaflet.css';
import Leaf from 'leaflet';

const southWest = Leaf.latLng(-89.98155760646617, -60);
const northEast = Leaf.latLng(89.99346179538875, 300);
const bounds = Leaf.latLngBounds(southWest, northEast);

export default {
  name: 'WorldRegionMap',
  data() {
    return {
    };
  },
  mounted() {
    Leaf.map('app', {
      center: Leaf.latLng(35.6825, 139.752778),
      zoom: 1,
      minZoom: 1,
      maxZoom: 5,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    }).addLayer(
      Leaf.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";
#WorldRegionMap{
    width:100%;
    height:280px;
    margin-top: 24px;
    border-radius: 12px;
}
#app {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  z-index: $z-index-button;
}

</style>
