import { useLocalStorage } from '@vueuse/core';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useProgram = () => {
    const marathonDate = useLocalStorage('marathonDate', null);
    const dayTraining = { type: 'mediumRun', time: '50:00' };

    const { locale, t } = useI18n();

    const formattedMarathonDate = computed(() => {
        return marathonDate.value
            ? format(marathonDate.value, 'eeee dd MMMM', locale.value === 'fr' ? { locale: fr } : {})
            : t('dateNotDefined');
    });
    return { dayTraining, marathonDate, formattedMarathonDate };
};
