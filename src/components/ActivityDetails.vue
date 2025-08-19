<template>
    <div>
        <h1 class="text-xl font-bold flex items-center">
            <span class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: badgeColor }" />
            <span ref="nameEl" class="truncate" v-tooltip="isTruncated ? activityName : null">
                {{ activityName }}
                <span v-if="!showDate"> {{ $t('at') }} {{ activityStartTime }}</span>
            </span>
        </h1>
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
    </div>
</template>

<script setup>
import { useStravaActivity } from '@/composables/useStrava';
import { toRefs, ref, onMounted, nextTick } from 'vue';

const props = defineProps({
    activity: Object,
    badgeColor: String,
    showDate: { type: Boolean, default: true },
});

const { activity, showDate } = toRefs(props);

const { activityName, activityTime, activityAveragePace, activityDistance, activityDate, activityStartTime } =
    useStravaActivity(activity);

const nameEl = ref(null);
const isTruncated = ref(false);

onMounted(async () => {
    await nextTick();
    if (nameEl.value) {
        isTruncated.value = nameEl.value.scrollWidth > nameEl.value.clientWidth;
    }
});
</script>
