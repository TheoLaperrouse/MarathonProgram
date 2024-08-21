<template>
    <div>
        <h1 class="text-2xl font-bold mb-2">{{ activityName }} {{ $t('at') }} {{ activityStartTime }}</h1>
        <span></span>
        <div>
            <p>
                <strong>{{ $t('time') }}:</strong> {{ activityTime }}
            </p>
            <p>
                <strong>{{ $t('distance') }}:</strong> {{ activityDistance }} km
            </p>
            <p>
                <strong>{{ $t('pace') }}:</strong> {{ activityAveragePace }} /km
            </p>
            <p v-if="showDate">
                <strong>{{ $t('date') }}:</strong> {{ activityDate }}
            </p>
            <div v-if="activity.laps && activity.laps.length">
                <h3 class="text-lg font-medium mt-4">{{ $t('laps') }}</h3>
                <ul class="list-disc list-inside">
                    <li v-for="(lap, index) in activity.laps" :key="index">
                        {{ $t('lap') }} {{ index + 1 }}: {{ lap.distance }} km {{ $t('in') }} {{ lap.time }}
                        {{ $t('at') }} {{ formatSecondsToMinutes(lap.ellapsedTime) }} /km
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFormatter } from '@/composables/useFormatter';
import { useStravaActivity } from '@/composables/useStravaActivity';
import { toRefs } from 'vue';

const props = defineProps({
    activity: Object,
    showDate: Boolean,
});
const { formatSecondsToMinutes } = useFormatter();
const { activity, showDate } = toRefs(props);
const { activityName, activityTime, activityAveragePace, activityDistance, activityDate, activityStartTime } =
    useStravaActivity(activity);
</script>
