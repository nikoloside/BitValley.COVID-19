<template>
  <div id="CheckMap">
      <div id='map'></div>
  </div>
</template>


<script>
import 'leaflet/dist/leaflet.css';
import Leaf from 'leaflet';
import axios from 'axios';
import tokyoJson from '../assets/map/tokyo.geo.json';

const southWest = Leaf.latLng(20.6825, 119.752778);
const northEast = Leaf.latLng(55.6825, 159.752778);
const bounds = Leaf.latLngBounds(southWest, northEast);
const maxPoint = 350;
let loading = false;
let zoomOrigin = 12;

let map;
let lastMarker;
let popup;
let markers = [];
let patientDatas = [];

let geotokyo;
let tokyoMarker;
let tokyoPopup;
let lastfeature;
let regionDatas;
let tokyoRealSum = 0;
let tokyoMarkers = [];

// eslint-disable-next-line func-names
const solveTokyoLatlng = function () {
  const tokyoShowSum = tokyoMarkers.length;
  const tokyoShowArray = [];
  regionDatas.forEach((region) => {
    let sum = 0;
    if (region.sum > 0) {
      // eslint-disable-next-line no-mixed-operators
      sum = Math.max(1, Math.round(region.sum * tokyoShowSum / tokyoRealSum));
    }
    const data = { id: region.id, showCount: sum };
    tokyoShowArray.push(data);
  });
  let showIndex = 0;
  tokyoMarkers.forEach((showMarker) => {
    while (showIndex < tokyoShowArray.length &&
           tokyoShowArray[showIndex].showCount === 0) showIndex += 1;
    if (showIndex < tokyoShowArray.length ||
        tokyoShowArray[showIndex] > 0) {
      const valObj = [];
      tokyoJson.features.forEach((region) => {
        if (region.properties.id === tokyoShowArray[showIndex].id) {
          valObj.push(region.properties.center);
        }
      });
      if (valObj.length > 0) {
        const random = Math.random() * 360;
        const radius = Math.random() * 1;
        // eslint-disable-next-line no-mixed-operators
        const Latitude = valObj[0][0] + Math.sin(random) / 95 * radius;
        // eslint-disable-next-line no-mixed-operators
        const Longitude = valObj[0][1] + Math.cos(random) / 85 * radius;
        showMarker.setLatLng(Leaf.latLng(Longitude, Latitude));
        tokyoShowArray[showIndex].showCount -= 1;
      } else {
        showMarker.remove();
      }
    }
  });
};

// eslint-disable-next-line func-names
const drawTokyoPopup = function (tokyoObj) {
  // marker.bindPopup(popup);
  let div = '<div class="checkmap-content">';
  // eslint-disable-next-line prefer-template
  div = div + '<div class="checkmap-id" style="font-size: 18px;">' + tokyoObj.name + '</div>';
  // eslint-disable-next-line prefer-template
  div = div + '<div class="checkmap-main">感染人数：<div style="font-size: 18px;color: #FA5292;">' + tokyoObj.sum + '</div></div>';
  // eslint-disable-next-line prefer-template
  div = div + '<div class="checkmap-sub">' + tokyoObj.updatedAt + '</div>';
  // eslint-disable-next-line prefer-template
  div += '</div>';

  tokyoPopup.setContent(div);
  map.openPopup(tokyoPopup);
};

// eslint-disable-next-line func-names
const drawPopup = function (id, latlng) {
  // marker.bindPopup(popup);
  let div = '<div class="checkmap-content">';
  // eslint-disable-next-line prefer-template
  div = div + '<div class="checkmap-id">' + patientDatas[id].Id + '例目の患者さん 年齢  ' + patientDatas[id].Age + ' ' + patientDatas[id].Gender + '</div>';
  // eslint-disable-next-line prefer-template
  div = div + '<div class="checkmap-main">' + patientDatas[id].ConfirmDate.replace('2020/', '') + ' ' + patientDatas[id].ConsultationPrefecture + '発表/' + patientDatas[id].ResidentPrefecture + patientDatas[id].ResidentCity + '居住</div>';
  // eslint-disable-next-line prefer-template
  div = div + '<div class="checkmap-sub">' + patientDatas[id].Description.replace('\n', '<br>') + '</div>';
  // eslint-disable-next-line prefer-template
  div += '<div class="checkmap-connecttitle">濃厚接触者情報 </div>';
  // eslint-disable-next-line prefer-template
  div = div + '<div class="checkmap-connecttext">' + patientDatas[id].ActionHistory.replace('\n', '<br>') + '</div>';
  // eslint-disable-next-line prefer-template
  div += '<div class="checkmap-now">現在</div>';
  let discharge = '感染';
  let color = '#FA5292';
  if (patientDatas[id].IsDischarge > 0) {
    discharge = '退院済み';
    color = '#31D9A5';
  }
  // eslint-disable-next-line prefer-template
  div = div + '<div class="checkmap-status" style="color: ' + color + '"> ' + discharge + '</div>';
  // eslint-disable-next-line prefer-template
  div += '</div>';

  const customOptions = {
    minHeight: '260',
    maxHeight: '260',
    className: 'checkmappopup',
  };
  popup = Leaf.popup(customOptions)
    .setLatLng(
      latlng,
    ).setContent(div)
    .openOn(map);
};

