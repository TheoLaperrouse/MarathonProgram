<template>
    <div id="map" />
</template>

<script setup>
import { useGetActivities } from '@/composables/useStravaQueries';
import polyline from '@mapbox/polyline';
import { useLocalStorage } from '@vueuse/core';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { onMounted, watch, computed } from 'vue';

const stravaAccessToken = useLocalStorage('stravaAccessToken', '');
const { data: sportActivities, isPending: isActivitiesPending } = useGetActivities(stravaAccessToken, {
    per_page: 30,
});

const activities = computed(() =>
    sportActivities.value
        ?.filter((activity) => ['Run', 'TrailRun'].includes(activity.type))
        .sort((a, b) => new Date(b.start_date) - new Date(a.start_date)),
);

const getColor = (count, max) => {
    const ratio = count / max;
    const r = Math.floor(255 * ratio);
    const b = Math.floor(255 * (1 - ratio));
    return `rgb(${r}, 0, ${b})`;
};

const normalizeSegment = (coord1, coord2) => {
    return [coord1, coord2]
        .sort((a, b) => a[0] - b[0] || a[1] - b[1])
        .map((c) => c.join(','))
        .join('|');
};

let map;
onMounted(() => {
    map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
});
watch(
    isActivitiesPending,
    (loading) => {
        if (!loading && activities.value) {
            const segmentCounts = new Map();
            let maxCount = 0;

            activities.value.forEach((activity) => {
                if (activity.map?.summary_polyline) {
                    const coords = polyline.decode(activity.map.summary_polyline);
                    for (let i = 0; i < coords.length - 1; i++) {
                        const segmentKey = normalizeSegment(coords[i], coords[i + 1]);
                        const count = segmentCounts.get(segmentKey) || 0;
                        segmentCounts.set(segmentKey, count + 1);
                        if (count + 1 > maxCount) maxCount = count + 1;
                    }
                }
            });

            const segmentsDrawn = new Set();
            segmentCounts.forEach((count, segmentKey) => {
                if (!segmentsDrawn.has(segmentKey)) {
                    const [coord1, coord2] = segmentKey.split('|').map((s) => s.split(',').map(Number));
                    const color = getColor(count, maxCount);

                    L.polyline([coord1, coord2], {
                        color,
                        weight: 3 + (count / maxCount) * 5,
                        opacity: 0.7,
                    }).addTo(map);

                    segmentsDrawn.add(segmentKey);
                }
            });

            const bounds = Array.from(segmentCounts.keys()).flatMap((segmentKey) =>
                segmentKey.split('|').map((s) => s.split(',').map(Number)),
            );

            if (bounds.length > 0) {
                map.fitBounds(bounds);
            }

            const legend = L.control({ position: 'bottomright' });
            legend.onAdd = () => {
                const div = L.DomUtil.create('div', 'info legend');
                div.innerHTML = `
                    <h4>Fréquentation</h4>
                    <div><span style="background: ${getColor(0, maxCount)}"></span> Rare</div>
                    <div><span style="background: ${getColor(maxCount / 2, maxCount)}"></span> Moyen</div>
                    <div><span style="background: ${getColor(maxCount, maxCount)}"></span> Fréquent</div>
                `;
                return div;
            };
            legend.addTo(map);
        }
    },
    { immediate: true },
);
</script>

<style>
#map {
    height: 100%;
}
.legend {
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    line-height: 1.5;
}
.legend h4 {
    margin: 0 0 5px;
}
.legend span {
    display: inline-block;
    width: 20px;
    height: 10px;
    margin-right: 5px;
}
</style>
