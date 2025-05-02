import { useEffect, useRef, useState } from "react";
import style from "../less/Search.module.less";

interface SearchProps {
  onClose: () => void;
  onComplete: () => void; // ✅ 추가
}

export default function Search({ onClose }: SearchProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [keyword, setKeyword] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  // ✅ SDK가 로드됐는지 확인
  useEffect(() => {
    const checkKakaoLoaded = () => {
      if (window.kakao && window.kakao.maps) {
        setIsKakaoLoaded(true);
      } else {
        setTimeout(checkKakaoLoaded, 100);
      }
    };

    checkKakaoLoaded();
  }, []);

  useEffect(() => {
    if (!isKakaoLoaded || !mapRef.current) return;

    const mapInstance = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    });

    setMap(mapInstance);
  }, [isKakaoLoaded]);

  const handleSearch = () => {
    if (!map || !window.kakao?.maps?.services) return;

    const ps = new window.kakao.maps.services.Places();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ps.keywordSearch(keyword, (data: any[], status: kakao.maps.services.Status) => {
      if (status === kakao.maps.services.Status.OK) {
        const first = data[0];
        const coords = new window.kakao.maps.LatLng(Number(first.y), Number(first.x));

        map.setCenter(coords);

        new window.kakao.maps.Marker({
          map,
          position: coords,
        });

        setSelectedPosition({ lat: Number(first.y), lng: Number(first.x) });
      }
    });
  };

  const handleSelect = () => {
    if (selectedPosition) {
      sessionStorage.setItem("selectedLocation", JSON.stringify(selectedPosition));
      alert("장소가 선택되었습니다.");
      onComplete(); // ✅ 모달 전환 트리거
    }
  };

  return (
    <div className={style.modalBackground} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.searchBar}>
          <input
            type="text"
            placeholder="장소를 검색하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
        </div>

        <div ref={mapRef} className={style.mapContainer}></div>
        <button onClick={handleSelect} className={style.select}>
          선택
        </button>
      </div>
    </div>
  );
}
function onComplete() {
  throw new Error("Function not implemented.");
}
