import { useFormatter } from '@/composables/useFormatter';
import {
    fourTrainingsDayProgram,
    fiveTrainingsDayProgram,
    sixTrainingsDayProgram,
} from '@/trainingPrograms/trainingPrograms';
import { useLocalStorage } from '@vueuse/core';
import { format, addDays, getDay, subWeeks } from 'date-fns';
import { computed } from 'vue';

export const useProgram = () => {
    const matchProgram = {
        4: fourTrainingsDayProgram,
        5: fiveTrainingsDayProgram,
        6: sixTrainingsDayProgram,
    };

    const { humanizeDate } = useFormatter();

    const marathonDate = useLocalStorage('marathonDate', null);
    const trainingDays = useLocalStorage('trainingDays', 4);
    const trainingDayChoices = useLocalStorage('trainingDayChoices', [0, 2, 4, 6]);

    const marathonProgramDate = computed(() => subWeeks(marathonDate.value, 12));

    const program = computed(() => matchProgram[trainingDays.value]);

    const formattedMarathonDate = computed(() => (marathonDate.value ? humanizeDate(marathonDate.value) : null));
    const formattedProgramDate = computed(() =>
        marathonProgramDate.value ? humanizeDate(marathonProgramDate.value) : null,
    );

    const getNextDay = (dayIndex) => {
        if (!marathonDate.value) return null;

        const marathonDateObj = new Date();
        const currentDay = getDay(marathonDateObj);

        const targetDay = (dayIndex + 1) % 7;

        let daysUntilNextDay = (targetDay - currentDay + 7) % 7;
        if (daysUntilNextDay === 0) {
            daysUntilNextDay = 7;
        }

        return addDays(marathonDateObj, daysUntilNextDay);
    };

    const trainingSchedule = computed(() => {
        let dayCounter = 0;

        const currentProgram = program.value;

        const schedule = {};

        Object.keys(currentProgram).forEach((weekKey) => {
            const sessions = currentProgram[weekKey];
            sessions.forEach((session) => {
                const dateStr = format(addDays(marathonProgramDate.value, dayCounter), 'dd/MM/yyyy');
                schedule[dateStr] = session;
                dayCounter += 2;
            });
        });

        return Object.entries(schedule)
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
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
        getNextDay,
        trainingSchedule,
        formattedProgramDate,
    };
};
