// utils/response.ts

interface ResponseFormat<T> {
  status: number;
  success: boolean;
  message: string;
  data: T | null;
}

/**
 * Create a standard response format
 * @param {number} status - The HTTP status code
 * @param {boolean} success - Indicates the success of the request
 * @param {string} message - A message describing the result
 * @param {T} [data] - The data to include in the response
 * @returns {ResponseFormat<T>} - The formatted response object
 */
export function createResponse<T>(
  message: string,
  data: T | null = null,
): ResponseFormat<T> {
  return {
    status: 200,
    success: true,
    data,
    message,
  };
}
