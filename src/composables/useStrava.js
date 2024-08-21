import { useGetAthleteData, useGetActivities } from '@/composables/useStravaQueries';
import { useLocalStorage } from '@vueuse/core';
import { parseISO, isToday } from 'date-fns';
import { computed } from 'vue';

export const useStrava = () => {
    const stravaToken = useLocalStorage('stravaToken', '');

    const { data: athleteData, isLoading: isAthleteLoading } = useGetAthleteData(stravaToken);
    const { data: activities, isLoading: isActivitiesLoading } = useGetActivities(stravaToken, { per_page: 10 });

    const isValidToken = computed(() => !!athleteData.value);

    const fullName = computed(() =>
        athleteData.value ? `${athleteData.value.firstname} ${athleteData.value.lastname}` : '',
    );

    const dayActivity = computed(() => {
        return activities.value?.filter((activity) => isToday(parseISO(activity.start_date_local)))[0];
    });

    return {
        athleteData,
        isAthleteLoading,
        activities,
        isActivitiesLoading,
        stravaToken,
        fullName,
        dayActivity,
        isValidToken,
    };
};
