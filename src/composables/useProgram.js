import {
    fourTrainingsDayProgram,
    fiveTrainingsDayProgram,
    sixTrainingsDayProgram,
} from '@/trainingPrograms/trainingPrograms';
import { useLocalStorage } from '@vueuse/core';
import { format, addDays, getDay, subWeeks, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useProgram = () => {
    const matchProgram = {
        4: fourTrainingsDayProgram,
        5: fiveTrainingsDayProgram,
        6: sixTrainingsDayProgram,
    };

    const marathonDate = useLocalStorage('marathonDate', null);
    const trainingDays = useLocalStorage('trainingDays', 4);
    const trainingDayChoices = useLocalStorage('trainingDayChoices', [0, 2, 4, 6]);

    const marathonProgramDate = computed(() => {
        if (!marathonDate.value) return null;
        const marathonDateObj = parseISO(marathonDate.value);
        return subWeeks(marathonDateObj, 12);
    });

    const dayTraining = { type: 'mediumRun', time: '50:00' };

    const program = computed(() => matchProgram[trainingDays.value]);

    const { locale } = useI18n();

    const formattedMarathonDate = computed(() => {
        return marathonDate.value
            ? format(marathonDate.value, 'eeee dd MMMM', locale.value === 'fr' ? { locale: fr } : {})
            : null;
    });

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
                const dateStr = format(addDays(Date.now(), dayCounter), 'dd/MM/yyyy');
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
    };
};
