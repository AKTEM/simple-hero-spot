import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WorldNews } from '@/components/world-news';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  getAfricaNews,
  getAmericasNews,
  getAustraliaNews,
  getAsiaNews,
  getEuropeNews,
  getUKNews
} from '@/lib/wordpress';

// ISR: Revalidate every 10 minutes
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Education - The Maple Epoch',
  description: 'Explore educational opportunities, study abroad programs, academic insights, and learning resources from institutions worldwide.',
  alternates: {
    canonical: 'https://www.mapleepoch.com/world',
  },
  openGraph: {
    title: 'Education - The Maple Epoch',
    description: 'Explore educational opportunities, study abroad programs, academic insights, and learning resources from institutions worldwide.',
    url: 'https://www.mapleepoch.com/world',
    siteName: 'The Maple Epoch',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education - The Maple Epoch',
    description: 'Explore educational opportunities, study abroad programs, academic insights, and learning resources from institutions worldwide.',
  },
};

async function getWorldData() {
  try {
    const [
      africaNews,
      americasNews,
      australiaNews,
      asiaNews,
      europeNews,
      ukNews
    ] = await Promise.allSettled([
      getAfricaNews(3),
      getAmericasNews(3),
      getAustraliaNews(3),
      getAsiaNews(3),
      getEuropeNews(3),
      getUKNews(3)
    ]);

    return {
      africaNews: africaNews.status === 'fulfilled' ? africaNews.value : [],
      americasNews: americasNews.status === 'fulfilled' ? americasNews.value : [],
      australiaNews: australiaNews.status === 'fulfilled' ? australiaNews.value : [],
      asiaNews: asiaNews.status === 'fulfilled' ? asiaNews.value : [],
      europeNews: europeNews.status === 'fulfilled' ? europeNews.value : [],
      ukNews: ukNews.status === 'fulfilled' ? ukNews.value : []
    };
  } catch (error) {
    console.error('Error fetching education data:', error);
    return {
      africaNews: [],
      americasNews: [],
      australiaNews: [],
      asiaNews: [],
      europeNews: [],
      ukNews: []
    };
  }
}

export default async function WorldPage() {
  const data = await getWorldData();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-32">
        {/* Breadcrumb */}
        <div className="bg-gray-50 dark:bg-gray-800 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white">Education</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Education</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Explore educational opportunities, study abroad programs, academic insights,
                and learning resources from institutions worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* World News Content */}
        <div className="container mx-auto px-4 py-12">
          <WorldNews 
            africaArticle={data.africaNews[0] || null}
            americasArticle={data.americasNews[0] || null}
            australiaArticle={data.australiaNews[0] || null}
            asiaArticle={data.asiaNews[0] || null}
            europeArticle={data.europeNews[0] || null}
            ukArticle={data.ukNews[0] || null}
           allArticles={{
             africaNews: Array.isArray(data.africaNews) ? data.africaNews : [],
             americasNews: Array.isArray(data.americasNews) ? data.americasNews : [],
             australiaNews: Array.isArray(data.australiaNews) ? data.australiaNews : [],
             asiaNews: Array.isArray(data.asiaNews) ? data.asiaNews : [],
             europeNews: Array.isArray(data.europeNews) ? data.europeNews : [],
             ukNews: Array.isArray(data.ukNews) ? data.ukNews : [],
             canadaNews: []
           }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}