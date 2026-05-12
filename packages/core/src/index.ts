import { setupGoogleStrategy } from "./utils/googleStratergy.js";
import { handleGoogleCallback } from "./controller/authController.js";

export const initialzeAuthUtility = (config: any) => {
  setupGoogleStrategy(config);
  return {
    handleCallback: handleGoogleCallback,
  };
};
