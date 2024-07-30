import { useFormatter } from '@/composables/useFormatter';
import { convertTimeToSeconds, formatSecondsToMinutes } from '@/utils/time.utils';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

export const usePerformance = () => {
    const { formatter } = useFormatter();
    const bestTime = useLocalStorage('bestTime', '8:30');
    const marathonTime = useLocalStorage('marathonTime', '4:00:00');

    const bestTimeSeconds = computed(() => convertTimeToSeconds(bestTime.value));
    const marathonTimeSeconds = computed(() => convertTimeToSeconds(marathonTime.value));

    const VMAKmH = computed(() => (1 / (bestTimeSeconds.value / 2)) * 3600);
    const VO2Max = computed(() => formatter.value.format(VMAKmH.value * 3.6));
    const pacePercentVma = (percent) => {
        const speed = VMAKmH.value * (percent / 100);
        const timePerKm = 60 / speed;
        return formatSecondsToMinutes(timePerKm * 60);
    };

    const paces = computed(() => ({
        slowRun: { pace: pacePercentVma(50), percentVMA: 50 },
        mediumRun: { pace: pacePercentVma(70), percentVMA: 70 },
        thresholdRun: { pace: pacePercentVma(82.5), percentVMA: 100 },
        intervalsRun: { pace: pacePercentVma(100), percentVMA: 100 },
        fastIntervalsRun: { pace: pacePercentVma(110), percentVMA: 110 },
    }));

    return { paces, VO2Max, VMAKmH, marathonTime, bestTime, bestTimeSeconds, marathonTimeSeconds };
};
