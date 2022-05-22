/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    NEXTAUTH_URL:'https://royer.store/'
  },
  images:{
    domains:['res.cloudinary.com','localhost'],
  }
}

module.exports = nextConfig
