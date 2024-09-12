import { useFormatter } from '@/composables/useFormatter';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';

export const usePerformance = () => {
    const { formatSecondsToMinutes, convertTimeToSeconds } = useFormatter();

    const cardiacFrequencyMax = 220;

    const bestTime = useLocalStorage('bestTime', '8:30');
    const marathonTime = useLocalStorage('marathonTime', '4:00:00');

    const bestTimeSeconds = computed(() => convertTimeToSeconds(bestTime.value));
    const marathonTimeSeconds = computed(() => convertTimeToSeconds(marathonTime.value));
    const VMAKmH = computed(() => (1 / (bestTimeSeconds.value / 2)) * 3600);
    const VO2Max = computed(() => parseInt(VMAKmH.value * 3.5));

    const getPaceByPercentVMA = (percent) => {
        const speed = VMAKmH.value * (percent / 100);
        const timePerKm = 60 / speed;
        return formatSecondsToMinutes(timePerKm * 60);
    };

    const getCardiacFrequencyByPercentVMA = (percent) => {
        return (cardiacFrequencyMax * percent) / 100;
    };

    const paces = computed(() => ({
        mediumRun: {
            pace: getPaceByPercentVMA(70),
            cardiacFrequency: getCardiacFrequencyByPercentVMA(70),
            percentVMA: 70,
            color: '#009848',
        },
        longRun: {
            pace: getPaceByPercentVMA(65),
            cardiacFrequency: getCardiacFrequencyByPercentVMA(60),
            percentVMA: 65,
            color: '#04C91A',
        },
        thresholdRun: {
            pace: getPaceByPercentVMA(82.5),
            cardiacFrequency: getCardiacFrequencyByPercentVMA(80),
            percentVMA: 82.5,
            color: '#77AABE',
        },
        intervalsRun: {
            pace: getPaceByPercentVMA(100),
            cardiacFrequency: getCardiacFrequencyByPercentVMA(80),
            percentVMA: 100,
            color: '#E12117',
        },
        fastIntervalsRun: {
            pace: getPaceByPercentVMA(110),
            cardiacFrequency: getCardiacFrequencyByPercentVMA(85),
            percentVMA: 110,
            color: '#E12117',
        },
        marathon: {
            pace: getPaceByPercentVMA(80),
            cardiacFrequency: getCardiacFrequencyByPercentVMA(80),
            percentVMA: 80,
            color: '#FFFF00',
        },
    }));

    return { paces, VO2Max, VMAKmH, marathonTime, bestTime, bestTimeSeconds, marathonTimeSeconds };
};
