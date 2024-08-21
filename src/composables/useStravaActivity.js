import { useFormatter } from '@/composables/useFormatter';
import { computed } from 'vue';

export const useStravaActivity = (activity) => {
    const { getHourFromDate, formatSecondsToMinutes, humanizeDate } = useFormatter();
    const activityName = computed(() => activity.value.name);
    const activityTime = computed(() => formatSecondsToMinutes(activity.value.moving_time));
    const activityDistance = computed(() => activity.value.distance / 1000);
    const activityAveragePace = computed(() =>
        formatSecondsToMinutes(activity.value.moving_time / activityDistance.value),
    );
    const activityDate = computed(() => humanizeDate(activity.value.start_date_local));
    const activityStartTime = computed(() => getHourFromDate(activity.value.start_date_local));

    return { activityName, activityAveragePace, activityTime, activityDistance, activityDate, activityStartTime };
};
