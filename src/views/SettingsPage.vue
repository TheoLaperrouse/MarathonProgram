<template>
    <div class="p-4">
        <h1 class="text-3xl font-bold">{{ $t('settings') }}</h1>
        <div class="my-3 text-xl font-bold">{{ $t('languageInput') }}</div>
        <LanguageSelect />
        <div class="my-3 text-xl font-bold">{{ $t('stravaTokenInput') }}</div>
        <div class="flex items-center">
            <input class="w-60" v-model="stravaToken" />
            <FontAwesomeIcon v-if="isAthleteLoading" :icon="faSpinner" spin class="text-gray-500 ml-2" />
            <FontAwesomeIcon v-else-if="isValidToken" :icon="faCheck" class="text-green-500 ml-2" />
            <FontAwesomeIcon v-else :icon="faXmark" class="text-red-500 ml-2" />
        </div>
        <div class="my-3 text-xl font-bold">{{ $t('marathonProgram') }}</div>
        <div class="mb-2">
            <label>{{ $t('marathonTimeInput') }}</label>
            <input class="w-20" v-model="marathonTime" />
        </div>
        <div class="mb-2">
            <label>{{ $t('bestTimeInput') }}</label>
            <input class="w-20" v-model="bestTime" />
        </div>
        <div class="mb-2 w-60">
            <label>{{ $t('marathonDate') }}</label>
            <DatePicker class="rounded-md" v-model="marathonDate" :enable-time-picker="false" :format="format" />
        </div>
        <div class="mb-2">
            <label>{{ $t('trainingDaysInput') }}</label>
            <select class="w-20" v-model="trainingDays">
                <option :value="4">4</option>
                <option :value="5">5</option>
                <option :value="6">6</option>
            </select>
        </div>
        <div class="mb-2">
            <label>{{ $t('selectTrainingDays') }}</label>
            <div class="flex space-x-2">
                <label v-for="(day, index) in daysOfWeek" :key="index" class="flex items-center">
                    <input
                        type="checkbox"
                        :value="getDayValue(index)"
                        v-model="trainingDayChoices"
                        :disabled="
                            trainingDayChoices.length >= trainingDays &&
                            !trainingDayChoices.includes(getDayValue(index))
                        "
                    />
                    <span class="ml-1">{{ $t(`daysOfWeek.${day}`) }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import LanguageSelect from '@/components/LanguageSelect.vue';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';
import { useStrava } from '@/composables/useStrava';
import { faCheck, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const { marathonDate, trainingDays, trainingDayChoices } = useProgram();
const { marathonTime, bestTime } = usePerformance();
const { isAthleteLoading, stravaToken, isValidToken } = useStrava();

const getDayValue = (index) => (index + 1) % 7;

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

watch(trainingDays, (newVal) => {
    if (trainingDayChoices.value.length > newVal) {
        trainingDayChoices.value = trainingDayChoices.value.slice(0, newVal);
    }
});

watch(trainingDayChoices, (newVal) => {
    trainingDayChoices.value = newVal.sort();
});

const format = computed(() => (locale.value === 'fr' ? 'dd/MM/yyyy' : 'MM/dd/yyyy'));
</script>
