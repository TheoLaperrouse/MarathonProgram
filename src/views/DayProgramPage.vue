<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('dayProgram') }}</h1>
        <div class="card border-blue-500">
            <h2 class="mb-4 text-2xl font-bold text-blue-800">
                {{ $t('todayWorkout') }} : {{ humanizeDate(Date.now()) }}
            </h2>
            <TrainingDescription class="mb-8" :training="dayTraining" />
        </div>

        <div v-if="dayActivity" class="card border-green-500">
            <h2 class="mb-4 text-2xl font-bold text-green-800">{{ $t('dayActivitySummary') }}</h2>
            <Activity :showDate="false" :activity="dayActivity" />
        </div>
    </div>
</template>

<script setup>
import Activity from '@/components/ActivityDetails.vue';
import TrainingDescription from '@/components/TrainingDescription.vue';
import { useFormatter } from '@/composables/useFormatter';
import { useProgram } from '@/composables/useProgram';
import { useStrava } from '@/composables/useStrava';

const { humanizeDate } = useFormatter();

const { dayActivity } = useStrava();
const { dayTraining } = useProgram();
</script>
