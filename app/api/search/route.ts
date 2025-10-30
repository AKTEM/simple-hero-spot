import { NextRequest, NextResponse } from 'next/server';
import { getPosts, transformPost } from '@/lib/wordpress';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '20');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ 
        posts: [], 
        total: 0, 
        error: 'Search query is required' 
      }, { status: 400 });
    }

    console.log('Search API called with:', { query, page, perPage });

    // Call the WordPress API with search parameters with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 15000);
    });

    const searchPromise = getPosts({
      search: query.trim(),
      per_page: perPage,
      page: page,
      _embed: true,
      status: 'publish'
    });

    const wordpressPosts = await Promise.race([
      searchPromise,
      timeoutPromise
    ]) as any[];

    console.log('WordPress API response:', {
      postsCount: wordpressPosts?.length || 0,
      query: query.trim()
    });

    if (!wordpressPosts || !Array.isArray(wordpressPosts)) {
      throw new Error('Invalid response from WordPress API');
    }

    // Transform posts to our frontend format
    const transformedPosts = wordpressPosts
      .map(transformPost)
      .filter(Boolean);

    console.log('Transformed posts:', {
      transformedCount: transformedPosts.length,
      titles: transformedPosts.map(p => p.title).slice(0, 3)
    });

    return NextResponse.json({
      posts: transformedPosts,
      total: transformedPosts.length,
      query: query.trim(),
      page,
      perPage
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      }
    });

  } catch (error) {
    console.error('Search API error:', error);
    
    // Return graceful error response without breaking the UI
    return NextResponse.json({ 
      posts: [], 
      total: 0, 
      error: 'Search temporarily unavailable. Please try again.',
      details: process.env.NODE_ENV === 'development' 
        ? (error instanceof Error ? error.message : 'Unknown error')
        : undefined
    }, { 
      status: 200, // Return 200 to prevent UI breaks, with empty results
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';