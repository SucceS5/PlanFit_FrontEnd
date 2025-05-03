import { useEffect, useRef, useState } from "react";
import style from "../less/Search.module.less";
import ResultList from "../pages/ResultList";

interface SearchProps {
  onClose: () => void;
  onAdd: (place: Place) => void;
}

interface Place {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  category: "음식점" | "카페" | "놀거리" | "명소";
}

export default function Search({ onClose, onAdd }: SearchProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<Place["category"]>("음식점");

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
        new window.kakao.maps.Marker({ map, position: coords });

        const dummyPlaces: Place[] = [
          {
            id: "1",
            name: "홍대 맛집",
            address: "서울시 마포구 와우산로 94",
            imageUrl: "https://via.placeholder.com/72",
            category: "음식점",
          },
          {
            id: "2",
            name: "홍대 카페",
            address: "서울시 마포구 어쩌구 22",
            imageUrl: "https://via.placeholder.com/72",
            category: "카페",
          },
        ];
        setPlaces(dummyPlaces);
      }
    });
  };

  return (
    <div className={style.modalBackground} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.search}>
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
        </div>

        <div className={style.right}>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as Place["category"])}>
            <option value="음식점">음식점</option>
            <option value="카페">카페</option>
            <option value="놀거리">놀거리</option>
            <option value="명소">명소</option>
          </select>

          <div className={style.result}>
            <ResultList places={places.filter((p) => p.category === categoryFilter)} onAdd={onAdd} />
          </div>
        </div>
      </div>
    </div>
  );
}
