<template>
    <div class="p-4">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-3xl font-bold">{{ $t('settings') }}</h1>
                <div class="my-3 text-xl font-bold">{{ $t('marathonProgram') }}</div>
            </div>
            <button @click="resetSettings" class="rounded-lg bg-red-600 px-4 py-3 text-white hover:bg-red-700">
                <FontAwesomeIcon :icon="faRefresh" />
            </button>
        </div>
        <div class="mb-2 w-80">
            <label>{{ $t('marathonTimeInput') }}</label>
            <input v-model="marathonTime" class="w-20" :class="{ 'border-red-500': marathonTimeError }" />
            <span v-if="marathonTimeError" class="ml-2 text-red-500">
                {{ $t('errorFormat', { format: 'H:MM:SS' }) }}
            </span>
        </div>
        <div class="mb-2 w-80">
            <label>{{ $t('bestTimeInput') }}</label>
            <input v-model="bestTime" class="w-20" :class="{ 'border-red-500': bestTimeError }" />
            <span v-if="bestTimeError" class="ml-2 text-red-500">{{ $t('errorFormat', { format: 'M:SS' }) }}</span>
        </div>
        <div class="mb-2 w-80">
            <label>{{ $t('marathonDate') }}</label>
            <DatePicker class="rounded-md" v-model="marathonDate" :enable-time-picker="false" :format="format" />
        </div>
        <div class="mb-2 w-fit">
            <label>{{ $t('trainingDaysInput') }}</label>
            <select class="w-20" v-model="trainingDays">
                <option :value="4">4</option>
                <option :value="5">5</option>
                <option :value="6">6</option>
            </select>
        </div>
        <div class="mb-2">
            <label>{{ $t('selectTrainingDays') }}</label>
            <div class="flex flex-wrap gap-2">
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
                <FontAwesomeIcon
                    v-if="trainingDayChoices.length !== trainingDays"
                    :icon="faExclamationTriangle"
                    v-tooltip="$t('tooltipNotEnoughDays')"
                    class="text-red-500 text-xl"
                />
            </div>
        </div>
        <div class="my-3 text-xl font-bold">{{ $t('stravaConnection') }}</div>
        <div class="flex text-2xl items-center mb-2">
            <StravaConnectionButton />
            <FontAwesomeIcon v-if="isValidStrava" :icon="faCheck" class="text-green-500 ml-2" />
            <FontAwesomeIcon v-else :icon="faXmark" class="text-red-500 ml-2" />
        </div>
        <div class="my-3 text-xl font-bold">{{ $t('languageInput') }}</div>
        <LanguageSelect />
    </div>
</template>

<script setup>
import LanguageSelect from '@/components/LanguageSelect.vue';
import StravaConnectionButton from '@/components/StravaConnectionButton.vue';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';
import { useStrava } from '@/composables/useStrava';
import { faCheck, faXmark, faExclamationTriangle, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Swal from 'sweetalert2';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const validateTime = (value, format) => {
    if (!value) return false;
    if (format === 'm:ss') {
        return /^([0-5]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    }
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value);
};

const marathonTimeError = computed(() => !validateTime(marathonTime.value));
const bestTimeError = computed(() => !validateTime(bestTime.value, 'm:ss'));

const { locale, t } = useI18n();
const { marathonDate, trainingDays, trainingDayChoices } = useProgram();
const { marathonTime, bestTime } = usePerformance();
const { isValidStrava } = useStrava();

const getDayValue = (index) => (index + 1) % 7;

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const resetSettings = () => {
    Swal.fire({
        title: t('resetSettings'),
        text: t('confirmDelete'),
        icon: 'warning',
        confirmButtonText: t('confirmButton'),
        showCancelButton: true,
        cancelButtonText: t('cancelButton'),
        reverseButtons: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            Swal.fire({
                title: t('deleted'),
                text: t('confirmDeletion'),
                icon: 'success',
                timer: 2000,
            });
        }
    });
};

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
