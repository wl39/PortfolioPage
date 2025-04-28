import { useState } from "react"

import { Link } from "react-router-dom"
import Card from "../../components/Card/Card";

import goolge from "../../assets/login/web_neutral_sq_SI@4x.png"
import kakao from "../../assets/login/kakao_login_large_narrow.png"
import naver from "../../assets/login/btnG_official.png"

import styles from "./LoginForm.module.css"
import Input from "../../components/Input/Input";

const LoginForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    return <>
        <form>
            <Card propStyles={styles.inputContainer}>
                <Input placeholder="Username" type="text" value={id} onChange={(e) => setId(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => {
                    console.log("Login 버튼 클릭");
                }}>Login</button>

                <button className={styles.oauthButton}>
                    <img className={styles.oauthImage} src={naver} alt="naver_sign_in" />
                </button>
                <button className={styles.oauthButton}>
                    <img className={styles.oauthImage} src={kakao} alt="kakao_sign_in" />
                </button>
                <button className={styles.oauthButton}>
                    <img className={styles.oauthImage} src={goolge} alt="google_sign_in" />
                </button>
                <Link to="/signup">Sign Up</Link>
            </Card>
        </form>
    </>
}

export default LoginForm
