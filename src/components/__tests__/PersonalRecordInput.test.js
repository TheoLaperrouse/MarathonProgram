import PersonalRecordInput from '@/components/PersonalRecordInput.vue';
import { usePerformance } from '@/composables/usePerformance';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

vi.mock('vue-i18n', () => ({
    useI18n: () => ({
        t: (key) => key,
    }),
}));

vi.mock('@/composables/usePerformance');

describe('PersonalRecordInput', () => {
    let bestTimeMock;

    beforeEach(() => {
        vi.resetAllMocks();

        bestTimeMock = ref('7:15');
        usePerformance.mockReturnValue({ bestTime: bestTimeMock });
    });

    it('should match snapshot', () => {
        const wrapper = mount(PersonalRecordInput);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders correctly with initial state', () => {
        const wrapper = mount(PersonalRecordInput);

        const input = wrapper.find('input');
        expect(input.element.value).toBe('7:15');
    });

    it('updates bestTime when input value changes', async () => {
        const wrapper = mount(PersonalRecordInput);

        const input = wrapper.find('input');
        await input.setValue('7:30');

        expect(bestTimeMock.value).toBe('7:30');
    });
});
