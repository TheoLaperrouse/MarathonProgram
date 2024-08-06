<template>
    <div id="app" class="flex">
        <SideBar />
        <router-view class="flex-auto" :class="isSidebarOpen ? 'ml-[225px]' : 'ml-[80px]'" />
    </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
import { useLocalStorage } from '@vueuse/core';

const isSidebarOpen = useLocalStorage('isSidebarOpen', true);
</script>
