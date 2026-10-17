import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1>페이지를 찾을 수 없어요</h1>
      <Link href="/">← 첫 화면으로</Link>
    </div>
  );
}
