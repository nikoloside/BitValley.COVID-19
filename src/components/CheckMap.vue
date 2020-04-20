<template>
  <div id="CheckMap">
      <div id='map'></div>
  </div>
</template>


<script>
import 'leaflet/dist/leaflet.css';
import Leaf from 'leaflet';
import axios from 'axios';

const southWest = Leaf.latLng(20.6825, 119.752778);
const northEast = Leaf.latLng(50.6825, 159.752778);
const bounds = Leaf.latLngBounds(southWest, northEast);
const maxPoint = 350;
let map;
let lastMarker;
let markers = [];
let patientDatas = [];
let popup;
let zoomOrigin = 12;

// eslint-disable-next-line func-names
const drawPopup = function (id) {
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
      [patientDatas[id].Latitude,
        patientDatas[id].Longitude],
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
      loading: false,
    };
  },
  methods: {
    // map按钮的取消
    disableMap() {
      this.loading = true;
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
      this.loading = false;
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
        Leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      );
      map.on({
        zoomend: this.watchChange,
        moveend: this.watchChange,
      });
    },
    watchChange() {
      const borderZoom = 8.5;
      const center = map.getCenter();
      const zoomLevel = map.getZoom();
      if (!this.loading && (zoomLevel - borderZoom) * (zoomOrigin - borderZoom) < 0) {
        this.loadData(zoomLevel < borderZoom);
        zoomOrigin = zoomLevel;
        return;
      }
      if (!this.loading &&
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
            title: classname,
            id: index,
            icon: Leaf.divIcon({
              className: classname,
              iconSize: [12, 12],
            }),
          },
        ).addTo(map).on({
          click: function clickButton(event) {
            if (lastMarker) {
              lastMarker.setIcon(
                Leaf.divIcon({
                  className: lastMarker.options.title,
                  iconSize: [12, 12],
                  html: '<span class="none" />',
                }),
              );
              popup.removeFrom(map);
            }
            event.target.setIcon(
              Leaf.divIcon({
                // eslint-disable-next-line prefer-template
                className: event.target.options.title + '-press',
                iconSize: [12, 12],
                html: '<span class="virus" />',
              }),
            );
            drawPopup(event.target.options.id);
            lastMarker = event.target;
          },
        });
        markers.push(marker);
        index += 1;
      });
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
              const radius = Math.random() * 2;
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
  },
  mounted() {
    // 基础地图优先初始化
    this.createMap();
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
