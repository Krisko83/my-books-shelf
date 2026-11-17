/**
 * Extracts a human-readable error message (always a string) from an error.
 * Handles Axios errors (incl. Supabase response shapes) and plain errors.
 *
 * @param {unknown} error
 * @param {string} [fallback]
 * @returns {string}
 */
export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
    if (!error) {
        return fallback;
    }

    if (typeof error === 'string') {
        return error;
    }

    // Server responded with an error status (4xx / 5xx)
    const data = error.response?.data;

    if (data) {
        if (typeof data === 'string') {
            return data;
        }

        const message =
            data.msg ||
            data.error_description ||
            data.message ||
            data.error;

        if (message) {
            return String(message);
        }
    }

    // Request was sent but no response came back (network / timeout)
    if (error.request && !error.response) {
        return 'Network error. Please check your connection.';
    }

    return error.message ? String(error.message) : fallback;
}
