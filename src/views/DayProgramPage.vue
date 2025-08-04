<template>
    <div class="p-4 max-w-4xl">
        <h1 class="mb-6 text-3xl font-bold text-gray-800">{{ $t('dayProgram') }}</h1>
        <div
            class="mb-8 w-fit rounded-xl shadow-sm p-6 border-l-4 transition-all hover:shadow-md"
            :style="trainingCardStyle"
        >
            <TrainingDescription
                :training="dayTraining"
                :date="date"
                :style="{ borderLeftColor: trainingTypeColor }"
                class="pl-4"
            />
        </div>
        <template v-if="dayActivity">
            <h1 class="mb-6 text-3xl font-bold text-gray-800">{{ $t('dayActivitySummary') }}</h1>
            <div
                class="rounded-xl shadow-sm p-6 border-l-4 border-green-500 bg-green-50 transition-all hover:shadow-md"
            >
                <Activity class="pl-4" :activity="dayActivity" :show-date="false" />
            </div>
        </template>
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
