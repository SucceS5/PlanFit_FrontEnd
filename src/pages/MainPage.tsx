import style from "../less/MainPage.module.less";
import { useNavigate } from "react-router-dom";
export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.function}>
        <div className={style.header}>PlanFit</div>
        <div className={style.body}>
          <div>포스트</div>
          <div>코스</div>
          <div>좋아요</div>
          <div>마이페이지</div>
        </div>
      </div>
      <div className={style.section}>
        <h1>당신의 순간을</h1>
        <h1>더 특별하게</h1>
        <h3>앞으로의 일정을 확인해보세요.</h3>
        <div className={style.plan}></div>
        <div className={style.addButtons}>
          <div onClick={() => navigate("/CreateCourse")}>코스 생성하기</div>
          <div>포스트 생성하기</div>
        </div>
      </div>
    </div>
  );
}
