import style from "../less/WelcomePage.module.less";
import { useState } from "react";
import LoginComponent from "../component/pages/LoginComponent";
import SignUpComponent from "../component/pages/SignUpComponent";

export default function WelcomePage() {
  const [mode, setMode] = useState("default"); // 'login', 'signup', or 'default'

  const handleBack = () => {
    setMode("default"); // 초기 화면으로 돌아감
  };

  const renderSectionContent = () => {
    switch (mode) {
      case "login":
        return <LoginComponent onBack={handleBack} />;
      case "signup":
        return <SignUpComponent onBack={handleBack} />;
      default:
        return (
          <>
            <div className={style.planFit}>
              <div className={style.Plan}>플랜</div>
              <div className={style.Fit}>FIT</div>
            </div>
            <div className={style.login}>
              <div className={style.button} onClick={() => setMode("login")}>
                로그인
              </div>
              <div className={style.signUp} onClick={() => setMode("signup")}>
                아직, 회원이 아니신가요?
              </div>
            </div>
          </>
        );
    }
  };
  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.header}>PlanFit</div>
        <div className={style.body}>
          <div className={style.sentence1}>혹시, 어디서 놀지 고민중이니?</div>
          <div className={style.sentence2}>센스 만점인 사람이 되고 싶니?</div>
          <div className={style.sentence3}>보기 쉽게 계획을 짜고 싶다고?</div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.section}>{renderSectionContent()}</div>
      </div>
    </div>
  );
}
