import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 호스팅이 붙이는 filename="resume.pdf"가 <a download> 이름보다 우선이라 헤더로 직접 지정한다.
  headers: async () => [
    {
      source: "/files/resume.pdf",
      headers: [
        {
          key: "Content-Disposition",
          value: `attachment; filename="Seo_Yeongjun_Resume.pdf"; filename*=UTF-8''${encodeURIComponent("서영준_이력서.pdf")}`,
        },
      ],
    },
  ],
};

export default nextConfig;
