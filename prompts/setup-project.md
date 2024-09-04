
# Full Project Setup Instructions

Use this guide to setup the backend for this project.

It uses TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI, Supabase, and Tailwind CSS.

Write the complete code for every step. Do not get lazy. Write everything that is needed.

Your goal is to completely finish the setup.

## Project Initialization

### 1. Create a New Next.js App

Start by creating a new Next.js project with TypeScript, Tailwind CSS, and ESLint pre-configured:

```bash
npx create-next-app@latest music-editor --typescript --tailwind --eslint
cd music-editor
```

## Install Dependencies

### 3. Install Core Libraries

```bash
npm install @supabase/supabase-js @shadcn/ui @radix-ui/react framer-motion typescript
```

### 4. Install Additional Dependencies

```bash
npm install lucide-react
```

## Configure and Setup

### 5. Configure Tailwind CSS

Set up Tailwind CSS by configuring the `tailwind.config.js` file and importing the necessary styles in `globals.css`:

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Import Tailwind styles in `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. Set Up Supabase

Configure Supabase by initializing the client in `/lib/supabaseClient.ts`:

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Backend Development

### 7. Implement a Basic API Route

Create a simple API route using the Next.js App Router. This route will fetch data from Supabase using the SDK:

```ts
// pages/api/get-data.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabase
    .from('your_table_name')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}
```

## Frontend Development

### 8. Setup Shadcn UI, Radix UI, and Additional Components

Integrate Shadcn UI, Radix UI, and additional components relevant to your DJ editor app. Here’s an example of a waveform display component:

```ts
// components/waveform-display/WaveformDisplay.tsx

import { FC } from 'react';

interface WaveformDisplayProps {
  trackData: any; // Replace with actual data type
}

export const WaveformDisplay: FC<WaveformDisplayProps> = ({ trackData }) => {
  return (
    <div className="waveform-container">
      {/* Implement waveform rendering logic here */}
      <p>Waveform for the track goes here.</p>
    </div>
  );
};
```

### 9. Implement Responsive Design

Use Tailwind CSS to implement a mobile-first responsive design. Below is an example of a responsive card component:

```ts
// components/card/Card.tsx

import { FC } from 'react';

export const Card: FC = () => {
  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">Card Title</p>
          <p className="text-gray-500 font-medium">Card description goes here.</p>
        </div>
        <button className="px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-600 hover:text-white hover:bg-blue-600">Action</button>
      </div>
    </div>
  );
};
```

## Performance Optimization

### 10. Optimize Performance

Apply performance optimization practices:

- **Minimize** the use of `useEffect` and `setState`; prefer React Server Components where possible.
- **Wrap** client components in `Suspense` with a fallback.
- **Dynamically load** non-critical components using Next.js dynamic imports:

```ts
// pages/index.tsx

import dynamic from 'next/dynamic';
const MyButton = dynamic(() => import('../components/button/Button'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <MyButton isLoading={false} onClick={() => alert('Clicked!')} />
    </div>
  );
}
```

### 11. Web Vitals Optimization

Configure the app to optimize Web Vitals (LCP, CLS, FID) by leveraging server-side rendering (SSR) and React Server Components where possible.

## Deployment

### 12. Deploy the Application

Deploy your application using Vercel. Ensure that all environment variables and configurations are set up correctly in the Vercel dashboard:

```bash
vercel
```

## Conclusion

This comprehensive setup guide provides a clear path to fully configure both the frontend and backend for your DJ editor app. By following these steps, you’ll ensure that your application is consistent, optimized, and aligned with best practices across the entire stack. For any additional guidance, refer to the helpful links provided at the beginning of this document.
