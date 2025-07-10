<template>
    <div class="p-4 max-w-4xl mx-auto">
        <h1 class="mb-6 text-3xl font-bold text-gray-800">{{ $t('dayProgram') }}</h1>
        <div class="mb-8 rounded-xl shadow-sm p-6 border-l-4 transition-all hover:shadow-md" :style="trainingCardStyle">
            <TrainingDescription
                :training="dayTraining"
                :date="date"
                :style="{ borderLeftColor: trainingTypeColor }"
                class="pl-4"
            />
        </div>
        <div
            v-if="dayActivity"
            class="rounded-xl shadow-sm p-6 border-l-4 border-green-500 bg-green-50 transition-all hover:shadow-md"
        >
            <div class="flex items-center mb-4">
                <div class="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <h2 class="text-xl font-bold text-gray-800">{{ $t('dayActivitySummary') }}</h2>
            </div>
            <Activity :show-date="false" :show-checkbox="!!dayTraining" :activity="dayActivity" class="pl-4" />
        </div>
    </div>
</template>

<script setup>
import Activity from '@/components/ActivityDetails.vue';
import TrainingDescription from '@/components/TrainingDescription.vue';
import { useFormatter } from '@/composables/useFormatter';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';
import { useStrava } from '@/composables/useStrava';
import { format } from 'date-fns';
import { computed } from 'vue';

const { hexToRGBA } = useFormatter();
const { dayActivity } = useStrava();
const { dayTraining } = useProgram();
const { paces } = usePerformance();
const date = computed(() => format(Date.now(), 'dd/MM/yyyy'));
const trainingTypeColor = computed(() => {
    const type = dayTraining.value?.type;
    if (!type) {
        return '#94A3B8';
    }
    return paces.value[type].color;
});

const trainingCardStyle = computed(() => ({
    borderLeftColor: trainingTypeColor.value,
    backgroundColor: hexToRGBA(trainingTypeColor.value, 0.15),
}));
</script>
