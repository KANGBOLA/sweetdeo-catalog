export const metadata = {
  title: "개인정보처리방침 | SWEETDEO",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">개인정보처리방침</h1>
        <p className="text-sm text-gray-400">시행일: 2026년 8월 18일</p>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">1. 수집하는 개인정보 항목</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            스윗드오(이하 &quot;회사&quot;)는 서비스 제공을 위해 이메일 주소, 이름 등 이용자가
            직접 제공하는 정보와, 제3자 로그인(TikTok 등)을 이용하는 경우 해당 플랫폼이
            제공에 동의한 프로필 정보(닉네임, 프로필 이미지, 사용자 식별자)를 수집합니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">2. 개인정보의 이용 목적</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            수집된 정보는 서비스 제공, 회원 식별, 콘텐츠 게시 연동(TikTok Content Posting API 등)
            기능 제공, 고객 문의 응대 목적으로만 이용하며, 목적 외 용도로 사용하지 않습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">3. 보유 및 이용 기간</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            회원 탈퇴 또는 제3자 로그인 연동 해제 시 지체 없이 파기하며, 관계 법령에 따라
            보존이 필요한 경우 해당 기간 동안 별도 보관합니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">4. 제3자 제공 및 위탁</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않으며, TikTok 등 연동
            플랫폼과는 이용자가 직접 인증한 범위 내에서만 정보를 주고받습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-gray-700">5. 문의처</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            개인정보 관련 문의는 sweetdeo@sweetdeo.co.kr 로 연락해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
