export const metadata = {
  title: "이용약관 | SWEETDEO",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">이용약관</h1>
        <p className="text-sm text-gray-400">시행일: 2026년 8월 18일</p>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">제1조 (목적)</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            이 약관은 스윗드오(이하 &quot;회사&quot;)가 제공하는 서비스 및 제3자 플랫폼 연동
            기능(TikTok 로그인·콘텐츠 게시 연동 등)의 이용조건과 절차, 회사와 이용자의
            권리·의무를 규정합니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">제2조 (서비스의 제공)</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            회사는 이용자가 본인의 TikTok 계정으로 로그인하고, 동의한 범위 내에서 콘텐츠를
            게시할 수 있도록 지원합니다. 실제 게시는 이용자의 명시적 승인 하에만 이루어집니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">제3조 (이용자의 의무)</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            이용자는 관계 법령, 이 약관의 규정, 연동 플랫폼(TikTok 등)의 정책을 준수해야 하며,
            타인의 권리를 침해하는 콘텐츠를 게시해서는 안 됩니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">제4조 (연동 해제)</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            이용자는 언제든지 TikTok 계정 설정 또는 회사에 요청하여 연동을 해제할 수 있으며,
            해제 시 관련 정보는 지체 없이 파기됩니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">제5조 (문의처)</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            약관 관련 문의는 sweetdeo@sweetdeo.co.kr 로 연락해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
