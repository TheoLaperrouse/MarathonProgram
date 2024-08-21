import { getActivities, getAthleteData } from '@/services/strava.service';
import { useQuery } from '@tanstack/vue-query';

export const useGetActivities = (accessToken, params = {}) => {
    return useQuery({
        queryKey: ['activities', accessToken.value, params],
        queryFn: () => getActivities(accessToken.value, params),
        staleTime: 5 * 60 * 1000,
        enabled: !!accessToken.value,
    });
};

export const useGetAthleteData = (accessToken) => {
    return useQuery({
        queryKey: ['athleteData', accessToken.value],
        queryFn: () => getAthleteData(accessToken.value),
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!accessToken.value,
    });
};
