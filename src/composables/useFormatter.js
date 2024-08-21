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

    const getHourFromDate = (dateStr) => dateStr.slice(11, 16);

    const humanizeDate = (date) =>
        capitalize(format(date, 'eeee dd MMMM', locale.value === 'fr' ? { locale: fr } : {}));

    const formatNumber = (number, length) => {
        return String(number).padStart(length, '0');
    };

    const convertTimeToSeconds = (time) => {
        if (time.split(':').length === 2) {
            const [minutes, seconds] = time.split(':').map(Number);
            return minutes * 60 + seconds;
        } else if (time.split(':').length === 3) {
            const [hours, minutes, seconds] = time.split(':').map(Number);
            return hours * 3600 + minutes * 60 + seconds;
        }
    };

    const formatSecondsToMinutes = (seconds) => {
        const totalSeconds = Math.round(seconds);
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;

        return `${formatNumber(minutes, 2)}'${formatNumber(remainingSeconds, 2)}"`;
    };

    return {
        formatter,
        humanizeDate,
        parseDate,
        formatNumber,
        convertTimeToSeconds,
        formatSecondsToMinutes,
        getHourFromDate,
    };
};
