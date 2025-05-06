import { useState } from "react";
import style from "../less/CreateCourse.module.less";
import Search from "../component/pages/Search";
import { useNavigate } from "react-router-dom";
import MyPage from "../component/pages/MyPage";

interface Place {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  category: "음식점" | "카페" | "놀거리" | "명소";
}

export default function CreateCourse() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [showMyPage, setShowMyPage] = useState(false);

  const handleShowModal = () => {
    setShowMyPage(true);
  };

  const handleCloseModal = () => {
    setShowMyPage(false);
  };

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  const handleAddPlace = (place: Place) => {
    if (!selectedPlaces.find((p) => p.id === place.id)) {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const handleDeletePlace = (id: string) => {
    if (window.confirm("정말 이 장소를 삭제하시겠습니까?")) {
      setSelectedPlaces(selectedPlaces.filter((place) => place.id !== id));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.function}>
        <div className={style.header} onClick={() => navigate("/MainPage")}>
          PlanFit
        </div>
        <div className={style.body}>
          <div onClick={() => navigate("/Post")}>포스트</div>
          <div onClick={() => navigate("/Course")}>코스</div>
          <div onClick={() => navigate("/Like")}>좋아요</div>
          <div onClick={handleShowModal}>마이페이지</div>
        </div>
      </div>

      <div className={style.section}>
        <div className={style.title}>
          코스 제작<div>저장하기</div>
        </div>
        <div className={style.info}>
          <div className={style.formSection}>
            <h2>코스 정보를 입력하세요.</h2>
            <form className={style.form}>
              <label>
                제목:
                <input type="text" placeholder="제목을 입력하세요" />
              </label>
              <label>
                코스 일자:
                <input type="date" />
              </label>
              <label>
                시작 시간:
                <input type="time" />
              </label>
              <label>
                메모:
                <textarea placeholder="메모를 입력하세요 (최대 500자)" maxLength={500} rows={5} />
              </label>
            </form>
          </div>

          <div className={style.place}>
            <h2>장소를 선택하세요.</h2>
            <div className={style.buttons} onClick={handleSearchClick}>
              클릭
            </div>
            <div className={style.result}>
              {selectedPlaces.map((place) => (
                <div key={place.id} className={style.card}>
                  <img src={place.imageUrl} alt={place.name} />
                  <div className={style.info}>
                    <h3>{place.name}</h3>
                    <p>{place.address}</p>
                  </div>
                  <div className={style.delete} onClick={() => handleDeletePlace(place.id)}>
                    X
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showSearch && <Search onClose={handleCloseSearch} onAdd={handleAddPlace} />}
      {showMyPage && (
        <>
          <div className={style.overlay} onClick={handleCloseModal}></div>
          <MyPage onClose={handleCloseModal} />
        </>
      )}
    </div>
  );
}
