export const profile = {
  name: "서영준",
  nameEn: "Seo Yeongjun",
  role: "Full-stack Developer",
  headline: ["기획부터 배포까지,", "끝까지 만드는 개발자"],
  intro:
    "팀 프로젝트에서도 백엔드, 화면 구현, 서버 배포를 맡아 서비스를 실제로 동작하는 상태까지 완성해 왔습니다. 문제가 생기면 추측보다 로그와 측정으로 원인을 찾고, 새로운 도구와 AI를 빠르게 익혀 작업에 적용합니다.",
  about: [
    "처음 만든 서비스는 혼자 기획하고 구현한 주식 모의투자 게임 StockBattle이었습니다. Google Apps Script와 스프레드시트만으로 시작했지만, 직접 만든 것이 사람들 앞에서 돌아가는 경험이 좋았고, 이 프로젝트로 제18회 송암학생작품대전에서 최우수상을 받았습니다. 그때부터 \"만들 수 있겠다\"보다 \"끝까지 만들어 본다\"를 기준으로 삼게 됐습니다.",
    "이후 206 BRIDGE, 심어봄, 나들플랜까지 팀 프로젝트를 거치면서 매번 구현을 맡았습니다. PHP·MySQL로 블로그를 만들었고, Next.js와 Laravel로 웹 서비스를 만들었고, AI를 활용한 나들이 추천 서비스까지 만들며 프론트엔드부터 백엔드, 배포까지 직접 다뤘습니다. 기획이 실제 화면과 데이터로 이어지도록 만드는 일이 제가 팀에서 가장 잘할 수 있는 역할이라고 생각했습니다.",
    "새로운 도구와 AI를 빠르게 받아들이는 편이지만, 결과물은 꼼꼼하게 확인하는 것을 원칙으로 합니다. 왜 그렇게 동작하는지 이해하고 넘어가야 다음 작업이 단단해진다고 믿기 때문입니다. 지금은 한 단계 더 깊이 있는 개발자가 되기 위해, 만든 것을 다시 들여다보고 다듬는 연습을 이어가고 있습니다.",
  ],
  email: "yjwest9@gmail.com",
  github: "https://github.com/yjwest9",
  location: "대구",
  facts: [
    { label: "배포한 서비스", value: "3개" },
    { label: "팀 프로젝트 커밋 비중", value: "90%+" },
    { label: "수상", value: "최우수상" },
  ],
};

export const skills: { group: string; items: { name: string; used: string }[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "Next.js", used: "나들플랜, 심어봄" },
      { name: "React", used: "나들플랜, 심어봄" },
      { name: "TypeScript", used: "나들플랜, 심어봄 (strict)" },
      { name: "JavaScript", used: "StockBattle, 206 BRIDGE, QuickSave" },
      { name: "HTML / CSS", used: "전 프로젝트" },
    ],
  },
  {
    group: "Backend & DB",
    items: [
      { name: "Next.js API Route", used: "나들플랜" },
      { name: "Laravel", used: "심어봄 (Sanctum, 큐, 테스트)" },
      { name: "PHP", used: "206 BRIDGE, 심어봄" },
      { name: "MySQL / MariaDB", used: "나들플랜, 심어봄, 206 BRIDGE" },
      { name: "Prisma", used: "나들플랜" },
      { name: "Google Apps Script", used: "StockBattle" },
    ],
  },
  {
    group: "AI",
    items: [
      { name: "LangChain.js", used: "나들플랜 (에이전트, Tool Calling)" },
      { name: "Gemini API", used: "나들플랜, StockBattle" },
      { name: "LangSmith", used: "나들플랜 (트레이스 분석)" },
    ],
  },
  {
    group: "Deploy & Collaboration",
    items: [
      { name: "Vercel", used: "심어봄" },
      { name: "Linux 서버 / pm2", used: "나들플랜" },
      { name: "GitHub Actions", used: "심어봄 (CI)" },
      { name: "Git / GitHub", used: "Organization, 브랜치·PR 협업" },
      { name: "Figma", used: "UI 리뉴얼 디자인" },
    ],
  },
];

export const timeline = [
  {
    period: "2026.03 – 2026.10",
    title: "영진직업전문학교",
    desc: "생성형 AI 기반 UI/UX디자인 & 웹앱 콘텐츠 개발 과정 (IT·디자인콘텐츠과)",
  },
  {
    period: "2026.07",
    title: "제18회 송암학생작품대전 최우수상",
    desc: "StockBattle (UIUX웹앱개발 과정 출품)",
  },
  {
    period: "2024.07 – 2026.01",
    title: "육군 병장 만기전역",
    desc: "운전병",
  },
  {
    period: "2024.02",
    title: "칠성고등학교 졸업",
    desc: "",
  },
  { period: "2023.12", title: "운전면허 1종 보통 취득", desc: "" },
];
