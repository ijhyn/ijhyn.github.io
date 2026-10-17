'use client';

import Link from 'next/link';
import { useState } from 'react';
import { tagHue } from '../lib/tags';

export default function PostGrid({ posts }) {
  const tags = [...new Set(posts.flatMap((post) => post.tags))];
  const [selected, setSelected] = useState(null);
  const visible = selected ? posts.filter((post) => post.tags.includes(selected)) : posts;

  return (
    <>
      <div className="tag-filter" role="toolbar" aria-label="태그로 거르기">
        <button type="button" className="chip" aria-pressed={selected === null} onClick={() => setSelected(null)}>
          전체
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="chip"
            aria-pressed={selected === tag}
            style={{ '--hue': tagHue(tag) }}
            onClick={() => setSelected(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      <ul className="post-grid">
        {visible.map((post) => (
          <li key={post.slug}>
            <Link href={`/${post.slug}/`} className="post-card" style={{ '--hue': tagHue(post.tags[0] ?? '') }}>
              <span className="post-card__tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </span>
              <span className="post-card__title">{post.title}</span>
              <time className="post-card__date" dateTime={post.date}>
                {post.dateLabel}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
