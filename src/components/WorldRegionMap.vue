/* eslint-disable global-require */
<template>
  <div id="WorldRegionMap">
      <div id='app'></div>
  </div>
</template>


<script>
import Leaf from 'leaflet';
import worldJson from '../assets/map/custom.geo.json';
import countryJson from '../assets/language/country.json';

// 世界地図の境界線をかす
const southWest = Leaf.latLng(-89.98155760646617, -180);
const northEast = Leaf.latLng(89.99346179538875, 180);
const bounds = Leaf.latLngBounds(southWest, northEast);
let geojson;
let map;
let marker;
let popup;
let nowfeature;

export default {
  name: 'WorldRegionMap',
  data() {
    return {
      lang: this.$i18n.locale,
      worldData: worldJson,
      countryData: countryJson,
      confirmData:
        {
          China: 90000,
          Japan: 900,
        },
    };
  },
  mounted() {
    this.mapCreate();
  },
  methods: {
    // 指标调色板
    onAddColorPanel() {
      const labels = [];
      const div = Leaf.DomUtil.create('div', 'legend');
      const grades = [0, 99, 100, 1000, 5000, 10000, 100000];
      const words = ['0人', '1~99人', '100~999人', '1000~4999人', '5000~10000人', '1万人以上', '10万人以上'];
      for (let i = grades.length - 1; i >= 0; i -= 1) {
        // eslint-disable-next-line prefer-template
        labels.push('<i style="background:' + this.getColor(grades[i]) + '"></i> ' + words[i]);
      }
      div.innerHTML += labels.join('<br>');
      return div;
    },
    // 密度调色盘
    getColor(d) {
      if (d >= 100000) {
        return '#56141C';
      }
      if (d >= 10000) {
        return '#871212';
      }
      if (d >= 5000) {
        return '#A52121';
      }
      if (d >= 1000) {
        return '#D33939';
      }
      if (d >= 100) {
        return '#F7685B';
      }
      if (d > 0) {
        return '#FF9578';
      }
      return '#FFFFFF';
    },
    // FillColorの色を生成
    style(feature) {
      return {
        fillColor: this.getColor(this.confirmData[feature.properties.name]),
        weight: 0,
        opacity: 0,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7,
      };
    },
    // MoverOver的event的样式
    highlightFeature(e) {
      const layer = e.target;
      layer.setStyle({
        weight: 0,
        opacity: 0,
        dashArray: '',
        fillColor: '#0452E6',
        fillOpacity: 0.7,
      });
      if (!Leaf.Browser.ie && !Leaf.Browser.opera && !Leaf.Browser.edge) {
        layer.bringToFront();
        marker.setLatLng(e.latlng);
        if (!popup.isOpen()) {
          popup.setContent(nowfeature.properties.name);
          map.openPopup(popup);
        }
      }
    },
    resetHighlight(e) {
      geojson.resetStyle(e.target);
      // info.update();
      map.closePopup();
    },
    onEachFeature(feature, layer) {
      layer.on({
        mouseover: function over(event) {
          layer.setStyle({
            weight: 0,
            opacity: 0,
            dashArray: '',
            fillColor: '#0452E6',
            fillOpacity: 0.7,
          });
          if (!Leaf.Browser.ie && !Leaf.Browser.opera && !Leaf.Browser.edge) {
            layer.bringToFront();
            marker.setLatLng(event.latlng);
            if (!popup.isOpen()) {
              let country = '未知言語';
              switch (this.lang) {
                case 'ja':
                  country = countryJson[feature.properties.name].ja;
                  break;
                case 'cn':
                  country = countryJson[feature.properties.name].cn;
                  break;
                default:
                  country = countryJson[feature.properties.name].ja;
                  break;
              }

              let div = '<div class="world-content">';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-country">' + country + '</div>';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-data">感染者数:' + country + '</div>';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-data">死亡者数:' + country + '</div>';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-data">回復者数:' + country + '</div>';
              // eslint-disable-next-line prefer-template
              div += '</div>';

              // eslint-disable-next-line prefer-template
              popup.setContent(div);
              map.openPopup(popup);
            }
          }
        },
        mouseout: this.resetHighlight,
        // click: this.highlightFeature,
      });
    },
    // マップオブジェクト生成
    mapCreate() {
      map = Leaf.map('app', {
        center: Leaf.latLng(35.6825, 139.752778),
        zoom: 1,
        minZoom: 1,
        maxZoom: 4,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
      }).addLayer(
        Leaf.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
      );
      // 実際JSONを描く
      geojson = Leaf.geoJson(this.worldData, {
        style: this.style,
        onEachFeature: this.onEachFeature,
      }).addTo(map);
      // legend就是注释
      const legend = Leaf.control({ position: 'bottomleft' });
      legend.onAdd = this.onAddColorPanel;
      legend.addTo(map);
      // create popup contents
      const customPopup = '';
      const customOptions = {
        minWidth: '74',
        minHeight: '68',
        closeButton: false,
        className: 'custom',
      };
      popup = Leaf.popup(customOptions).setContent(customPopup);
      // markerとpopup
      marker = Leaf.marker(Leaf.latLng(35.6825, 139.752778)).addTo(map)
        .bindPopup(popup);
    },
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
  background-color:#E8ECF2;
}
</style>
