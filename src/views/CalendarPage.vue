<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('calendar') }}</h1>
        <div class>
            {{
                formattedMarathonDate ? $t('marathonDateInformations', { formattedMarathonDate }) : $t('noMarathonDate')
            }}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <TrainingDescription
                v-for="(training, date) in trainingSchedule"
                :training="training"
                :date="date"
                :key="date"
                class="bg-white border border-gray-200 rounded-lg shadow p-4"
            />
        </div>
    </div>
</template>
<script setup>
import TrainingDescription from '@/components/TrainingDescription.vue';
import { useProgram } from '@/composables/useProgram';
import { computed } from 'vue';

const { formattedMarathonDate, generateTrainingSchedule } = useProgram();
const trainingSchedule = computed(() => generateTrainingSchedule(Date.now()));
</script>
