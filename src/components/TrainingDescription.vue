<template>
    <div>
        <div v-if="!training">{{ $t('noTraining') }}</div>
        <div v-else></div>
    </div>
</template>
<script setup>
defineProps({
    training: Object,
});
</script>
