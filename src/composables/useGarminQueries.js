import { sendWorkout } from '@/services/garmin.service';
import { useMutation } from '@tanstack/vue-query';

export function useSendWorkout(accessToken) {
    return useMutation({
        mutationFn: (workoutData) => sendWorkout(accessToken, workoutData),
    });
}
