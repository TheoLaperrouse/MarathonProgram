import { useFormatter } from '@/composables/useFormatter';
import { useProgram } from '@/composables/useProgram';
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
    const { VITE_STRAVA_CLIENT_ID: client_id, VITE_STRAVA_CLIENT_SECRET: client_secret } = import.meta.env;
    const stravaAccessToken = useLocalStorage('stravaAccessToken', '');
    const stravaRefreshToken = useLocalStorage('stravaRefreshToken', '');
    const { marathonProgramDate } = useProgram();

    const { data: athleteData, isError: isAthleteError } = useGetAthleteData(stravaAccessToken);

    const { data: sportActivities, isPending: isActivitiesPending } = useGetActivities(stravaAccessToken, {
        per_page: 100,
        after: Math.floor(marathonProgramDate.value.getTime() / 1000),
    });

    const activities = computed(() =>
        sportActivities.value
            ?.filter((activity) => ['Run', 'TrailRun'].includes(activity.type))
            .sort((a, b) => new Date(b.start_date) - new Date(a.start_date)),
    );

    const isValidStrava = computed(() => stravaAccessToken.value && !!athleteData.value && !isAthleteError.value);
    const fullName = computed(() =>
        athleteData.value ? `${athleteData.value.firstname} ${athleteData.value.lastname}` : '',
    );

    const dayActivity = computed(
        () => activities.value?.filter((activity) => isToday(parseISO(activity.start_date_local)))[0],
    );

    const loginWithStrava = () => {
        const redirectUri = window.location.href;
        const responseType = 'code';
        const scope = 'read_all,activity:read_all';

        const authUrl = `https://www.strava.com/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;

        window.location.href = authUrl;
    };

    const handleAuthRedirect = async () => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');

        if (code) {
            const response = await fetch('https://www.strava.com/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id,
                    client_secret,
                    code,
                    grant_type: 'authorization_code',
                }),
            });

            const data = await response.json();
            stravaAccessToken.value = data.access_token;
            stravaRefreshToken.value = data.refresh_token;
        }
    };

    return {
        loginWithStrava,
        handleAuthRedirect,
        athleteData,
        activities,
        isActivitiesPending,
        stravaAccessToken,
        stravaRefreshToken,
        fullName,
        dayActivity,
        isValidStrava,
    };
};
