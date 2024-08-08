import { useFormatter } from '@/composables/useFormatter';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

export const usePerformance = () => {
    const { formatter, formatSecondsToMinutes, convertTimeToSeconds } = useFormatter();
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
        mediumRun: { pace: pacePercentVma(70), percentVMA: 70, color: '#009848' },
        longRun: { pace: pacePercentVma(65), percentVMA: 65, color: '#04C91A' },
        thresholdRun: { pace: pacePercentVma(82.5), percentVMA: 82.5, color: '#77AABE' },
        intervalsRun: { pace: pacePercentVma(100), percentVMA: 100, color: '#E12117' },
        fastIntervalsRun: { pace: pacePercentVma(110), percentVMA: 110, color: '#E12117' },
        marathon: { pace: pacePercentVma(70), percentVMA: 70, color: '#FFFF00' },
    }));

    return { paces, VO2Max, VMAKmH, marathonTime, bestTime, bestTimeSeconds, marathonTimeSeconds };
};
