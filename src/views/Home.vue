<template>
  <div class="flex flex-col h-screen max-h-screen">
    <!-- Begin - Result / Search -->
    <div
      class="z-20 flex justify-center relative bg-action-neutral-data-3 bg-cover px-4 pt-8 pb-32"
    >
      <!-- Begin - Search Input -->
      <div class="w-full max-w-screen-sm">
        <h1 class="text-gray-700 text-center text-3xl pb-4">
          IP Address Tracker
        </h1>
        <div class="flex">
          <input
            v-model="queryIp"
            class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none"
            type="text"
            placeholder="Search IP Address"
          />
          <i
            @click="getIpInfo"
            class="cursor-pointer bg-black text-white px-4 rounded-tr-md rounded-br-md flex items-center fas fa-chevron-right"
          ></i>
        </div>
      </div>
      <!-- End - Search Input -->

      <!-- Begin - IP Info -->
      <ip-address-info v-if="ipInfo" :ipInfo="ipInfo" />
      <!-- End - IP Info -->
    </div>
    <!-- End - Result / Search -->
    <!-- Map -->
    <div id="mapid" class="h-full z-10"></div>
  </div>
</template>

<script>
import IpAddressInfo from "../components/IPInfo.vue";
import leaflet from "leaflet";
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  name: "Home",
  components: {
    IpAddressInfo,
  },
  setup() {
    let mymap;
    const token = process.env.TOKEN;
    const queryIp = ref("");
    const ipInfo = ref(null);

    onMounted(() => {
      mymap = leaflet.map("mapid").setView([-6.2955019, 106.673293], 13);

      leaflet
        .tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXBheSIsImEiOiJja3RqanJqa2wxY2IyMnFtcmE2cGh6cW9oIn0.nSpvtxhnnhwsRBdIvMnxaQ`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1IjoiaXBheSIsImEiOiJja3RqanJqa2wxY2IyMnFtcmE2cGh6cW9oIn0.nSpvtxhnnhwsRBdIvMnxaQ",
          },
        )
        .addTo(mymap);
    });

    const getIpInfo = async () => {
      try {
        const data = await axios.get(
          `https://geo.ipify.org/api/v1?apiKey=at_tCuXwIbFCtIWN8D7uW47sJZLyyrIi&ipAddress=${queryIp.value}`,
        );
        const result = data.data;
        ipInfo.value = {
          address: result.ip,
          state: result.location.region,
          timezone: result.location.timezone,
          isp: result.isp,
          lat: result.location.lat,
          lng: result.location.lng,
        };
        console.log(result);
        leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(mymap);
        mymap.setView([ipInfo.value.lat, ipInfo.value.lng], 13);
      } catch (err) {
        alert(err.message);
      }
    };
    return { mymap, queryIp, ipInfo, getIpInfo, token };
  },
};
</script>
