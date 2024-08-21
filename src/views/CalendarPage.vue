<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('calendar') }}</h1>
        <div
            v-html="
                formattedMarathonDate
                    ? $t('marathonDateInformations', { formattedMarathonDate, formattedProgramDate })
                    : $t('noMarathonDate')
            "
        ></div>
        <div
            v-if="formattedMarathonDate"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
        >
            <TrainingDescription
                v-for="(training, date) in trainingSchedule"
                :training="training"
                :date="date"
                :key="date"
                class="rounded-lg shadow p-4 border-2"
                :style="getStyle(training.type, date)"
            />
        </div>
    </div>
</template>
<script setup>
import TrainingDescription from '@/components/TrainingDescription.vue';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';

const { formattedMarathonDate, trainingSchedule, formattedProgramDate, isTrainingMade } = useProgram();
const { paces } = usePerformance();

const hexToRGBA = (color, opacity) => {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);
    return `rgba(${red},${green},${blue},${opacity})`;
};

const getStyle = (type, date) => {
    const borderColor = paces.value[type].color;
    return { borderColor, backgroundColor: isTrainingMade(date) ? hexToRGBA(borderColor, 0.2) : undefined };
};
</script>
