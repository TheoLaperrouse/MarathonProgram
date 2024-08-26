import { useFormatter } from '@/composables/useFormatter';
import { useGetAthleteData, useGetActivities } from '@/composables/useStravaQueries';
import { useLocalStorage } from '@vueuse/core';
import { parseISO, isToday } from 'date-fns';
import { computed } from 'vue';

export const useStravaActivity = (activity) => {
    const { getHourFromDate, formatSecondsToMinutes, humanizeDate } = useFormatter();
    const activityName = computed(() => activity.value.name);
    const activityTime = computed(() => formatSecondsToMinutes(activity.value.moving_time));
    const activityDistance = computed(() => (activity.value.distance / 1000).toFixed(3));
    const activityAveragePace = computed(() =>
        formatSecondsToMinutes(activity.value.moving_time / activityDistance.value),
    );
    const activityDate = computed(() => humanizeDate(activity.value.start_date_local));
    const activityStartTime = computed(() => getHourFromDate(activity.value.start_date_local));

    return { activityName, activityAveragePace, activityTime, activityDistance, activityDate, activityStartTime };
};

export const useStrava = () => {
    const stravaAccessToken = useLocalStorage('stravaAccessToken', '');
    const stravaRefreshToken = useLocalStorage('stravaRefreshToken', '');

    const {
        data: athleteData,
        isPending: isAthletePending,
        isError: isAthleteError,
    } = useGetAthleteData(stravaAccessToken);

    const { data: activities, isPending: isActivitiesPending } = useGetActivities(stravaAccessToken, { per_page: 30 });

    const isValidStrava = computed(() => stravaAccessToken.value && !!athleteData.value && !isAthleteError.value);
    const fullName = computed(() =>
        athleteData.value ? `${athleteData.value.firstname} ${athleteData.value.lastname}` : '',
    );

    const dayActivity = computed(
        () => activities.value?.filter((activity) => isToday(parseISO(activity.start_date_local)))[0],
    );

    return {
        athleteData,
        isAthletePending,
        activities,
        isActivitiesPending,
        stravaAccessToken,
        stravaRefreshToken,
        fullName,
        dayActivity,
        isValidStrava,
    };
};
