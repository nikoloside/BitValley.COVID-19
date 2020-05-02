/* eslint-disable global-require */
<template>
  <div id="WorldRegionMap">
      <div id='appmap'></div>
  </div>
</template>


<script>
import 'leaflet/dist/leaflet.css';
import Leaf from 'leaflet';
import axios from 'axios';
import worldJson from '../assets/map/world.geo.json';
import i18n from '../commons/i18n';

// 世界地図の境界線をかす

const southWest = Leaf.latLng(-89.98155760646617, -180);
const northEast = Leaf.latLng(89.99346179538875, 180);
const bounds = Leaf.latLngBounds(southWest, northEast);
let geojson;
let map;
let marker;
let popup;
let nowfeature;
let globalDatas;
let lastfeature;

export default {
  name: 'WorldRegionMap',
  data() {
    return {
      worldData: worldJson,
      regionDatas: [
        {
          region: '日本',
          confirm: 0,
          recover: 0,
          dath: 0,
        },
      ],
    };
  },
  mounted() {
    // 基础地图优先初始化
    this.mapCreate();
    // 数据读取
    const dataList = [];
    axios.get('https://api.survival-jp.com/api/patient/global/country')
      .then((response) => {
        response.data.data.forEach((region) => {
          const data = {
            region: region.Location,
            confirm: region.Confirmed,
            recover: region.Recovered,
            death: region.Deaths,
          };
          dataList.push(data);
        });
        // 数据读取完了之后绘图
        this.mapDraw();
      }).catch(() => {
        // 暫定的な対応
        const data = {
          region: '-',
          confirm: '-',
          recover: '-',
          death: '-',
        };
        dataList.push(data);
      });
    this.regionDatas = dataList;
    globalDatas = dataList;
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
      const valObj = [];
      let count = 0;
      this.regionDatas.forEach((regionData) => {
        if (regionData.region === feature.properties.name) valObj.push(regionData.confirm);
      });
      if (valObj.length > 0) {
        count = valObj[0];
      }
      return {
        fillColor: this.getColor(count),
        weight: 0,
        opacity: 0,
        color: 'white',
        dashArray: '',
        fillOpacity: 1.0,
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
        let popUpOffset = [0, 0];
        if (event.latlng.lat > 50) {
          popUpOffset = [0, 130];
        }

        const popupConf = {
          offset: popUpOffset,
          autoPan: false,
          minHeight: '68',
          closeButton: false,
          className: 'custom',
        };
        popup = Leaf.popup(popupConf);
        popup.setLatLng(event.latlng);

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
            fillOpacity: 1.0,
          });
          if (!Leaf.Browser.ie && !Leaf.Browser.opera && !Leaf.Browser.edge) {
            layer.bringToFront();
            marker.setLatLng(event.latlng);

            let popUpOffset = [0, 0];
            if (event.latlng.lat > 50) {
              popUpOffset = [0, 130];
            }

            const popupConf = {
              offset: popUpOffset,
              autoPan: false,
              minHeight: '68',
              closeButton: false,
              className: 'custom',
            };
            popup = Leaf.popup(popupConf);
            popup.setLatLng(event.latlng);

            if (!popup.isOpen()) {
              let country = '未知言語';
              // eslint-disable-next-line prefer-template
              country = i18n.t('messages.' + feature.properties.name.replace('\'', '').replace('.', ''));

              let countryObj = {
                region: '-',
                confirm: '-',
                recover: '-',
                death: '-',
              };
              const valObj = [];
              globalDatas.forEach((regionData) => {
                if (regionData.region === feature.properties.name) valObj.push(regionData);
              });
              if (valObj.length > 0) {
                countryObj = valObj[0];
              }

              let div = '<div class="world-content">';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-country">' + country + '</div>';
              // eslint-disable-next-line prefer-template
              div += '<div class="world-data-wrap">';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-data">' + i18n.t('messages.datajapanconfirm') + ': ' + countryObj.confirm.toLocaleString() + '</div>';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-data">' + i18n.t('messages.datajapandeath') + ': ' + countryObj.death.toLocaleString() + '</div>';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-data">' + i18n.t('messages.datajapanrecover') + ': ' + countryObj.recover.toLocaleString() + '</div>';
              // eslint-disable-next-line prefer-template
              div += '</div>';
              // eslint-disable-next-line prefer-template
              div += '</div>';

              // eslint-disable-next-line prefer-template
              popup.setContent(div);
              map.openPopup(popup);
            }
          }
        },
        mouseout: this.resetHighlight,
        click: function click(event) {
          if (lastfeature) {
            geojson.resetStyle(lastfeature);
          }
          lastfeature = event.target;
          layer.setStyle({
            weight: 0,
            opacity: 0,
            dashArray: '',
            fillColor: '#0452E6',
            fillOpacity: 1.0,
          });
          if (!Leaf.Browser.ie && !Leaf.Browser.opera && !Leaf.Browser.edge) {
            layer.bringToFront();
            marker.setLatLng(event.latlng);

            let popUpOffset = [0, 0];
            if (event.latlng.lat > 50) {
              popUpOffset = [0, 130];
            }

            const popupConf = {
              offset: popUpOffset,
              autoPan: false,
              minHeight: '68',
              closeButton: false,
              className: 'custom',
            };
            popup = Leaf.popup(popupConf);
            popup.setLatLng(event.latlng);


            if (!popup.isOpen()) {
              let country = '未知言語';
              // eslint-disable-next-line prefer-template
              country = i18n.t('messages.' + feature.properties.name.replace('\'', '').replace('.', ''));

              let countryObj = {
                region: '-',
                confirm: '-',
                recover: '-',
                death: '-',
              };
              const valObj = [];
              globalDatas.forEach((regionData) => {
                if (regionData.region === feature.properties.name) valObj.push(regionData);
              });
              if (valObj.length > 0) {
                countryObj = valObj[0];
              }

              let div = '<div class="world-content">';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-country">' + country + '</div>';
              // eslint-disable-next-line prefer-template
              div += '<div class="world-data-wrap">';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-data">' + i18n.t('messages.datajapanconfirm') + ': ' + countryObj.confirm.toLocaleString() + '</div>';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-data">' + i18n.t('messages.datajapandeath') + ': ' + countryObj.death.toLocaleString() + '</div>';
              // eslint-disable-next-line prefer-template
              div = div + '<div class="world-data">' + i18n.t('messages.datajapanrecover') + ': ' + countryObj.recover.toLocaleString() + '</div>';
              // eslint-disable-next-line prefer-template
              div += '</div>';
              // eslint-disable-next-line prefer-template
              div += '</div>';

              // eslint-disable-next-line prefer-template
              popup.setContent(div);
              map.openPopup(popup);
            }
          }
        },
      });
    },
    // マップオブジェクト生成
    mapCreate() {
      map = Leaf.map('appmap', {
        center: Leaf.latLng(45.6825, 139.752778),
        zoom: 1,
        minZoom: 1,
        maxZoom: 4,
        maxBounds: bounds,
        maxBoundsViscosity: 2.0,
      });
    },
    mapDraw() {
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
        autoPan: false,
        minHeight: '68',
        closeButton: false,
        className: 'custom',
      };
      popup = Leaf.popup(customOptions).setContent(customPopup);
      // markerとpopup

      const iconc = Leaf.divIcon({
        className: 'invisible-map-marker',
        html: "<div'></div>",
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      marker = Leaf.marker([35.6825, 139.752778], { icon: iconc }).addTo(map)
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
#appmap {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  z-index: $z-index-button;
  background-color:#E8ECF2;
}
</style>
