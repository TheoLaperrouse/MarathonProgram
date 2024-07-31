<template>
    <div class="mt-4 ml-4">
        <h1 class="mb-4 text-3xl font-bold">{{ $t('calendar') }}</h1>
        <div class>{{ $t('marathonDateInformations', { formattedMarathonDate }) }}</div>
    </div>
</template>
<script setup>
import { useProgram } from '@/composables/useProgram';

const { formattedMarathonDate } = useProgram();
</script>
