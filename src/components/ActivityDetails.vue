<template>
    <div>
        <h1 class="text-xl font-bold mb-2">{{ activityName }} {{ $t('at') }} {{ activityStartTime }}</h1>
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
            <div class="flex mt-2 items-center">
                <h3 class="mr-2">{{ $t('validateTraining') }}</h3>
                <input
                    class="w-5 h-5"
                    type="checkbox"
                    :checked="isTrainingMade(date)"
                    @change="updateMadeTrainings(date)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFormatter } from '@/composables/useFormatter';
import { useProgram } from '@/composables/useProgram';
import { useStravaActivity } from '@/composables/useStrava';
import { parseISO, format } from 'date-fns';
import { toRefs, computed } from 'vue';

const props = defineProps({
    activity: Object,
    showDate: Boolean,
});
const { formatSecondsToMinutes } = useFormatter();
const { isTrainingMade, updateMadeTrainings } = useProgram();

const { activity, showDate } = toRefs(props);

const { activityName, activityTime, activityAveragePace, activityDistance, activityDate, activityStartTime } =
    useStravaActivity(activity);

const date = computed(() => {
    const dateISO = parseISO(activity.value.start_date_local);
    return format(dateISO, 'dd/MM/yyyy');
});
</script>
