<template>
    <button @click="loginWithStrava">
        <img src="../assets/img/connect_with_strava.svg" />
    </button>
</template>

<script setup>
import { useStrava } from '@/composables/useStrava';
import { onMounted } from 'vue';

const { handleAuthRedirect, loginWithStrava } = useStrava();

onMounted(() => {
    handleAuthRedirect();
});
</script>
