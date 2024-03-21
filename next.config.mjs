/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.beta.smat.io',
      },
      {
        protocol: 'https',
        hostname: 'minio.stage.smat.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  compiler: {
    // Automatically remove console.* other than 'error' & 'info' in production,
    ...(process.env.NODE_ENV !== 'development' && {
      removeConsole: {
        exclude: ['log', 'debug'],
      },
    }),
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader',
    });
    if (process.env.NODE_ENV === 'production') {
      config.resolve.alias.canvas = false;
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false,
      mongodb$: false,
    };
    return config;
  },
  // Use Rust base compiler 7x faster https://nextjs.org/docs/messages/swc-minify-enabled
  swcMinify: true,
  env: {
    NEXT_PUBLIC_VERCEL_URL: `${
      process.env.NOE_ENV === 'development' ? 'http://' : 'https://'
    }${process.env.VERCEL_URL}`,
  },
};

export default nextConfig;
