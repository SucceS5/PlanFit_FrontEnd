import style from "../less/MyPage.module.less";

interface MyPageProps {
  onClose: () => void;
}

export default function MyPage({ onClose }: MyPageProps) {
  return (
    <div className={style.modalBackground} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h2>포스트 생성하기</h2>
        {/* 포스트 생성하기 내용 추가 */}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
