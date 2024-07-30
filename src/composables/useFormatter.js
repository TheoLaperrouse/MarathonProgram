import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useFormatter = () => {
    const { locale } = useI18n();
    const formatter = computed(() => new Intl.NumberFormat(locale.value, { maximumSignificantDigits: 4 }));
    return { formatter };
};
