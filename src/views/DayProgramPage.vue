<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('dayProgram') }}</h1>
        <h1 class="mb-4 text-2xl font-bold">{{ $t('todayWorkout') }} : {{ humanizeDate(Date.now()) }}</h1>
        <TrainingDescription :training="dayTraining" />
    </div>
</template>

<script setup>
import TrainingDescription from '@/components/TrainingDescription.vue';
import { useFormatter } from '@/composables/useFormatter';
import { useProgram } from '@/composables/useProgram';

const { humanizeDate } = useFormatter();
const { dayTraining } = useProgram();
</script>
