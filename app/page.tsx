import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { LatestHeadlines } from '@/components/latest-headlines';
import { EditorsPicks } from '@/components/editors-picks';
import { VibesNCruise } from '@/components/vibes-n-cruise';
import { JapaRoutes } from '@/components/japa-routes';
import { LifeAfterJapa } from '@/components/life-after-japa';
import { HealthHub } from '@/components/health-hub';
import { TechGadget } from '@/components/tech-gadget';
import { SportsHub } from '@/components/sports-hub';
import { BusinessEconomy } from '@/components/business-economy';
import { Education } from '@/components/education';
import { Finance } from '@/components/finance';
import { Footer } from '@/components/footer';
import { 
  getLatestHeadlines,
  getEditorsPicks,
  getDailyMaple,
  getBookNook,
  getMapleTravel,
  getPosts,
  transformPost,
  getPostsByCategory,
  getAfricaNews,
  getAmericasNews,
  getAustraliaNews,
  getAsiaNews,
  getEuropeNews,
  getUKNews,
  getCanadaNews,
  TransformedPost
} from '@/lib/wordpress';
import { getHomepageYoastSEO, yoastToNextMetadata } from '@/lib/yoast-seo';
import { Metadata } from 'next';

// ISR: Revalidate every 15 minutes (900 seconds)
// Increased from 10 minutes to reduce backend load
export const revalidate = 900;

// Generate metadata using Yoast SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const yoastData = await getHomepageYoastSEO();
    return yoastToNextMetadata(
      yoastData,
      'EmyTrends - Breaking News & Latest Updates',
      'Stay informed with real-time coverage of breaking news, politics, business, technology, health, sports, and entertainment.'
    );
  } catch (error) {
    console.error('Error generating homepage metadata:', error);
    return yoastToNextMetadata(null);
  }
}

async function getHomePageData() {
  try {
    // OPTIMIZED: Sequential batched fetching to prevent overwhelming WordPress backend
    // Reduced post limits from 20 to 10 per category
    
    // Batch 1: Critical above-the-fold content (hero + headlines)
    const [latestHeadlines, heroArticles] = await Promise.all([
      getLatestHeadlines(5),
      getPosts({ per_page: 9, _embed: true }).then(posts => posts.map(transformPost).filter(Boolean)),
    ]);

    // Batch 2: Primary sections
    const [editorsPicks, businessEconomy, japaRoutes, lifeAfterJapa] = await Promise.all([
      getEditorsPicks(6),
      getDailyMaple(10),
      getPostsByCategory('japa-routes', 10).then(posts => posts.map(transformPost).filter(Boolean)),
      getPostsByCategory('life-after-japa', 10).then(posts => posts.map(transformPost).filter(Boolean)),
    ]);

    // Batch 3: Secondary sections
    const [healthHub, techGadget, sportsHub, vibesNCruise] = await Promise.all([
      getPostsByCategory('health', 10).then(posts => posts.map(transformPost).filter(Boolean)),
      getPostsByCategory('tech-gadget', 10).then(posts => posts.map(transformPost).filter(Boolean)),
      getPostsByCategory('sports', 10).then(posts => posts.map(transformPost).filter(Boolean)),
      getPostsByCategory('vibes-n-cruise', 10).then(posts => posts.map(transformPost).filter(Boolean)),
    ]);

    // Batch 4: Education categories (lower priority)
    const [academics, migration, examAdmission, learningCareer] = await Promise.all([
      getAfricaNews(10),
      getAmericasNews(10),
      getAustraliaNews(10),
      getAsiaNews(10),
    ]);

    // Batch 5: Remaining categories
    const [scholarships, studentLife, canadaNews, finance] = await Promise.all([
      getEuropeNews(10),
      getUKNews(10),
      getCanadaNews(10),
      getBookNook(10),
    ]);

    return {
      latestHeadlines,
      editorsPicks,
      businessEconomy,
      japaRoutes,
      lifeAfterJapa,
      healthHub,
      techGadget,
      sportsHub,
      vibesNCruise,
      finance,
      heroArticles,
      academics,
      migration,
      examAdmission,
      learningCareer,
      scholarships,
      studentLife,
      canadaNews,
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      latestHeadlines: [],
      editorsPicks: [],
      businessEconomy: [],
      japaRoutes: [],
      lifeAfterJapa: [],
      healthHub: [],
      techGadget: [],
      sportsHub: [],
      vibesNCruise: [],
      finance: [],
      heroArticles: [],
      academics: [],
      migration: [],
      examAdmission: [],
      learningCareer: [],
      scholarships: [],
      studentLife: [],
      canadaNews: [],
    };
  }
}

export default async function Home() {
  const data = await getHomePageData();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <HeroSection articles={data.heroArticles} />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-12">
            <Education 
              africaArticle={Array.isArray(data.academics) ? data.academics[0] || null : data.academics}
              americasArticle={Array.isArray(data.migration) ? data.migration[0] || null : data.migration}
              australiaArticle={Array.isArray(data.examAdmission) ? data.examAdmission[0] || null : data.examAdmission}
              asiaArticle={Array.isArray(data.learningCareer) ? data.learningCareer[0] || null : data.learningCareer}
              europeArticle={Array.isArray(data.scholarships) ? data.scholarships[0] || null : data.scholarships}
              ukArticle={Array.isArray(data.studentLife) ? data.studentLife[0] || null : data.studentLife}
              allArticles={{
                africaNews: Array.isArray(data.academics) ? data.academics : [],
                americasNews: Array.isArray(data.migration) ? data.migration : [],
                australiaNews: Array.isArray(data.examAdmission) ? data.examAdmission : [],
                asiaNews: Array.isArray(data.learningCareer) ? data.learningCareer : [],
                europeNews: Array.isArray(data.scholarships) ? data.scholarships : [],
                ukNews: Array.isArray(data.studentLife) ? data.studentLife : [],
                canadaNews: Array.isArray(data.canadaNews) ? data.canadaNews : []
              }}
            />
      <LatestHeadlines articles={data.latestHeadlines} />
      <JapaRoutes articles={data.japaRoutes} />
      <LifeAfterJapa articles={data.lifeAfterJapa} />
      <HealthHub articles={data.healthHub} />
      <TechGadget articles={data.techGadget} />
      <SportsHub articles={data.sportsHub} />
      <EditorsPicks articles={data.editorsPicks} />
      <VibesNCruise articles={data.vibesNCruise} />
            <BusinessEconomy articles={data.businessEconomy} />
            <Finance articles={data.finance} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}