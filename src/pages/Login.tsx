import axios from "axios";
import { FormEvent, useRef } from "react";

// import { useNavigate } from "react-router-dom";

const Login = () => {
    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    //const navigate = useNavigate();

    const submitHandler = (e:FormEvent) => {
        e.preventDefault();
        
        if(idRef.current && pwRef.current) {
            const URL = "http://localhost:8000/";
            axios.post(URL + "api/auth/login/", {
                email : idRef.current.value,
                password : pwRef.current.value
            })
            .then((res) => {
                const accessToken = res.data.access_token;
                sessionStorage.setItem("access-token", accessToken);
                sessionStorage.setItem("user", JSON.stringify(res.data.user));
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err);
                alert(err);
            })
        }
    }

    return (
        <div>
            <form onSubmit={(e)=>{submitHandler(e)}}>
                <div className="mb-2"><input ref={idRef} type="text" placeholder="이메일"/></div>
                <div className="mb-2"><input ref={pwRef} type="password"  placeholder="패스워드"/></div>
                <div><input type="submit" value={"로그인"} /></div>
            </form>
        </div>
    )
}

export default Login;