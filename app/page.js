import PostGrid from '../components/PostGrid';
import { getAllPosts } from '../lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero__title">ijhyn-log</h1>
        <p className="hero__meta">기록 {posts.length}개</p>
      </section>
      <PostGrid posts={posts} />
    </div>
  );
}
