// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// ✅ 카카오맵 스크립트 로드 함수
const loadKakaoMapScript = () => {
  const existingScript = document.querySelector("script[src*='dapi.kakao.com']");
  if (existingScript) return;

  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE__KAKAOMAP_KEY
  }&autoload=false&libraries=services`;
  script.async = true;
  script.onload = () => {
    // 👇 autoload=false 를 썼으므로 명시적으로 로드해야 함
    window.kakao.maps.load(() => {
      console.log("✅ Kakao Map SDK Loaded");
    });
  };
  document.head.appendChild(script);
};

// ✅ SDK 로딩
loadKakaoMapScript();

// ✅ 앱 렌더링
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
