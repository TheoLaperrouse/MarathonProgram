<template>
    <div class="ml-4 mt-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('settings') }}</h1>
        <div class="mb-2">
            <label>{{ $t('marathonTimeInput') }}</label>
            <input class="w-20" v-model="marathonTime" />
        </div>
        <div class="mb-2">
            <label>{{ $t('bestTimeInput') }}</label>
            <input class="w-20" v-model="bestTime" />
        </div>
        <div>
            <label>{{ $t('marathonDate') }}</label>
            <DatePicker class="w-40" v-model="marathonDate" :enable-time-picker="false" :format="format" />
        </div>
    </div>
</template>

<script setup>
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const { marathonDate } = useProgram();
const { marathonTime, bestTime } = usePerformance();

const format = computed(() => (locale.value === 'fr' ? 'dd/MM/yyyy' : 'MM/dd/yyyy'));
</script>
