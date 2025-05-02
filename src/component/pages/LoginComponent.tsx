import React from "react";
import style from "../less/LoginComponent.module.less";

interface LoginComponentProps {
  onBack: () => void; // 뒤로가기 또는 초기 화면 복귀 용
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onBack }) => {
  return (
    <div className={style.loginContainer}>
      <h2 className={style.title}>로그인</h2>
      <form className={style.form}>
        <input type="email" placeholder="이메일" className={style.input} />
        <input type="password" placeholder="비밀번호" className={style.input} />
        <button type="submit" className={style.button}>
          로그인
        </button>
      </form>
      <div className={style.footer}>
        <span>회원이 아니신가요?</span>
        <button onClick={onBack} className={style.link}>
          뒤로가기
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
