<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('calendar') }}</h1>
        <div class>
            {{
                formattedMarathonDate ? $t('marathonDateInformations', { formattedMarathonDate }) : $t('noMarathonDate')
            }}
        </div>
        <div
            v-if="formattedMarathonDate"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
        >
            <TrainingDescription
                v-for="(training, date) in trainingSchedule"
                :training="training"
                :date="date"
                :key="date"
                class="bg-white rounded-lg shadow p-4 border-4"
                :style="getStyle(training.type)"
            />
        </div>
    </div>
</template>
<script setup>
import TrainingDescription from '@/components/TrainingDescription.vue';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';

const { formattedMarathonDate, trainingSchedule } = useProgram();
const { paces } = usePerformance();

const getStyle = (type) => ({ borderColor: paces.value[type].color });
</script>
