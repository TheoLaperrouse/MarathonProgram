import { useFormatter } from '@/composables/useFormatter';
import {
    fourTrainingsDayProgram,
    fiveTrainingsDayProgram,
    sixTrainingsDayProgram,
} from '@/trainingPrograms/trainingPrograms';
import { useLocalStorage } from '@vueuse/core';
import { format, addDays, addMonths, subWeeks, getDay } from 'date-fns';
import { computed } from 'vue';

export const useProgram = () => {
    const matchProgram = {
        4: fourTrainingsDayProgram,
        5: fiveTrainingsDayProgram,
        6: sixTrainingsDayProgram,
    };

    const { humanizeDate } = useFormatter();

    const marathonDate = useLocalStorage('marathonDate', addMonths(new Date(), 3));
    const trainingDays = useLocalStorage('trainingDays', 4);
    const trainingDayChoices = useLocalStorage('trainingDayChoices', [0, 2, 4, 6]);

    const marathonProgramDate = computed(() => subWeeks(marathonDate.value, 12));

    const program = computed(() => matchProgram[trainingDays.value]);

    const formattedMarathonDate = computed(() => (marathonDate.value ? humanizeDate(marathonDate.value) : null));
    const formattedProgramDate = computed(() =>
        marathonProgramDate.value ? humanizeDate(marathonProgramDate.value) : null,
    );

    const getNextTrainingDay = (currentDate) => {
        const currentDay = getDay(currentDate);
        for (let i = 1; i <= 7; i++) {
            const nextDay = (currentDay + i) % 7;
            if (trainingDayChoices.value.includes(nextDay)) {
                return addDays(currentDate, i);
            }
        }
        return addDays(currentDate, 1);
    };

    const trainingSchedule = computed(() => {
        let currentDate = marathonProgramDate.value;
        const currentProgram = program.value;
        const schedule = {};

        Object.keys(currentProgram).forEach((weekKey) => {
            const sessions = currentProgram[weekKey];
            sessions.forEach((session) => {
                currentDate = getNextTrainingDay(currentDate);
                const dateStr = format(currentDate, 'dd/MM/yyyy');
                schedule[dateStr] = session;
            });
        });

        return Object.entries(schedule)
            .sort(
                ([dateA], [dateB]) =>
                    new Date(dateA.split('/').reverse().join('-')) - new Date(dateB.split('/').reverse().join('-')),
            )
            .reduce((sorted, [date, training]) => {
                sorted[date] = training;
                return sorted;
            }, {});
    });

    const dayTraining = computed(() => {
        const todayFormatted = format(Date.now(), 'dd/MM/yyyy');
        return trainingSchedule.value[todayFormatted];
    });

    return {
        dayTraining,
        marathonDate,
        formattedMarathonDate,
        trainingDays,
        trainingDayChoices,
        program,
        marathonProgramDate,
        trainingSchedule,
        formattedProgramDate,
    };
};
