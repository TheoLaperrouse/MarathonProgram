import { getActivities, getAthleteData } from '@/services/strava.service';
import { useQuery } from '@tanstack/vue-query';

export const useGetActivities = (accessToken, params = {}) => {
    const isEnabled = () => !!accessToken.value;
    return useQuery({
        queryKey: ['activities', accessToken, params],
        queryFn: () => getActivities(accessToken.value, params),
        staleTime: 5 * 60 * 1000,
        enabled: isEnabled,
        retry: false,
    });
};

export const useGetAthleteData = (accessToken) => {
    const isEnabled = () => !!accessToken.value;
    return useQuery({
        queryKey: ['athleteData', accessToken],
        queryFn: () => getAthleteData(accessToken.value),
        staleTime: 24 * 60 * 60 * 1000,
        enabled: isEnabled,
        retry: false,
    });
};
