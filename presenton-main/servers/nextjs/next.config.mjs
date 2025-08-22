
const nextConfig = {
  reactStrictMode: false,
  distDir: ".next-build",
  
  // Environment detection for cloud deployment
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Rewrites for development and production
  async rewrites() {
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      // In production, proxy API calls to the FastAPI backend
      return [
        {
          source: '/api/v1/:path*',
          destination: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/v1/:path*`,
        },
        {
          source: '/app_data/fonts/:path*',
          destination: `${process.env.BACKEND_URL || 'http://localhost:8000'}/app_data/fonts/:path*`,
        },
      ];
    } else {
      // In development, proxy to local FastAPI server
      return [
        {
          source: '/app_data/fonts/:path*',
          destination: 'http://localhost:8000/app_data/fonts/:path*',
        },
        {
          source: '/api/v1/:path*',
          destination: 'http://localhost:8000/api/v1/:path*',
        },
      ];
    }
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-7c765f3726084c52bcd5d180d51f1255.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pptgen-public.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pptgen-public.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "present-for-me.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "yefhrkuqbjcblofdcpnr.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
    ],
  },
  
  // Output configuration for static export if needed
  output: 'standalone',
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
