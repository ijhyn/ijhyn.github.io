# ijhyn-log

https://ijhyn.github.io 에 배포되는 개인 블로그입니다. Next.js 정적 빌드(`output: 'export'`)로 만들고, `main`에 push하면 GitHub Actions(`.github/workflows/pages.yaml`)가 빌드해서 GitHub Pages에 올립니다.

## 글 쓰기

`posts/` 폴더에 마크다운 파일을 추가합니다.

```markdown
---
title: "글 제목"
url: /my-post        # 글 주소 (https://ijhyn.github.io/my-post/)
date: 2026-10-17
tags: [Git]          # 카드와 태그 필터에 쓰입니다
---

# 글 제목

본문...
```

- 본문 첫 줄의 `# 제목`은 페이지 헤더와 겹치므로 화면에 표시하지 않습니다.
- 이미지는 `public/assets/image/<글 파일 이름>/`에 두고 `/assets/image/...` 경로로 넣습니다.

## 로컬에서 보기

Node.js 20.9 이상이 필요합니다.

```bash
npm install
npm run dev
```