// let popupTokyo;

export default {
  name: 'CheckMap',
  data() {
    return {
      localLatLng: Leaf.latLng(
        35.6825,
        139.752778,
      ),
      zoomLevel: 12,
      totalTokyo: 0,
    };
  },
  methods: {
    // map按钮的取消
    disableMap() {
      loading = true;
      map.dragging.disable();
      map.zoomControl.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable();
    },
    enableMap() {
      loading = false;
      map.dragging.enable();
      map.zoomControl.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      if (map.tap) map.tap.enable();
    },
    // setPosition可以被Location替代，也可以被Center替代
    setPosition(position) {
      map.flyTo(Leaf.latLng(position.coords.latitude, position.coords.longitude));
    },
    // getLocationをトリガーに, setPositionが走る, watchが作動する
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosition);
      }
    },
    createMap() {
      map = Leaf.map('map', {
        center: this.localLatLng,
        zoom: this.zoomLevel,
        minZoom: 5,
        maxZoom: 15,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
      }).addLayer(
        Leaf.tileLayer('https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'),
      );
      map.on({
        zoomend: this.watchChange,
        moveend: this.watchChange,
      });
    },
    drawTokyo() {
      // tokyoの領域を描画先に地図のJson読み込み
      geotokyo = Leaf.geoJson(tokyoJson, {
        style: this.style,
        onEachFeature: this.onEachFeature,
      }).addTo(map);
      // tokyoPopup的设置
      const customOptions = {
        minHeight: '260',
        maxHeight: '260',
        className: 'checkmappopup',
      };
      const customPopup = '';
      tokyoPopup = Leaf.popup(customOptions).setContent(customPopup);
      // markerとpopup
      const iconc = Leaf.divIcon({
        className: 'invisible-map-marker',
        html: "<div'></div>",
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      tokyoMarker = Leaf.marker([35.6825, 139.752778], { icon: iconc }).addTo(map)
        .bindPopup(tokyoPopup);
    },
    watchChange() {
      const borderZoom = 8.5;
      const center = map.getCenter();
      const zoomLevel = map.getZoom();
      if (!loading && (zoomLevel - borderZoom) * (zoomOrigin - borderZoom) < 0) {
        this.loadData(zoomLevel < borderZoom);
        zoomOrigin = zoomLevel;
        return;
      }
      if (!loading &&
      (zoomLevel > borderZoom) &&
      map.distance(center, this.localLatLng) > 15000) {
        this.loadData(zoomLevel < borderZoom);
        this.localLatLng = center;
      }
    },
    resetMarkers() {
      markers.forEach((marker) => {
        marker.remove();
      });
      markers = [];
      tokyoMarkers = [];
    },
    drawMap() {
      this.resetMarkers();
      let index = 0;
      patientDatas.forEach((patient) => {
        let classname = 'check-map-red';
        if (patient.IsDischarge && patient.IsDischarge === '1') {
          classname = 'check-map-green';
        }

        const marker = Leaf.marker(
          Leaf.latLng(patient.Latitude, patient.Longitude),
          {
            class: classname,
            title: index,
            icon: Leaf.divIcon({
              className: classname,
              iconSize: [12, 12],
            }),
          },
        ).addTo(map).on({
          click: function clickButton(event) {
            if (loading) return;
            if (lastMarker) {
              lastMarker.setIcon(
                Leaf.divIcon({
                  className: lastMarker.options.class,
                  iconSize: [12, 12],
                  html: '<span class="none" />',
                }),
              );
              popup.removeFrom(map);
            }
            event.target.setIcon(
              Leaf.divIcon({
                // eslint-disable-next-line prefer-template
                className: event.target.options.class + '-press',
                iconSize: [12, 12],
                html: '<span class="virus" />',
              }),
            );
            drawPopup(event.target.options.title, event.target.getLatLng());
            lastMarker = event.target;
          },
        });
        markers.push(marker);
        if (patient.ConsultationPrefecture.includes('東京') ||
            patient.ResidentPrefecture.includes('東京') ||
            patient.ResidentCity.includes('東京')) {
          tokyoMarkers.push(marker);
        }
        index += 1;
      });
      solveTokyoLatlng();
      this.enableMap();
    },
    // 根据zoom level和center决定读取的内容
    loadData(bIgnore) {
      patientDatas = [];
      this.disableMap();
      // 数据读取
      const dataList = [];
      let url = 'https://api.survival-jp.com/api/patient/detail?lat=';
      if (!bIgnore) {
        // eslint-disable-next-line prefer-template
        url += this.localLatLng.lat + '&lng=';
        // eslint-disable-next-line prefer-template
        url += this.localLatLng.lng;
      }
      axios.get(url)
        .then((response) => {
          let step = 1;
          if (response.data.data.length > maxPoint) {
            step = Math.round(response.data.data.length / maxPoint);
          }
          response.data.data.forEach((patient, index) => {
            if (index % step === 0) {
              const random = Math.random() * 360;
              const radius = Math.random() * 1;
              const data = {
                Id: patient.ID,
                UpdatedAt: patient.UpdatedAt,
                PatientNumber: patient.PatientNumber,
                OnsetDate: patient.OnsetDate,
                ConfirmDate: patient.ConfirmDate,
                ConsultationPrefecture: patient.ConsultationPrefecture,
                ResidentPrefecture: patient.ResidentPrefecture,
                ResidentCity: patient.ResidentCity,
                Age: patient.Age,
                Gender: patient.Gender,
                Description: patient.Description,
                ActionHistory: patient.ActionHistory,
                // eslint-disable-next-line no-mixed-operators
                Latitude: patient.Latitude + Math.sin(random) / 95 * radius,
                // eslint-disable-next-line no-mixed-operators
                Longitude: patient.Longitude + Math.cos(random) / 85 * radius,
                IsDischarge: patient.IsDischarge,
              };
              dataList.push(data);
            }
          });
          patientDatas = dataList;
          // 根据读取的数据显示数据
          this.drawMap();
        });// .catch(() => {  };
    },
    // ここからは東京のためのメソッド
    onEachFeature(feature, layer) {
      layer.on({
        // mouseout: this.resetHighlight,
        click: function clickRegion(event) {
          if (lastfeature) {
            geotokyo.resetStyle(lastfeature);
          }
          lastfeature = event.target;
          layer.setStyle({
            weight: 0,
            opacity: 0,
            dashArray: '',
            fillColor: '#0452E6',
            fillOpacity: 0.3,
          });
          if (!Leaf.Browser.ie && !Leaf.Browser.opera && !Leaf.Browser.edge) {
            layer.bringToFront();
            tokyoMarker.setLatLng(event.latlng);
            if (!tokyoPopup.isOpen()) {
              const valObj = [];
              let tokyoObj;
              regionDatas.forEach((regionData) => {
                if (regionData.id === feature.properties.id) valObj.push(regionData);
              });
              if (valObj.length > 0) {
                tokyoObj = valObj[0];
                tokyoObj.name = feature.properties.name;
              }
              drawTokyoPopup(tokyoObj);
            }
          }
        },
      });
    },
    // Moveout 的event
    resetHighlight(e) {
      geotokyo.resetStyle(e.target);
      // info.update();
      tokyoPopup.closePopup();
    },
    // 密度调色盘
    getColor(d) {
      if (d >= 500) {
        return '#56141C';
      }
      if (d >= 400) {
        return '#871212';
      }
      if (d >= 300) {
        return '#A52121';
      }
      if (d >= 200) {
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
      regionDatas.forEach((regionData) => {
        if (regionData.id === feature.properties.id) valObj.push(regionData.sum);
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
        fillOpacity: 0.5,
      };
    },
    loadTokyoDatas() {
      const dataList = [];
      tokyoRealSum = 0;
      axios.get('https://api.survival-jp.com/api/patient/tokyo')
        .then((response) => {
          response.data.data.forEach((region) => {
            if (region.Location !== '都外' &&
                region.Location !== '調査中') {
              const data = {
                id: region.ID,
                sum: region.Sum,
                location: region.Location,
                updatedAt: region.UpdateTime,
              };
              dataList.push(data);
              tokyoRealSum += region.Sum;
            }
          });
          regionDatas = dataList;
          this.drawTokyo();
        });
    },
  },
  mounted() {
    // 基础地图优先初始化
    this.createMap();
    // 优先显示东京区地图
    this.loadTokyoDatas();
    // 读取本地坐标
    this.getLocation();
    // 读取数据
    this.loadData(false);
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
