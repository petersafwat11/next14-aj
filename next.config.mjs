/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // FRONTEND_SERVER: "http://localhost:3000",
    // BACKEND_SERVER: "https://al-backend-tle9.onrender.com/api",
    // STATIC_SERVER: "https://al-backend-tle9.onrender.com",

    FRONTEND_SERVER: "http://localhost:3000",
    BACKEND_SERVER: "http://localhost:8000/api",
    STATIC_SERVER: "http://localhost:8000",
  },
  images: {
    domains: [
      "localhost",
      "media-4.api-sports.io",
      "lh3.googleusercontent.com",
      "media.tenor.com",
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
