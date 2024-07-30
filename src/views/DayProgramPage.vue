<template>
    <div class="p-6">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('dayProgram') }}</h1>
        <h1 class="mb-4 text-2xl font-bold">{{ $t('todayWorkout') }}</h1>
        <TrainingDescription :training="dayTraining" />
    </div>
</template>

<script setup>
import TrainingDescription from '@/components/TrainingDescription.vue';
import { useProgram } from '@/composables/useProgram';

const { dayTraining } = useProgram();
</script>
