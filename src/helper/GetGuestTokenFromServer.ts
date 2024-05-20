import { AUTH_URL_V1, BASE_API_URL } from "@/config";
import { basic } from "@/store/apiSlices/auth/authApi";
import { GetGuestTokenConfig } from "@/store/types";
import platform from "platform";
  
export const getGuesTokenFromServer = () => {
  const getGuestTokenConfig: GetGuestTokenConfig = {
    deviceId: "web_app",
    deviceMake: platform.name as string,
    deviceModel: platform.version as string,
    deviceTypeCode: 3,
    deviceOs: platform?.os?.family as string + "-" + platform?.os?.version as string,
    appVersion: "v1",
    browserVersion: platform.version as string,
  };
  return fetch(`${BASE_API_URL + AUTH_URL_V1}/guestLogin`, {
    method: 'POST',
    headers: {
      'Authorization': `${basic}`,
      'Content-Type': 'application/json',
      'lan': 'en',
      'platform': "3",
    },
    body: JSON.stringify(getGuestTokenConfig), // Pass the request body as JSON
  })
  .then(response => {
    if (!response.ok) {
      // If the response is not OK, throw an error
      throw new Error('Network response was not ok.');
    }
    if(typeof response == "object"){
      return response.json();
    }else{
      return response
    }
    // Return the response
  })
  .catch(error => {
    // Catch any errors that occur during the request
    console.error('Error:', error);
    throw error; // Rethrow the error so it can be caught by the caller
  });
}