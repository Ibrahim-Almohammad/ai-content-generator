"use client";
import { Button } from "@/components/ui/button";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        // Redirect to dashboard if user is logged in
        router.replace('/dashboard');
      } else {
        // Allow the page to load if the user is not logged in
        setLoading(false);
      }
    }
  }, [isLoaded, user, router]);

  if (loading) {
    // Optionally, show a loading spinner or a placeholder while the state is being determined
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-700">Loading...</span>
      </div>
    );
  }

  const handleGetStarted = () => {
    if (user) {
      router.replace('/dashboard');
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <div>
      <Head>
        <title>AI Content Generator</title>
        <meta name="description" content="Generate high-quality content with AI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Navbar */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6 flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-800">AI Content Generator</h1>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-blue-600 text-white text-center py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold">Generate Content Effortlessly</h2>
            <p className="mt-4 text-lg">Leverage the power of AI to create high-quality content in seconds.</p>
            <form className="mt-8">
              <button
                type="button"
                onClick={handleGetStarted}
                className="bg-yellow-500 text-gray-900 p-3 rounded-md font-bold hover:bg-yellow-400"
              >
                Get Started
              </button>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/3 p-4 text-center">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">AI-Powered Content</h3>
                  <p className="text-gray-600">Generate content quickly and efficiently using AI technology.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-4 text-center">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">SEO Optimization</h3>
                  <p className="text-gray-600">Ensure your content is optimized for search engines.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-4 text-center">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
                  <p className="text-gray-600">Easy-to-use interface designed for seamless content creation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-800 text-white py-10">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} AI Content Generator. All rights reserved.</p>
            <p className="mt-4">Contact us: support@aicontentgenerator.com</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
