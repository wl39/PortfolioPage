import { useState } from "react"
import Card from "../Card/Card";
import styles from "./SignUpForm.module.css"

const SignUpForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    return <>
        <Card propStyles={styles.inputContainer}>
            <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
            <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input placeholder="Repeat the password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
        </Card>
    </>
}

export default SignUpForm