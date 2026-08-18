"use client";

const TIKTOK_CLIENT_KEY = "aw8ehrzof2xdallk";
const REDIRECT_URI = "https://sweetdeo-catalog.netlify.app/tiktok/callback";

function buildAuthorizeUrl() {
  const state = Math.random().toString(36).slice(2);
  const params = new URLSearchParams({
    client_key: TIKTOK_CLIENT_KEY,
    scope: "user.info.basic",
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state,
  });
  return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
}

export default function TikTokLoginPage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-sm w-full text-center space-y-4">
        <div className="text-4xl">🎵</div>
        <h1 className="text-xl font-bold text-gray-800">스윗리뷰 × TikTok</h1>
        <p className="text-sm text-gray-500">
          TikTok 계정으로 로그인하면 스윗리뷰 콘텐츠를 게시할 수 있어요.
        </p>
        <a
          href={buildAuthorizeUrl()}
          className="inline-block w-full px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          TikTok으로 로그인
        </a>
      </div>
    </div>
  );
}
