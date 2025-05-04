import style from "../less/CreatePost.module.less";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPage from "../component/pages/MyPage";
import {
  FcAutomotive,
  FcPaid,
  FcHome,
  FcChargeBattery,
  FcFlashOn,
  FcPodiumWithoutSpeaker,
  FcSupport,
  FcCloseUpMode,
  FcPortraitMode,
  FcFilmReel,
  FcLibrary,
} from "react-icons/fc";
import { RiImageAddFill } from "react-icons/ri";
import SavedCourse from "../component/pages/SavedCourse";
import { Place } from "../types/Place"; // 경로는 상황에 맞게 조절

const categories = [
  { icon: <FcAutomotive />, label: "드라이브" },
  { icon: <FcPaid />, label: "쇼핑" },
  { icon: <FcHome />, label: "실내" },
  { icon: <FcChargeBattery />, label: "휴식" },
  { icon: <FcFlashOn />, label: "알코올" },
  { icon: <FcPodiumWithoutSpeaker />, label: "미식" },
  { icon: <FcSupport />, label: "공예" },
  { icon: <FcCloseUpMode />, label: "자연" },
  { icon: <FcPortraitMode />, label: "체험" },
  { icon: <FcFilmReel />, label: "공연" },
  { icon: <FcLibrary />, label: "전시" },
];

interface CourseWithPlaces {
  id: string;
  title: string;
  date: string;
  time: string;
  places: Place[];
}

export default function CreatePost() {
  const navigate = useNavigate();
  const [showMyPage, setShowMyPage] = useState(false);
  const [photoList, setPhotoList] = useState<File[]>([]);
  const [isPublic, setIsPublic] = useState<null | boolean>(null); // 공개(true) / 비공개(false) / 선택 없음(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showSavedCourse, setShowSavedCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseWithPlaces | null>(null);

  const handleCourseShowModal = () => {
    setShowSavedCourse(true);
  };

  const handleCourseCloseModal = () => {
    setShowSavedCourse(false);
  };

  const addPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && photoList.length < 10) {
      setPhotoList([...photoList, event.target.files[0]]);
    }
  };

  // 공개 또는 비공개 선택
  const toggleVisibility = (value: boolean) => {
    setIsPublic((prev) => (prev === value ? null : value)); // 같은 버튼 클릭 시 해제
  };
  // 사진 삭제
  const removePhoto = (index: number) => {
    setPhotoList(photoList.filter((_, i) => i !== index));
  };

  const toggleItem = (label: string) => {
    setSelectedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]));
  };

  const handleShowModal = () => {
    setShowMyPage(true);
  };

  const handleCloseModal = () => {
    setShowMyPage(false);
  };

  const handleSelectCourse = (course: CourseWithPlaces) => {
    setSelectedCourse(course); // 선택된 코스를 state에 저장
    setShowSavedCourse(false); // 모달 닫기
  };

  const handleCreateCourseClick = () => {
    const confirmResult = window.confirm(
      "코스 제작하러 가시면 현재 진행 상황이 저장되지 않으며 코스를 제작 후 다시 포스트를 제작해야 합니다"
    );
    if (confirmResult) {
      navigate("/CreateCourse");
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
          <div>좋아요</div>
          <div onClick={handleShowModal}>마이페이지</div>
        </div>
      </div>
      <div className={style.section}>
        <div className={style.title}>포스트 제작</div>
        <div className={style.info}>
          {/* 좌측 section */}
          <div className={style.leftSection}>
            <h2>포스트 정보를 입력하세요.</h2>
            {/* 공개여부 체크 */}
            <div className={style.anony}>
              <p
                className={`${style.option} ${isPublic === true ? style.active : ""}`}
                onClick={() => toggleVisibility(true)}
              >
                공개
              </p>
              <p
                className={`${style.option} ${isPublic === false ? style.active : ""}`}
                onClick={() => toggleVisibility(false)}
              >
                비공개
              </p>
            </div>
            {/* 제목 입력 */}
            <form className={style.titleForm}>
              <label>
                포스트 제목:
                <input type="text" placeholder="제목을 입력하세요" />
              </label>
            </form>
            {/* 글작성성 */}
            <form className={style.memoForm}>
              <label>
                게시글:
                <textarea placeholder="게시글을 입력하세요 (최대 2000자)" maxLength={2000} rows={5} />
              </label>
            </form>
            {/* 테마 선택*/}
            <div className={style.theme}>
              {categories.map(({ icon, label }) => (
                <div
                  key={label}
                  className={`${style.item} ${selectedItems.includes(label) ? style.selected : ""}`}
                  onClick={() => toggleItem(label)}
                >
                  {icon}
                  {label}
                </div>
              ))}
            </div>
          </div>
          {/* 우측 section */}
          <div className={style.rightSection}>
            <h2>사진과 코스를 선택하세요.</h2>
            {/* 사진 추가 영역 */}
            <div className={style.photoContainer}>
              <div className={style.photoScroll}>
                {photoList.map((photo, index) => (
                  <div key={index} className={style.photoItem} onClick={() => removePhoto(index)}>
                    <img src={URL.createObjectURL(photo)} alt={`Uploaded ${index}`} className={style.photoImage} />
                  </div>
                ))}
                {photoList.length < 10 && (
                  <label className={style.photoItem}>
                    <input type="file" accept="image/*" onChange={addPhoto} hidden />
                    <RiImageAddFill className={style.icon} />
                  </label>
                )}
              </div>
            </div>
            <div className={style.course}>
              {!selectedCourse ? (
                <>
                  <button onClick={handleCourseShowModal}>저장된 코스 불러오기</button>
                  <button onClick={handleCreateCourseClick}>새 코스 만들기</button>
                </>
              ) : (
                <div className={style.coursePlaces}>
                  <h3>📍 선택된 코스: {selectedCourse.title}</h3>
                  {selectedCourse.places.map((place) => (
                    <div key={place.id} className={style.card}>
                      <img src={place.imageUrl} alt={place.name} />
                      <div className={style.info}>
                        <h3>{place.name}</h3>
                        <p>{place.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 모달이 열리면 MyPage 컴포넌트를 모달로 표시 */}
      {showMyPage && (
        <>
          <div className={style.overlay} onClick={handleCloseModal}></div>
          <MyPage onClose={handleCloseModal} />
        </>
      )}
      {/* 모달이 열리면 SavedCourse 컴포넌트를 모달로 표시 */}
      {showSavedCourse && <SavedCourse onClose={handleCourseCloseModal} onSelectCourse={handleSelectCourse} />}
    </div>
  );
}
