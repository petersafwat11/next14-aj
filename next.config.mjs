/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.cache = false;
  //   }
  //   return config;
  // },

  env: {
    FRONTEND_SERVER: "http://localhost:3000",
    BACKEND_SERVER: "http://localhost:5000/api",
    STATIC_SERVER: "http://localhost:5000",
    // FRONTEND_SERVER: "https://ajsports.ch",
    // BACKEND_SERVER: "https://ajsports.ch/api",
    // STATIC_SERVER: "https://ajsports.ch",
    NEXT_PUBLIC_MEASUREMENT_ID: "G-Y22CVP987D",
  },
  generateBuildId: async () => {
    return "f134160";
  },

  images: {
    domains: [
      "localhost",
      "media-4.api-sports.io",
      "lh3.googleusercontent.com",
      "al-backend-tle9.onrender.com",
      "media.tenor.com",
      "media.api-sports.io",
      "ajsports.ch",
      "www.ajsports.ch",
    ],
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //     port: "8000",
    //     pathname: "*",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "media-4.api-sports.io",
    //     port: "",
    //     pathname: "/*",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "lh3.googleusercontent.com",
    //     port: "",
    //     pathname: "/*",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "media.tenor.com",
    //     port: "",
    //     pathname: "/*",
    //   },
    // ],
  },
};

export default nextConfig;
