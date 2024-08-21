/**
 * Send a training to garmin
 *
 * @param {string} accessToken
 * @param {Object} workoutData
 * @return {Promise<Object>}
 * @throws {Error}
 */
export async function sendWorkout(accessToken, workoutData) {
    const url = 'https://api.garmin.com/your-endpoint';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workoutData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to send workout: ${error.message}`);
    }
}
