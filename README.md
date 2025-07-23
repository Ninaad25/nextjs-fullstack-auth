# Next.js Fullstack Authentication App

This is a fullstack Next.js authentication application with user registration, login, password reset, and email verification features.

## Tech Stack
- Nextjs
- Typescript
- Mongodb
- Mailtrap

## Live Demo
🌐 **Live App**: https://auth-nextjs-ourtube-ninaad-mhadalkars-projects.vercel.app

## Features
- User Registration & Login
- Email Verification
- Password Reset via Email
- Protected Routes
- MongoDB Database Integration
- Responsive UI with Starfield Background

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This app is deployed on Vercel with automatic deployments enabled. Any changes pushed to the `main` branch will automatically trigger a new deployment.

### Manual Deployment
If needed, you can also deploy manually:
```bash
npx vercel --prod
```

## Environment Variables
Make sure to set up the following environment variables in Vercel:
- `MONGO_URI`: MongoDB connection string
- `TOKEN_SECRET`: JWT token secret
- `DOMAIN`: Your domain URL
