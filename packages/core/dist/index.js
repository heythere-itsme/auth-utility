import { setupGoogleStrategy } from "./utils/googleStratergy.js";
import { handleGoogleCallback } from "./controller/authController.js";
export const initialzeAuthUtility = (config) => {
    setupGoogleStrategy(config);
    return {
        handleCallback: handleGoogleCallback,
    };
};
//# sourceMappingURL=index.js.map