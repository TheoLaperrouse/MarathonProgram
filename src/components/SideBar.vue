<template>
    <div class="menu bg-gray-800 text-white min-h-screen">
        <ul class="fixed list-none p-0 mt-4">
            <li class="py-4 ml-6" v-for="(link, index) in menuLinks" :key="index">
                <router-link
                    :class="{ 'text-indigo-400': $route.path === link.to }"
                    :to="link.to"
                    class="flex items-center"
                >
                    <font-awesome-icon :icon="link.icon" class="mr-2" />
                    <span :title="link.text">{{ link.text }}</span>
                </router-link>
            </li>
            <li class="py-4 ml-6 pt-4">
                <a :href="githubLink" target="_blank" class="flex items-center">
                    <font-awesome-icon :icon="faGithub" class="mr-2" />
                    <span> Repo Github </span>
                </a>
            </li>
        </ul>
        <div class="fixed bottom-0 left-4">
            <button
                @click="logout"
                class="absolute bottom-4 w-10 h-10 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none"
            >
                <font-awesome-icon :icon="faSignOutAlt" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHome, faCalendar, faSignOutAlt, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const router = useRouter();

const menuLinks = [
    { to: '/', text: 'Accueil', icon: faHome },
    { to: '/program', text: 'Programme du jour', icon: faStopwatch },
    { to: '/calendar', text: 'Calendrier', icon: faCalendar },
];

const githubLink = 'https://github.com/TheoLaperrouse/SportProgram';

const logout = () => router.push('/signin');
</script>
