import config from '../../packages/tailwind-config/tailwind.config';

const tailwindConfig = {
  content: [
    // Include your project files here
    // For example: './src/**/*.html',
    // Add Next UI theme files path
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  // Export config
  config: config,
};

export default tailwindConfig;
