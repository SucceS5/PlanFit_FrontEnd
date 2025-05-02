import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../less/LoginComponent.module.less";

interface LoginComponentProps {
  onBack: () => void; // 뒤로가기 또는 초기 화면 복귀 용
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 제출 동작을 막음
    navigate("/MainPage"); // MainPage로 이동
  };

  return (
    <div className={style.loginContainer}>
      <h2 className={style.title}>로그인</h2>
      <form className={style.form} onSubmit={handleSubmit}>
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
