import style from "../less/MainPage.module.less";

export default function MainPage() {
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
      </div>
    </div>
  );
}
