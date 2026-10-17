import Link from 'next/link';
import { notFound } from 'next/navigation';
import ScrollTopButton from '../../components/ScrollTopButton';
import { getAllPosts, getPost, renderMarkdown } from '../../lib/posts';
import { tagColor } from '../../lib/tags';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title } : {};
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const html = await renderMarkdown(post.content);

  return (
    <div className="post-layout">
      <aside className="post-sidebar" aria-label="글 목록">
        <p className="post-sidebar__heading">글 목록</p>
        <ul>
          {posts.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${item.slug}/`}
                className="post-sidebar__link"
                aria-current={item.slug === post.slug ? 'page' : undefined}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <article className="post">
        <Link href="/" className="post__back">
          ◀ 전체 글
        </Link>
        <header className="post__header">
          <div className="post__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag" style={{ '--tag-color': tagColor(tag) }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="post__title">{post.title}</h1>
          <time className="post__date" dateTime={post.date}>
            {post.dateLabel}
          </time>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <ScrollTopButton />
    </div>
  );
}
