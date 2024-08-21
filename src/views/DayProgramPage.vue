<template>
    <div class="p-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('dayProgram') }}</h1>
        <h1 class="mb-4 text-2xl font-bold">{{ $t('todayWorkout') }} : {{ humanizeDate(Date.now()) }}</h1>
        <TrainingDescription class="mb-4" :training="dayTraining" />
        <div v-if="dayActivity">
            <h1 class="mb-4 text-2xl font-bold">{{ $t('dayActivitySummary') }}</h1>
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
