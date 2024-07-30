<template>
    <div class="p-6">
        <h1 class="mb-4 text-2xl font-bold">{{ $t('todayWorkout') }}</h1>
        <div v-if="todaySession" class="rounded bg-white p-4 shadow">
            <h2 class="text-xl font-semibold">{{ $t(todaySession.type) }}</h2>
            <p class="mt-2">{{ todaySession.description }}</p>
        </div>
        <div v-else class="text-red-500">
            {{ $t('noSession') }}
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const sessions = [
    {
        date: '2024-07-26',
        type: 'endurance',
        description: t('endurance'),
    },
    {
        date: '2024-07-27',
        type: 'threshold',
        description: t('treshold'),
    },
    {
        date: '2024-07-28',
        type: 'interval',
        description: t('interval'),
    },
];

const today = new Date().toISOString().split('T')[0];
const todaySession = computed(() => sessions.find((session) => session.date === today));
</script>
