import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useFormatter = () => {
    const { locale } = useI18n();

    const formatter = computed(() => new Intl.NumberFormat(locale.value, { maximumSignificantDigits: 4 }));

    const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const parseDate = (dateStr) => {
        return parse(dateStr, 'dd/MM/yyyy', new Date(), { locale: fr });
    };

    const humanizeDate = (date) =>
        capitalize(format(date, 'eeee dd MMMM', locale.value === 'fr' ? { locale: fr } : {}));

    return { formatter, humanizeDate, parseDate };
};
