<template>
    <div id="app" class="flex min-h-screen">
        <SideBar />
        <main class="flex-grow transition-all duration-300 ease-in-out" :class="isSidebarOpen ? 'ml-64' : 'ml-20'">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue';
import { useLocalStorage } from '@vueuse/core';

const isSidebarOpen = useLocalStorage('isSidebarOpen', true);
</script>
