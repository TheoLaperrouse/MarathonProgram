import { ref } from 'vue';

export const useGarmin = () => {
    const isValidGarmin = ref(false);
    const formatTrainingToGarmin = (workout) => {
        return {
            name: workout.title,
            type: workout.type,
            duration: workout.duration,
            distance: workout.distance,
        };
    };
    const sendWorkoutToGarmin = () => {
        return;
    };
    return { formatTrainingToGarmin, sendWorkoutToGarmin, isValidGarmin };
};
