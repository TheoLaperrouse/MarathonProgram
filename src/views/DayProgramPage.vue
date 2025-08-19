<template>
    <div class="p-4 max-w-4xl">
        <h1 class="mb-6 text-3xl font-bold text-gray-800">{{ $t('dayProgram') }}</h1>
        <div
            class="mb-6 w-fit rounded-xl shadow-sm border-l-4 p-4 transition-all hover:shadow-md"
            :style="getActivityStyle(dayTraining.type)"
        >
            <TrainingDescription :training="dayTraining" :date="date" />
        </div>
        <template v-if="dayActivity">
            <h1 class="mb-6 text-3xl font-bold text-gray-800">{{ $t('dayActivitySummary') }}</h1>
            <div
                class="rounded-xl shadow-sm border-l-4 p-4 border-green-500 bg-green-50 transition-all hover:shadow-md"
            >
                <Activity :activity="dayActivity" :show-date="false" />
            </div>
        </template>
    </div>
</template>

<script setup>
import Activity from '@/components/ActivityDetails.vue';
import TrainingDescription from '@/components/TrainingDescription.vue';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';
import { useStrava } from '@/composables/useStrava';
import { format } from 'date-fns';
import { computed } from 'vue';

const { dayActivity } = useStrava();
const { dayTraining } = useProgram();
const { getActivityStyle } = usePerformance();
const date = computed(() => format(Date.now(), 'dd/MM/yyyy'));
</script>
