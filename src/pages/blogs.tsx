import { BLOGS_POST } from '@/api/endpoints';
import BlogPost from '@/components/Blogs';
import GlobalLayout from '@/components/Layout/GlobalLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

interface BlogPostData {
  id: number;
  title: string;
  posted_by: string;
  posted_date: string;
  description: string;
  cover_image?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface BlogPageProps {
  posts: BlogPostData[];
}

// Define the component
const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  // Render the component
  return (
    <GlobalLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-brand-color dark:text-text-primary-dark">All posts</h1>
        <div className="grid gap-8">
          {posts.map((post) => (
            <BlogPost
              key={post.id}
              title={post.title}
              posted_by={post.posted_by}
              posted_date={post.posted_date}
              description={post.description}
              image={post.cover_image?.data?.attributes?.url || ''}
            />
          ))}
        </div>
      </div>
    </GlobalLayout>
  );
};

export default BlogPage;

// Fetch data at build time
export async function getStaticProps({ locale }: { locale: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/${BLOGS_POST}?populate=deep`);
  const data = await response.json();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts: data?.data?.[0]?.attributes?.data || [],
    },
  };
}
