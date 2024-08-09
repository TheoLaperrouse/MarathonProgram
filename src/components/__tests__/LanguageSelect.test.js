import LanguageSelector from '@/components/LanguageSelect.vue';
import { mount } from '@vue/test-utils';
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

vi.mock('vue-i18n');
vi.mock('@vueuse/core');

describe('LanguageSelect', () => {
    let localeMock;
    let localStorageMock;

    beforeEach(() => {
        vi.resetAllMocks();

        localeMock = ref({ value: 'en' });
        useI18n.mockReturnValue({ locale: localeMock });

        localStorageMock = ref({ value: 'en' });
        useLocalStorage.mockReturnValue(localStorageMock);
    });

    it('should match snapshot', () => {
        const wrapper = mount(LanguageSelector);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('changes language and updates locale and localStorage', async () => {
        const wrapper = mount(LanguageSelector);

        const select = wrapper.find('select');
        await select.setValue('fr');

        expect(localeMock.value).toBe('fr');
        expect(localStorageMock.value).toBe('fr');
    });

    it('load the locale with the localStorage value', () => {
        localStorageMock.value = 'fr';
        localeMock.value = 'en';

        mount(LanguageSelector);

        expect(localeMock.value).toBe('fr');
    });
});
