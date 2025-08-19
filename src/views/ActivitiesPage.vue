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
                        class="rounded-lg shadow-sm p-2 border-l-4"
                        v-for="activity in week.activities"
                        :key="activity.id"
                        :style="getActivityStyle(getScheduledActivityByDate(activity.date)?.type)"
                        :badge-color="getActivityStyle(getScheduledActivityByDate(activity.date)?.type).borderLeftColor"
                        :activity="activity"
                        :show-date="true"
                    />
                </div>
            </div>
        </template>
    </div>
</template>
<script setup>
import ActivityDetails from '@/components/ActivityDetails.vue';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';
import { useStrava } from '@/composables/useStrava';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { computed } from 'vue';

const { activities, isActivitiesPending } = useStrava();
const { getActivityStyle } = usePerformance();
const { getScheduledActivityByDate } = useProgram();

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
