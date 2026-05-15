import { GoogleAuthButton } from "../components/AuthButton";

export default function GoogleAuthRegistry() {
  return {
    name: "Google Auth Button",
    description: "A button component for Google authentication",
    component: GoogleAuthButton,
    props: {
      onClick: () => {
        // Placeholder function to be replaced with actual Google Auth implementation
        console.log("Google Auth button clicked - implement your Google Auth logic here");
      }
    }
  };
}