<template>
    <div id="app" class="flex">
        <SideBar />
        <router-view class="flex-auto" />
    </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
</script>
