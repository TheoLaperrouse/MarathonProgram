<template>
    <div class="p-4">
        <h1 class="mb-2 text-3xl font-bold">{{ $t('calendar') }}</h1>
        <div
            v-html="
                formattedMarathonDate
                    ? $t('marathonDateInformations', { formattedMarathonDate, formattedProgramDate })
                    : $t('noMarathonDate')
            "
        ></div>
        <template v-if="formattedMarathonDate">
            <template v-for="(week, index) in weekTrainings" :key="index">
                <h2 class="text-2xl font-semibold mb-2 mt-4">{{ $t('week') }} {{ index + 1 }}</h2>
                <div :class="`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${trainingDays} gap-4`">
                    <TrainingDescription
                        v-for="(training, date) in week"
                        :key="date"
                        :training="training"
                        :date="date"
                        class="rounded-lg shadow p-4 border-2"
                        :style="getStyle(training.type, date)"
                    />
                </div>
            </template>
        </template>
    </div>
</template>
<script setup>
import TrainingDescription from '@/components/TrainingDescription.vue';
import { useFormatter } from '@/composables/useFormatter';
import { usePerformance } from '@/composables/usePerformance';
import { useProgram } from '@/composables/useProgram';

const { formattedMarathonDate, weekTrainings, trainingDays, formattedProgramDate, isTrainingMade } = useProgram();
const { paces } = usePerformance();
const { hexToRGBA } = useFormatter();

const getStyle = (type, date) => {
    const borderColor = paces.value[type].color;
    return { borderColor, backgroundColor: isTrainingMade(date) ? hexToRGBA(borderColor, 0.2) : undefined };
};
</script>
