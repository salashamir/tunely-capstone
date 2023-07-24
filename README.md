### Tunely

Capstone project.

Deployed at: https://tunely-capstone.vercel.app/

Web application for uploading mp3 files and curating your own favorites list of music. All users have access to the library of all songs uploaded by everyone from the main dashboard upon login. From there, you can find your own uploaded files on the sidebar.

Inlcudes fully functional player that will cycle through tracks in order based on where they are on the grid.

Features implemented were email/pw login and authentication with supabase auth, toasts for specific user tasks (liking and unliking tracks), uploading image files and mp3s, and allowing seamless playback of continuous tracks which will loop back to the first one upon finishing.

Standard user flow of the site is signing in or creating an account and then uploading your own mp3 files to curate your playlists. Then, also favoriting and searching for songs uploaded by others.

Technology stack:
Next, Typescript, Tailwind, supabase db/storage/auth

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
