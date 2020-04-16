<template>
  <div id="CheckMap">
      <div id='map'></div>
  </div>
</template>


<script>
import 'leaflet/dist/leaflet.css';
import Leaf from 'leaflet';

const southWest = Leaf.latLng(-89.98155760646617, -180);
const northEast = Leaf.latLng(89.99346179538875, 180);
const bounds = Leaf.latLngBounds(southWest, northEast);

export default {
  name: 'CheckMap',
  data() {
    return {
    };
  },
  mounted() {
    const map = Leaf.map('map', {
      center: Leaf.latLng(35.6825, 139.752778),
      zoom: 15,
      minZoom: 1,
      maxZoom: 15,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    }).addLayer(
      Leaf.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
    );
    map.on(
      'click',
      p => map.addLayer(
        Leaf.marker(
          p.latlng,
          {
            icon: Leaf.divIcon({ className: 'red marker', iconSize: [60, 60] }),
          },
        ),
      ),
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";
#CheckMap{
    width:100%;
    height:60vw;
    max-height:70vh;
    margin-top: 24px;
    border-radius: 12px;
}
#map {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  z-index: $z-index-button;
}

</style>
