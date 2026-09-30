export const profile = {
  name: "서영준",
  nameEn: "Seo Yeongjun",
  role: "Full-stack Developer",
  headline: ["기획부터 배포까지,", "끝까지 만드는 개발자"],
  intro:
    "팀 프로젝트에서도 백엔드, 화면 구현, 서버 배포를 맡아 서비스를 실제로 동작하는 상태까지 완성해 왔습니다. 문제가 생기면 추측보다 로그와 측정으로 원인을 찾고, 새로운 도구와 AI를 빠르게 익혀 작업에 적용합니다.",
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
    period: "2026.06",
    title: "제18회 송암학생작품대전 최우수상",
    desc: "StockBattle (UIUX웹앱개발 과정 출품)",
  },
  {
    period: "2024.02",
    title: "칠성고등학교 졸업",
    desc: "",
  },
];
