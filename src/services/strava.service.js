/**
 * Retrieve activities of the authenticated athlete from the Strava API.
 *
 * @param {string} accessToken - The access token for authentication
 * @return {Object} - The athlete's data from Strava
 * @throws {Error} - If the fetch operation fails
 */
export async function getAthleteData(accessToken) {
    try {
        const response = await fetch('https://www.strava.com/api/v3/athlete', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch athlete data: ${error.message}`);
    }
}

/**
 * Retrieve activities of the authenticated athlete from the Strava API.
 *
 * @param {string} accessToken - The access token for authentication
 * @param {Object} [params] - Optional parameters for filtering activities
 * @param {string} [params.before] - An epoch timestamp to use for filtering activities that occurred before a certain time.
 * @param {string} [params.after] - An epoch timestamp to use for filtering activities that occurred after a certain time.
 * @param {number} [params.page] - Page number.
 * @param {number} [params.per_page] - Number of items per page (default is 30).
 * @return {Promise<Object[]>} - The activities data from Strava
 * @throws {Error} - If the fetch operation fails
 */
export async function getActivities(accessToken, params = {}) {
    const url = new URL('https://www.strava.com/api/v3/athlete/activities');

    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch activities: ${error.message}`);
    }
}
