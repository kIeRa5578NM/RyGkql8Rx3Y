// 代码生成时间: 2025-08-29 18:12:31
 * This utility formats API responses into a standardized structure.
 * @param {Object} rawData - The raw data from the API response.
 * @param {string} [status='success'] - The API response status.
 * @param {string} [message=''] - An optional message to include with the formatted response.
 * @return {Object} The formatted API response.
 */
function formatApiResponse(rawData, status = 'success', message = '') {
  // Check if rawData is an object
  if (typeof rawData !== 'object' || rawData === null) {
    throw new Error('Invalid rawData type. Expected an object.');
  }

  // Construct the standardized API response
  return {
    status: status,
    message: message,
    data: rawData
  };
}

/**
 * Error Handling Wrapper
 * This function provides a standardized way to handle errors and format them.
 * @param {Error} error - The error object to format.
 * @return {Object} The formatted error response.
 */
function formatErrorResponse(error) {
  // Log the error for debugging purposes
  console.error(error);

  // Construct the error response
  return {
    status: 'error',
    message: error.message,
    error: error.stack
  };
}

// Example usage:
try {
  const apiResponse = formatApiResponse({
    id: 1,
    name: 'John Doe'
  }, 'success', 'Data retrieved successfully.');
  console.log(apiResponse);

  const apiError = formatErrorResponse(new Error('Failed to retrieve data.'));
  console.error(apiError);
} catch (error) {
  // Handle any unexpected errors
  console.error('An unexpected error occurred:', error);
}
