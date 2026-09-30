# 서영준 포트폴리오

Next.js(App Router) + Tailwind CSS로 만든 개인 포트폴리오 사이트입니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포 전 빌드 확인
```

## 내용 수정

화면 코드는 건드리지 않고 데이터 파일만 고치면 됩니다.

| 파일 | 내용 |
|---|---|
| `src/data/profile.ts` | 이름, 소개 문구, 이메일·GitHub, 기술 스택, 교육·수상 |
| `src/data/projects.ts` | 프로젝트 목록(순서 = 화면 순서), 역할, 기능, 문제 해결, 회고 |
| `public/images/<프로젝트>/` | 스크린샷 (webp 권장) |

회사별로 맞춤 포트폴리오를 만들 때는 `projects` 배열 순서와 `highlights`만 바꿔도 됩니다.

## 배포 (Vercel)

1. 이 폴더를 GitHub 저장소로 올립니다.
2. [vercel.com](https://vercel.com)에서 GitHub로 로그인 → **Add New → Project** → 저장소 선택 → **Deploy**.
3. 이후 `main` 브랜치에 push할 때마다 자동으로 다시 배포됩니다.
