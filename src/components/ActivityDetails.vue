<template>
    <div>
        <div class="w-3 h-3 rounded-full bg-green-500 mr-3" />
        <h1 class="text-xl font-bold mb-2">
            {{ activityName }}<span v-if="!showDate"> {{ $t('at') }} {{ activityStartTime }}</span>
        </h1>
        <div>
            <p v-if="showDate">
                <strong>{{ $t('date') }}:</strong> {{ activityDate }}
            </p>
            <p>
                <strong>{{ $t('time') }}:</strong> {{ activityTime }}
            </p>
            <p>
                <strong>{{ $t('distance') }}:</strong> {{ activityDistance }} km
            </p>
            <p>
                <strong>{{ $t('pace') }}:</strong> {{ activityAveragePace }} /km
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
import { useStravaActivity } from '@/composables/useStrava';
import { toRefs } from 'vue';

const props = defineProps({
    activity: Object,
    showDate: { type: Boolean, default: true },
});
const { formatSecondsToMinutes } = useFormatter();

const { activity, showDate } = toRefs(props);
const { activityName, activityTime, activityAveragePace, activityDistance, activityDate, activityStartTime } =
    useStravaActivity(activity);
</script>
