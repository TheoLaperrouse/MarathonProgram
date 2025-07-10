<template>
    <div id="map" />
</template>
<script setup>
import { useStrava } from '@/composables/useStrava';
import polyline from '@mapbox/polyline';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { onMounted } from 'vue';

const { data: activities } = useStrava();
onMounted(async () => {
    let map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    for (const activity of activities) {
        const coords = polyline.decode(activity.map.summary_polyline);
        const latlngs = coords.map(([lat, lng]) => [lat, lng]);
        L.polyline(latlngs, { color: 'red' }).addTo(map);
    }
});
</script>
<style>
#map {
    height: 100%;
}
</style>
