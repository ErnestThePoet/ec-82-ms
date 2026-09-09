/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,   // 可删，新版本默认开启

  // ========== 关键：开启静态导出 ==========
  output: 'export',

  // ========== 子路径部署（匹配你的仓库名） ==========
  basePath: "/ec-82-ms",
  assetPrefix: "/ec-82-ms",

  // ========== 关闭图片优化 ==========
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig