export const formatNumber = (number, length) => {
    return String(number).padStart(length, '0');
};

export const convertTimeToSeconds = (time) => {
    if (time.split(':').length === 2) {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds;
    } else if (time.split(':').length === 3) {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }
};

export const formatSecondsToMinutes = (seconds) => {
    const totalSeconds = Math.round(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${formatNumber(minutes, 2)}:${formatNumber(remainingSeconds, 2)}`;
};
