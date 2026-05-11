import { setupGoogleStrategy } from "./src/utils/googleStratergy";
import { handleGoogleCallback } from "./src/controller/authController";

export const initialzeAuthUtility = (config: any) => {
  setupGoogleStrategy(config);
  return {
    handleCallback: handleGoogleCallback,
  };
};
