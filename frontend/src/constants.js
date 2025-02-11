export const ACCESS_TOKEN = "access_token"
export const REFRESH_TOKEN = "refresh_token"

// Storing tokens in localStorage (key-value pair)
localStorage.setItem(ACCESS_TOKEN, 'access_token_value');
localStorage.setItem(REFRESH_TOKEN, 'refresh_token_value');

// Retrieving tokens from localStorage using constants (keys)
const accessToken = localStorage.getItem(ACCESS_TOKEN);  // 'access_token_value'
const refreshToken = localStorage.getItem(REFRESH_TOKEN);  // 'refresh_token_value'
