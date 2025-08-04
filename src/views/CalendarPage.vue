<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold text-gray-800">{{ $t('calendar') }}</h1>
        <div
            class="mb-6 p-4 rounded-lg bg-blue-50 border-l-4 border-blue-500 text-gray-700"
            v-html="
                formattedMarathonDate
                    ? $t('marathonDateInformations', { formattedMarathonDate, formattedProgramDate })
                    : $t('noMarathonDate')
            "
        />
        <template v-if="formattedMarathonDate">
            <template v-for="(week, index) in weekTrainings" :key="index">
                <div class="flex items-center mb-4 mt-8">
                    <div class="w-3 h-8 rounded-md bg-gradient-to-b from-blue-500 to-purple-600 mr-3"></div>
                    <h2 class="text-2xl font-semibold text-gray-800">{{ $t('week') }} {{ index + 1 }}</h2>
                </div>
                <div :class="`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${trainingDays} gap-4`">
                    <TrainingDescription
                        v-for="(training, date) in week"
                        :key="date"
                        :training="training"
                        :date="date"
                        class="rounded-xl shadow-sm p-4 border-l-4 transition-all hover:shadow-md"
                        :class="{
                            'opacity-40': isTrainingMade(date),
                            'ring-2 ring-white': !isTrainingMade(date),
                        }"
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

const { paces } = usePerformance();
const { formattedMarathonDate, weekTrainings, trainingDays, formattedProgramDate, isTrainingMade } = useProgram();
const { hexToRGBA } = useFormatter();

const getStyle = (type) => {
    const color = paces.value[type].color;
    return {
        borderLeftColor: color,
        backgroundColor: hexToRGBA(color, 0.15),
    };
};
</script>
