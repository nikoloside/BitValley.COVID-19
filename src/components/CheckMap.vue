<template>
  <div id="CheckMap">
      <div id='map'></div>
  </div>
</template>


<script>
import 'leaflet/dist/leaflet.css';
import Leaf from 'leaflet';

const southWest = Leaf.latLng(20.6825, 119.752778);
const northEast = Leaf.latLng(50.6825, 159.752778);
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
      zoom: 13,
      minZoom: 5,
      maxZoom: 13,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    }).addLayer(
      Leaf.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png'),
    );
    map.on(
      'click',
      p => map.addLayer(
        Leaf.marker(
          p.latlng,
          {
            icon: Leaf.divIcon({ className: 'check-map-marker', iconSize: [12, 12] }),
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
    max-height:75vh;
    margin-top: 24px;
    border-radius: 12px;

    @media (max-width: $breakpoint-pc) {
      height: 90vh;
    }

    @media (max-width: $breakpoint-sp) {
      height: 100vh;
    }
}
#map {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  z-index: $z-index-button;
}

</style>
