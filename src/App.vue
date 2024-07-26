<template>
    <div id="app" class="flex">
        <SideBar />
        <div class="fixed right-4 top-4">
            <LanguageSelect />
        </div>
        <router-view class="flex-auto" />
    </div>
</template>

<script setup>
import LanguageSelect from '@/components/LanguageSelect.vue';
import SideBar from './components/SideBar.vue';
</script>
