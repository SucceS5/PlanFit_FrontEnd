import style from "../less/Post.module.less";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPage from "../component/pages/MyPage";

export default function Post() {
  const navigate = useNavigate();
  const [showMyPage, setShowMyPage] = useState(false);

  const handleShowModal = () => {
    setShowMyPage(true);
  };

  const handleCloseModal = () => {
    setShowMyPage(false);
  };

  return (
    <div className={style.container}>
      <div className={style.function}>
        <div className={style.header} onClick={() => navigate("/MainPage")}>
          PlanFit
        </div>
        <div className={style.body}>
          <div>포스트</div>
          <div onClick={() => navigate("/Course")}>코스</div>
          <div onClick={() => navigate("/Like")}>좋아요</div>
          <div onClick={handleShowModal}>마이페이지</div>
        </div>
      </div>
      <div className={style.section}>
        <div className={style.searchBar}>
          <input type="text" placeholder="키워드를 검색하세요" />
          <button>검색</button>
        </div>
        <div className={style.filter}>
          <button>포스트 보기</button>
          <button>장소 보기</button>
          <button>사용자 보기</button>
        </div>
        <div className={style.result}></div>
      </div>

      {/* 모달이 열리면 MyPage 컴포넌트를 모달로 표시 */}
      {showMyPage && (
        <>
          <div className={style.overlay} onClick={handleCloseModal}></div>
          <MyPage onClose={handleCloseModal} />
        </>
      )}
    </div>
  );
}
