import style from "../less/Like.module.less";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPage from "../component/pages/MyPage";

export default function Like() {
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
          <div onClick={() => navigate("/Post")}>포스트</div>
          <div onClick={() => navigate("/Course")}>코스</div>
          <div>좋아요</div>
          <div onClick={handleShowModal}>마이페이지</div>
        </div>
      </div>
      <div className={style.section}>
        <div className={style.title}>좋아요</div>
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
