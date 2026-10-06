export type Shot = { src: string; alt: string; caption?: string; mobile?: boolean };

export type Trouble = {
  title: string;
  problem: string;
  cause?: string;
  solution: string[];
  result: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  tagline: string;
  period: string;
  team: string;
  role: string;
  contribution?: string;
  award?: string;
  stack: string[];
  links: { label: string; href: string }[];
  cover: Shot;
  highlights: string[];
  overview: string[];
  features: { title: string; desc: string }[];
  shots: Shot[];
  troubleTitle?: string;
  troubles: Trouble[];
  retrospective: string[];
};

export const projects: Project[] = [
  {
    slug: "napl",
    title: "나들플랜",
    subtitle: "NAPL",
    tagline: "날씨와 대기질을 AI가 먼저 판단해 대구 나들이 코스를 짜 주는 에이전트 서비스",
    period: "2026.08.31 – 2026.09.30",
    team: "3명 (팀 MOTION)",
    role: "백엔드 · 화면 구현 · API 연동 · 서버 배포 전담",
    contribution: "전체 커밋 287개 중 267개",
    stack: ["Next.js", "TypeScript", "LangChain.js", "Gemini API", "MySQL", "Prisma", "공공데이터 API", "Kakao Local"],
    links: [
      { label: "서비스 바로가기", href: "https://wa26bteam02.yjjob.kr" },
      { label: "GitHub", href: "https://github.com/MOTION-youngjin-project/ai-outing-agent" },
    ],
    cover: { src: "/images/napl/cover.webp", alt: "나들플랜 AI 추천 코스 결과 화면" },
    highlights: [
      "공공데이터 4종(대기질·날씨·공연전시·실시간 주차)을 AI가 도구로 골라 호출",
      "추천 응답 시간 44초 → 9~14초로 단축 (LangSmith 트레이스로 실측)",
      "학교 서버에 실서비스 배포, PC·모바일 반응형",
    ],
    overview: [
      "\"요즘 날씨가 별로네\"처럼 흘려 말해도 AI가 스스로 대기질부터 조회하고, 나쁘면 실내 활동으로 코스를 바꿔 추천합니다. 정해진 조건으로 DB를 거르는 방식이 아니라, 에이전트가 상황을 보고 어떤 도구를 부를지 직접 판단하는 구조입니다.",
      "Next.js API Route 안에서 LangChain.js 에이전트, 공공데이터 도구, DB 저장까지 모두 처리하도록 백엔드를 설계했습니다. 디자인은 팀원이 Figma로 만들었고, 그 외 백엔드·화면 구현·배포는 제가 맡았습니다.",
    ],
    features: [
      { title: "상황 판단형 코스 추천", desc: "지역과 자연어 질문을 받으면 날씨·대기질에 따라 실내/야외를 나눠 3곳 내외의 코스를 만듭니다." },
      { title: "공공데이터 도구 연동", desc: "에어코리아, 기상청, 문화포털, 대구시 실시간 주차정보를 LangChain tool()과 zod 스키마로 감쌌습니다." },
      { title: "코스 지도와 이동 시간", desc: "추천 장소를 지도 위 경로로 보여 주고, 장소 사이 이동 시간을 표시합니다." },
      { title: "장소 매칭 복구", desc: "AI가 말한 장소명과 공식 장소명이 다를 때 이름 유사도·주소·좌표 거리로 다시 찾고, 애매하면 사용자가 고르게 합니다." },
      { title: "사진 출처 관리", desc: "Wikidata·Commons에서 CC 라이선스 사진만 골라 쓰고, 촬영자·라이선스를 함께 표시합니다." },
    ],
    shots: [
      { src: "/images/napl/home.webp", alt: "나들플랜 첫 화면", caption: "첫 화면 — 지역 선택 + 자연어 질문" },
      { src: "/images/napl/result.webp", alt: "추천 코스 결과", caption: "추천 결과 — 날씨·미세먼지 상태와 코스" },
      { src: "/images/napl/map.webp", alt: "코스 지도", caption: "코스 지도 — 경로와 이동 시간" },
    ],
    troubles: [
      {
        title: "추천 한 건에 44초 걸리던 응답을 9~14초로",
        problem: "추천 요청 하나에 최대 44초가 걸렸습니다. 도구 실행(0.5초)과 DB 저장(0.5초)은 빨랐기 때문에 원인이 바로 보이지 않았습니다.",
        cause: "LangSmith 트레이스와 서버 로그로 단계별 시간을 재 보니, 시간은 모델 왕복과 응답 없는 외부 API에서 새고 있었습니다. LangChain 내부 재시도(기본 6회)가 429 응답의 retry-after 40초를 그대로 기다리고 있었고, 이미 직접 만든 모델 폴백 체인과 중복이었습니다.",
        solution: [
          "라이브러리 재시도를 끄고(maxRetries: 0) 자체 폴백 체인만 사용 — 27초 → 0.5초",
          "첫 응답 12초 마감(stallGuard) + AbortController로 멈춘 요청을 실제로 끊음",
          "공공데이터 API는 짧은 타임아웃(5초×2회) + 실패 결과 5분 캐시",
          "서버가 이미 아는 날씨·대기질은 프롬프트에 넣어 모델 왕복 2회를 줄임",
        ],
        result: "응답 시간 44초 → 9~14초. 이후 새 API를 붙일 때도 '짧은 타임아웃 + 실패 캐시' 패턴을 기준으로 삼았습니다.",
      },
      {
        title: "추천 장소 30곳 중 요금·운영시간이 채워진 곳이 0곳",
        problem: "관광 API에서 요금과 운영시간을 받아 보여 주도록 설계했는데, 저장된 추천 장소 30곳 모두 값이 비어 있었습니다.",
        cause: "직접 호출해 비교해 보니 TourAPI는 오퍼레이션마다 지역 파라미터가 달랐습니다. 목록 조회는 areaCode로 488건이 나오지만, 키워드·축제 검색은 같은 값으로 0건이었고 lDongRegnCd를 써야 했습니다. 또 관광 API와 카카오의 주소 표기(\"대구광역시\" vs \"대구\")가 달라 완전일치 비교가 항상 실패했습니다.",
        solution: [
          "오퍼레이션별로 지역 파라미터를 나눠 쓰는 함수로 분리",
          "캐시 키 버전을 올려 이전에 저장된 '0건' 캐시를 무효화",
          "공백·\"광역시\"를 정규화한 뒤 앞부분 일치로 같은 주소를 판별",
        ],
        result: "대구미술관·달성공원 등에서 실제 운영시간과 요금이 표시되기 시작했습니다.",
      },
      {
        title: "RAG 도구가 같은 질문을 11번 반복하다 요청이 실패",
        problem: "\"수성구 아이 동반\" 요청에서 에이전트가 시설 검색 도구를 11번 호출한 끝에 recursion limit으로 실패했습니다. 하루 모델 쿼터의 절반 이상을 쓴 셈이었습니다.",
        cause: "RAG 문서가 9건짜리 데모 요약본이고 8건 중 7건이 서울·인천 시설이라, 질의를 바꿔도 같은 결과만 돌아왔습니다. 실측해 보니 모델이 채운 '관람 소요시간' 16건 중 15건은 문서에 없는 장소였습니다. 근거 없이 지어낸 값이었습니다.",
        solution: [
          "유사도 임계값으로 막을 수 있는지 먼저 측정 — 관련·무관 질의 점수가 겹쳐 불가능함을 확인",
          "RAG 도구와 인덱스를 제거하고, 모델이 소요시간을 채우는 필드 자체를 없앰",
          "관광 API가 이미 주던 spendtime·유모차 대여 정보를 읽어 실데이터로 대체",
        ],
        result: "이 도구로 인한 모델 왕복(최악 11회)이 0회가 됐고, 소요시간·유모차 정보가 지어낸 값에서 검증된 값으로 바뀌었습니다.",
      },
    ],
    retrospective: [
      "느낌이 아니라 트레이스와 로그로 측정한 뒤 고치는 습관이 생겼습니다. '이게 원인일 것 같다'는 추측이 틀린 경우가 생각보다 많았습니다.",
      "AI가 그럴듯하게 채운 값도 실제 데이터와 대조하면 틀린 경우가 있다는 것을 확인했고, 검증할 수 있는 값은 공공데이터로 채우는 쪽으로 설계를 바꿨습니다.",
      "다음 단계로 코스 타임라인 고도화와 Flutter 모바일 앱을 준비하고 있습니다.",
    ],
  },
  {
    slug: "simeobom",
    title: "심어봄",
    tagline: "내 공간과 화분에 맞춰 재배 계획과 물주기 일정을 관리하는 텃밭 플래너",
    period: "2026.08.03 – 2026.08.28",
    team: "3명",
    role: "백엔드 · 프론트엔드 구현 · 배포 전담",
    contribution: "전체 커밋 422개 중 395개",
    stack: ["Next.js 16", "TypeScript", "Laravel 12", "Sanctum", "MySQL", "Toss Payments", "GitHub Actions", "Vercel"],
    links: [
      { label: "서비스 바로가기", href: "https://wa26b02.yjjob.kr" },
      { label: "GitHub", href: "https://github.com/vegetable-garden-planner/vegetable-garden-planner" },
    ],
    cover: { src: "/images/simeobom/landing.webp", alt: "심어봄 랜딩 페이지" },
    highlights: [
      "Next.js 프론트 + Laravel API를 분리 설계하고 Vercel·닷홈에 각각 배포",
      "Google·카카오 소셜 로그인, 토스페이먼츠 정기결제(구독·해지·재시도)",
      "GitHub Actions로 Laravel·Next.js 테스트 자동 검증",
    ],
    overview: [
      "베란다 화분부터 마당 텃밭까지, 사용자의 공간과 햇빛 조건에 맞춰 무엇을 언제 심고 언제 물을 줘야 하는지 알려 주는 서비스입니다.",
      "팀원이 아이디어·Figma 디자인·인트로 애니메이션과 랜딩 3D 모델링을 맡았고, 저는 Laravel API 설계부터 Next.js 화면 구현, 결제·로그인 연동, 배포까지 담당했습니다.",
    ],
    features: [
      { title: "재배 흐름 전체 연결", desc: "공간 등록 → 시즌 → 작물 배치(격자) → 재배·물주기 일정 → 기록까지 한 흐름으로 이어집니다." },
      { title: "시작 진단", desc: "공간·햇빛·관리 시간·목적 4단계 질문으로 추천 작물과 준비물을 안내합니다." },
      { title: "소셜 로그인과 정기결제", desc: "Google·카카오 로그인과 기존 이메일 계정 연결, 토스페이먼츠 정기결제를 구현했습니다." },
      { title: "알림", desc: "웹 푸시와 매일 07:00 오늘 할 일 메일(큐 발송)로 물주기·재배 일정을 알려 줍니다." },
      { title: "관리자 콘솔", desc: "Laravel Blade로 분리한 관리자 화면에서 회원과 운영 지표를 관리합니다." },
    ],
    shots: [
      { src: "/images/simeobom/landing.webp", alt: "심어봄 랜딩", caption: "랜딩 페이지" },
      { src: "/images/simeobom/dashboard-mobile.webp", alt: "심어봄 모바일 대시보드", caption: "모바일 재배 홈 — 오늘 할 일과 재배 계획", mobile: true },
    ],
    troubleTitle: "문제 해결 & 설계 포인트",
    troubles: [
      {
        title: "Vercel과 닷홈, 서로 다른 도메인에서 로그인 세션이 유지되지 않던 문제",
        problem: "프론트엔드는 Vercel, API는 닷홈에 배포하자 로그인해도 세션이 저장되지 않았고, Google·카카오 로그인 후 돌아오면 인증 상태가 끊겼습니다.",
        cause: "도메인이 달라 브라우저가 Laravel Sanctum의 세션 쿠키와 XSRF-TOKEN을 저장하지 못했고, OAuth 콜백이 다른 출처로 돌아오면서 로그인 전 세션의 state를 이어 가지 못했습니다.",
        solution: [
          "브라우저는 Vercel의 같은 출처(/api, /sanctum, /auth)로만 요청하고, Next.js rewrite가 닷홈 Laravel로 프록시",
          "SESSION_DOMAIN을 고정하지 않고, SameSite·Secure 쿠키 설정을 운영 환경에 맞게 조정",
          "OAuth 리디렉션 URI를 브라우저가 시작한 Vercel 출처로 통일",
        ],
        result: "Vercel 배포 화면에서 이메일·Google·카카오 로그인과 회원가입이 정상 동작함을 확인했습니다. 이후 서비스는 학교 서버(wa26b02.yjjob.kr)로 이전해 운영 중입니다.",
      },
      {
        title: "두 곳에서 동시에 수정하면 앞 내용이 사라지는 문제 예방",
        problem: "같은 재배 공간이나 시즌을 두 탭(또는 두 기기)에서 수정하면, 나중에 저장한 쪽이 먼저 저장한 내용을 조용히 덮어쓸 수 있습니다.",
        solution: [
          "응답에 ETag를 내려 주고, 수정 요청에 If-Match를 요구",
          "버전이 다르면 409로 충돌을 알리고, 쓰기는 트랜잭션으로 처리",
          "인증·소유권·경계값을 Laravel 기능 테스트와 API 통합 테스트로 검증",
        ],
        result: "다른 사용자 데이터 접근 차단과 동시 수정 충돌 방지를 테스트로 보장한 상태에서 기능을 추가할 수 있었습니다.",
      },
      {
        title: "SSH 없는 무료 호스팅에서 안전하게 배포하기",
        problem: "닷홈 무료 호스팅은 SSH·Composer를 쓸 수 없어, 기능을 추가할 때마다 파일을 직접 올려야 했습니다.",
        solution: [
          "기능별로 바뀐 파일 목록과 업로드 순서를 문서화",
          "운영 .env와 index.php를 덮어쓰지 않는 규칙, 마이그레이션 실행·롤백 스크립트 준비",
        ],
        result: "카카오 로그인, 기록 사진 업로드, 웹 푸시, 결제 기능을 운영 중단 없이 차례로 반영했습니다.",
      },
    ],
    retrospective: [
      "프론트와 백엔드를 나누면 배포 환경(도메인·쿠키)까지 함께 설계해야 한다는 것을 직접 겪으며 배웠습니다.",
      "기능을 빠르게 늘리는 대신 테스트와 CI를 먼저 갖춰 두니, 후반에 결제·알림처럼 위험한 기능을 붙일 때 훨씬 안심하고 작업할 수 있었습니다.",
    ],
  },
  {
    slug: "stockbattle",
    title: "StockBattle",
    tagline: "가상 머니로 친구나 AI 봇과 단타 수익률을 겨루는 주식 배틀 게임",
    period: "2026.05.27 – 2026.06.10",
    team: "1인 개인 프로젝트",
    role: "기획 · 디자인 · 개발 · 배포 전부",
    award: "제18회 송암학생작품대전 최우수상",
    stack: ["Google Apps Script", "Google Sheets", "Gemini API", "JavaScript", "Chart.js"],
    links: [
      { label: "게임 바로가기", href: "https://script.google.com/macros/s/AKfycbyvbZgPr8Kwgw1T0RhbqKIh4SP3XUia8DjDgBx-O8vQBAtt8Zo2cLbqcnaX8DxkSGdI/exec" },
    ],
    cover: { src: "/images/stockbattle/cover.webp", alt: "StockBattle 첫 화면" },
    highlights: [
      "Apps Script + Sheets만으로 기획부터 배포까지 2주 만에 1인 개발",
      "별도 서버 없이 공유 시드 PRNG로 멀티플레이 시세 동기화",
      "Gemini가 매매 기록을 [사실]·[해석]·[조언]으로 피드백",
    ],
    overview: [
      "실제 돈 없이 단타 매매를 연습하고, 친구와 링크 하나로 실시간 수익률 대결을 할 수 있는 게임입니다. 토스증권처럼 모바일에서 쓰기 편한 화면을 목표로 했습니다.",
      "Google Apps Script와 Google Sheets만으로 서버와 DB를 대신해, 기획부터 배포까지 혼자 2주 만에 완성했습니다.",
    ],
    features: [
      { title: "싱글 · 멀티 모드", desc: "AI 봇과 바로 대결하거나, 방을 만들어 링크·코드로 친구를 초대합니다." },
      { title: "수익률 차트", desc: "Chart.js로 게임 중 수익 곡선을 그립니다." },
      { title: "AI 매매 피드백", desc: "게임이 끝나면 Gemini가 매매 기록을 분석해 사실·해석·조언 세 부분으로 나눠 칩 형태로 보여 줍니다." },
      { title: "라이트 · 다크 모드", desc: "모바일 우선 UI에 테마 전환을 지원합니다." },
    ],
    shots: [
      { src: "/images/stockbattle/home.webp", alt: "StockBattle 첫 화면", caption: "첫 화면 — 싱글/멀티 모드 선택" },
      { src: "/images/stockbattle/award.webp", alt: "송암학생작품대전 수상작 안내", caption: "제18회 송암학생작품대전 최우수상" },
    ],
    troubles: [
      {
        title: "서버 없이 모든 플레이어가 같은 시세를 보게 하기",
        problem: "멀티 모드에서는 모든 참가자가 같은 가격 흐름을 봐야 공정한데, Apps Script는 실시간으로 가격을 계속 내려보내는 서버 역할을 하기 어렵습니다.",
        solution: [
          "방을 만들 때 공유 시드 하나만 저장",
          "각 클라이언트가 같은 시드로 mulberry32 PRNG를 돌려 동일한 시세를 직접 생성",
        ],
        result: "서버 호출을 최소화하면서도 모든 플레이어가 같은 차트로 대결할 수 있게 됐습니다.",
      },
      {
        title: "청산된 플레이어의 결과 화면이 사라지던 문제",
        problem: "게임 도중 청산된 플레이어는 대결이 끝나기 전에 결과 화면이 사라져 최종 순위를 확인할 수 없었습니다.",
        solution: [
          "heartbeat로 참가 상태를 유지",
          "청산 시점의 최종 수익률(finalRet)을 스냅샷으로 저장해 결과 화면에 계속 표시",
        ],
        result: "청산된 플레이어도 대결이 끝날 때까지 결과와 순위를 확인할 수 있습니다.",
      },
      {
        title: "Gemini 호출 실패에 대비한 모델 폴백",
        problem: "무료 쿼터 초과나 일시적인 오류로 AI 피드백이 비어 버리는 경우가 있었습니다.",
        solution: ["gemini-2.5-flash → 2.5-flash-lite → 3-flash → 3.1-flash-lite 순서의 폴백 체인 구성"],
        result: "한 모델이 실패해도 다음 모델로 이어서 피드백을 받을 수 있게 됐습니다.",
      },
    ],
    retrospective: [
      "제한된 도구(Apps Script + Sheets) 안에서 서버 역할을 어떻게 나눌지 고민하며, 모든 것을 서버에 두지 않아도 된다는 것을 배웠습니다.",
      "혼자 기획부터 배포까지 마감에 맞춰 끝낸 경험이 이후 팀 프로젝트에서 전체 흐름을 책임지는 데 밑바탕이 됐습니다.",
    ],
  },
  {
    slug: "bridge206",
    title: "206 BRIDGE",
    tagline: "20대와 60대에서 출발해 모든 세대를 글로 잇는 네이버 블로그 스타일 커뮤니티",
    period: "2026.06.21 – 2026.07.24",
    team: "2명",
    role: "기획 참여 · 개발 전반",
    contribution: "전체 커밋 33개 중 31개 (팀원: 로고 디자인·아이디어)",
    stack: ["PHP", "MySQL", "mysqli", "JavaScript", "HTML/CSS"],
    links: [{ label: "GitHub", href: "https://github.com/BRIDGE-260/blog" }],
    cover: { src: "/images/bridge/main.webp", alt: "206 BRIDGE 메인 화면" },
    highlights: [
      "프레임워크 없이 PHP로 25개 테이블 규모의 블로그 서비스 구현",
      "이웃·쪽지·알림·방문 통계·관리자 대시보드·포인트 시스템",
      "60대 사용자를 고려한 글자 크기 3단계와 다크 모드",
    ],
    overview: [
      "20대와 60대가 글과 질문으로 서로 이어지는 블로그를 목표로 만든 수업 팀 프로젝트입니다. 네이버 블로그처럼 내 블로그 꾸미기, 이웃, 방명록, 방문 통계를 갖췄습니다.",
      "프레임워크 없이 PHP와 mysqli로 인증, 권한, 보안 처리를 직접 구현하며 웹 서비스의 기본기를 다졌습니다.",
    ],
    features: [
      { title: "글쓰기 에디터", desc: "contenteditable 기반으로 본문 중간 이미지·동영상 삽입, 태그, 임시저장·발행, 공지 고정을 지원합니다." },
      { title: "이웃과 소통", desc: "이웃·서로이웃, 접속 상태, 쪽지, 댓글·답글, 공감·스크랩, 항목별 읽음 처리되는 알림을 제공합니다." },
      { title: "블로그 현황", desc: "시간대별·성별 방문 통계를 보여 주고 CSV로 내려받을 수 있습니다." },
      { title: "관리자 대시보드", desc: "회원 밴·권한, 글·댓글 강제 삭제, 사이트 공지와 운영 로그를 관리합니다." },
      { title: "포인트와 AI 글쓰기 도우미", desc: "출석·룰렛 포인트, 배지 구매, 제목·개요·태그 추천 AI 도우미를 붙였습니다." },
    ],
    shots: [
      { src: "/images/bridge/main.webp", alt: "메인 피드", caption: "메인 피드" },
      { src: "/images/bridge/blog.webp", alt: "개인 블로그", caption: "내 블로그 — 꾸미기와 글 목록" },
      { src: "/images/bridge/stats.webp", alt: "블로그 현황", caption: "블로그 현황 — 방문 통계" },
      { src: "/images/bridge/admin.webp", alt: "관리자 대시보드", caption: "관리자 대시보드" },
    ],
    troubleTitle: "설계 포인트",
    troubles: [
      {
        title: "포인트가 두 번 지급되지 않도록",
        problem: "새로고침이나 중복 요청으로 같은 활동에 포인트가 여러 번 쌓일 수 있었습니다.",
        solution: [
          "포인트 내역에 (user_id, action_type, ref_key) UNIQUE 제약",
          "INSERT IGNORE와 트랜잭션으로 내역 기록과 잔액 변경을 한 번에 처리",
          "룰렛은 (user_id, spin_date) UNIQUE로 하루 1회만 허용",
        ],
        result: "애플리케이션 코드가 아니라 DB 제약으로 중복 지급을 막아, 요청이 겹쳐도 잔액이 틀어지지 않습니다.",
      },
      {
        title: "기본 보안을 직접 구현",
        problem: "프레임워크가 없어서 SQL 인젝션, XSS, 비밀번호 저장을 모두 직접 챙겨야 했습니다.",
        solution: [
          "모든 쿼리를 prepared statement로 작성",
          "password_hash / password_verify로 비밀번호 처리",
          "사용자 입력 출력 시 htmlspecialchars로 XSS 방지, DB 접속 정보는 gitignore",
        ],
        result: "보안 규칙을 README와 AI 코딩 도구용 가이드(CLAUDE.md)에 명시해 팀 전체가 같은 기준으로 작업했습니다.",
      },
      {
        title: "피드 조회가 느려지지 않도록 인덱스 설계",
        problem: "공개 글 피드, 내 블로그 글 목록, 댓글 트리처럼 자주 쓰는 조회가 데이터가 늘수록 느려질 수 있었습니다.",
        solution: ["실제 WHERE·ORDER BY 조합에 맞춘 복합 인덱스를 별도 마이그레이션 SQL로 추가 (예: status, visibility, created_at)"],
        result: "기존 DB를 유지한 채 마이그레이션 파일만 실행하면 적용되도록 정리했습니다.",
      },
    ],
    retrospective: [
      "프레임워크가 대신해 주던 인증·보안·마이그레이션을 직접 만들어 보면서, 이후 Laravel과 Next.js를 쓸 때 각 기능이 왜 필요한지 이해하고 쓸 수 있게 됐습니다.",
    ],
  },
];

export const otherWorks = [
  {
    title: "QuickSave",
    kind: "Chrome 확장 프로그램",
    desc: "할 일과 읽을거리를 저장하는 Manifest V3 확장. 별도 창, 드래그 정렬, 메모·태그 편집, 전체 탭 통합 검색, 단축키를 지원합니다.",
    stack: ["JavaScript", "Chrome Extension API"],
  },
  {
    title: "카페 모바일 웹 리뉴얼",
    kind: "Figma UI 디자인",
    desc: "카페 브랜드 모바일 랜딩을 새로 디자인했습니다. 글래스모피즘 GNB, 히어로 슬라이더, 드로어 내비게이션을 구성했습니다.",
    stack: ["Figma"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
