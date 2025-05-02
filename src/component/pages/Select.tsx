import { useEffect, useState } from "react";
import style from "../less/Select.module.less"; // 같은 스타일 재활용
import ThemeSelect from "./ThemeSelect";

interface SelectProps {
  onClose: () => void;
}

type Place = {
  id: number;
  name: string;
  type: "음식점" | "카페" | "놀거리" | "명소";
  distance: string;
};

export default function Select({ onClose }: SelectProps) {
  const [theme, setTheme] = useState("음식점");
  const [recommended, setRecommended] = useState<Place[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("selectedLocation");
    if (saved) {
      setLocation(JSON.parse(saved));
    }

    // 임시 더미 데이터 (API 연결 전)
    const dummyPlaces: Place[] = [
      { id: 1, name: "맛있는 갈비집", type: "음식점", distance: "100m" },
      { id: 2, name: "스타벅스 시청점", type: "카페", distance: "120m" },
      { id: 3, name: "방탈출 카페", type: "놀거리", distance: "150m" },
      { id: 4, name: "덕수궁", type: "명소", distance: "200m" },
    ];

    setRecommended(dummyPlaces);
  }, []);

  const filteredPlaces = recommended.filter((place) => place.type === theme);

  return (
    <div className={style.modalBackground} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h2>장소를 선택해주세요</h2>

        <ThemeSelect value={theme} onChange={setTheme} />

        <ul style={{ marginTop: "16px" }}>
          {filteredPlaces.map((place) => (
            <li key={place.id} style={{ marginBottom: "12px" }}>
              <strong>{place.name}</strong> <br />
              <small>{place.distance} 거리</small>
            </li>
          ))}
        </ul>

        <button onClick={onClose}>선택 완료</button>
      </div>
    </div>
  );
}
