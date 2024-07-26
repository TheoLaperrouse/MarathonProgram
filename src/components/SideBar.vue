<template>
    <div :class="['menu min-h-screen bg-gray-800 text-white', isSidebarOpen ? 'min-w-[250px]' : 'min-w-[80px]']">
        <ul class="fixed ml-6 mt-4">
            <li class="py-4" v-for="(link, index) in menuLinks" :key="index">
                <router-link
                    :class="{ 'text-indigo-400': $route.path === link.to }"
                    :to="link.to"
                    class="flex items-center"
                >
                    <font-awesome-icon
                        :icon="link.icon"
                        v-tooltip="!isSidebarOpen ? link.text : ''"
                        class="mr-4 text-2xl"
                    />
                    <span v-if="isSidebarOpen" :title="link.text">{{ link.text }}</span>
                </router-link>
            </li>
            <li class="py-4">
                <a :href="githubLink" target="_blank" class="flex items-center">
                    <font-awesome-icon
                        :icon="faGithub"
                        v-tooltip="!isSidebarOpen ? 'Repo Github' : ''"
                        class="mr-4 text-2xl"
                    />
                    <span v-if="isSidebarOpen"> Repo Github </span>
                </a>
            </li>
        </ul>
        <div class="fixed bottom-0 left-4">
            <button @click="logout" class="absolute bottom-4 h-10 w-10 rounded-full bg-red-500 hover:bg-red-600">
                <font-awesome-icon :icon="faSignOutAlt" />
            </button>
        </div>
        <button
            @click="toggleSidebar"
            :class="[
                'absolute bottom-4 rounded-full border border-gray-600 bg-gray-800 p-2 text-white hover:bg-gray-700',
                isSidebarOpen ? 'left-[234px]' : 'left-[64px]',
            ]"
        >
            <font-awesome-icon :icon="isSidebarOpen ? faChevronLeft : faChevronRight" class="text-xl" />
        </button>
    </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faHome,
    faCalendar,
    faSignOutAlt,
    faStopwatch,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const router = useRouter();

const isSidebarOpen = useLocalStorage('isSidebarOpen', true);

const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

const menuLinks = [
    { to: '/', text: 'Accueil', icon: faHome },
    { to: '/daily-program', text: 'Programme du jour', icon: faStopwatch },
    { to: '/calendar', text: 'Calendrier', icon: faCalendar },
];

const githubLink = 'https://github.com/TheoLaperrouse/SportProgram';

const logout = () => router.push('/signin');
</script>
