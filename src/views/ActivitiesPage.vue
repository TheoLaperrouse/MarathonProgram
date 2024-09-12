<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('activities') }}</h1>
        <div v-if="!activities && isActivitiesPending" class="flex justify-center items-center spin mb-12">
            <FontAwesomeIcon :icon="faSpinner" spin class="text-gray-500 text-6xl" />
        </div>
        <template v-else>
            <div v-for="week in activitiesByWeek" :key="week.week" class="mb-4">
                <h2 class="text-2xl font-semibold mb-4">
                    {{ $t('week') }} {{ week.week }} ({{ week.totalDistance.toFixed(2) }} km) :
                </h2>
                <div :class="`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`">
                    <ActivityDetails
                        v-for="activity in week.activities"
                        :key="activity.id"
                        :activity="activity"
                        :show-date="true"
                        class="rounded-lg shadow p-4 border-2"
                        :style="getStyle(activity)"
                    />
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
import ActivityDetails from '@/components/ActivityDetails.vue';
import { useFormatter } from '@/composables/useFormatter';
import { useStrava } from '@/composables/useStrava';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { minBy, maxBy } from 'lodash';
import { computed } from 'vue';

const { activities, isActivitiesPending } = useStrava();
const { hexToRGBA } = useFormatter();

const minSpeed = computed(() => minBy(activities.value, 'average_speed').average_speed);
const maxSpeed = computed(() => maxBy(activities.value, 'average_speed').average_speed);

const getRedGradientColor = (normalizedSpeed) => {
    const invertedSpeed = 1 - normalizedSpeed;

    const hexaRG = Math.floor(210 * invertedSpeed)
        .toString(16)
        .padStart(2, '0');

    return `#FF${hexaRG.repeat(2)}`;
};

const getStyle = ({ average_speed }) => {
    const normalizedSpeed = (average_speed - minSpeed.value) / (maxSpeed.value - minSpeed.value);
    const borderColor = getRedGradientColor(normalizedSpeed);
    return { borderColor, backgroundColor: hexToRGBA(borderColor, 0.4) };
};

const activitiesByWeek = computed(() => {
    if (!activities.value || activities.value.length === 0) {
        return [];
    }
    const weeks = {};

    activities.value?.forEach((activity) => {
        const activityDate = new Date(activity.start_date_local);
        const weekStart = startOfWeek(activityDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(activityDate, { weekStartsOn: 1 });
        const weekKey = `${format(weekStart, 'yyyy-MM-dd')}-${format(weekEnd, 'yyyy-MM-dd')}`;

        if (!weeks[weekKey]) {
            weeks[weekKey] = [];
        }

        weeks[weekKey].push({ ...activity, date: activityDate });
    });
    const weekLength = Object.keys(weeks).length;
    return Object.entries(weeks).map(([, activities], index) => {
        const totalDistance = activities.reduce((sum, activity) => sum + (activity.distance / 1000 || 0), 0);

        return {
            week: weekLength - index,
            totalDistance,
            activities: activities.sort((a, b) => a.date - b.date),
        };
    });
});
</script>
<style scoped>
.spin {
    min-height: 80vh;
}
</style>
