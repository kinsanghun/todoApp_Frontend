import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userType } from "types/type";

export const Profile = () => {
    const isLogin = sessionStorage.getItem("access-token");
    const [userInfo, setUserInfo] = useState<userType>();

    useEffect(()=>{
            if(isLogin) {
                const user = sessionStorage.getItem("user");
                if(user) {
                    const parse = JSON.parse(user);
                    setUserInfo(prev => parse);
                }
            }
    }, [])

    const logoutHandler = () => {
        const URL = "http://localhost:8000/";
        axios.post(URL + "api/auth/logout/")
        .then((res) => {
            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("user");
            window.location.reload();
        }).
        catch((err) => {
            alert(err);
        })
        
    }
    return (
        <div className="flex items-center">
             {isLogin ?
             <>
                <div className="mr-3 w-6 h-6">
                    <img 
                        className="w-full h-full object-cover rounded-full"
                        src="profile.jpeg" 
                        alt="img"
                    />
                </div>
                <div className=" text-gray-600">{userInfo?.last_name} {userInfo?.first_name}</div>
                <span onClick={()=>{logoutHandler()}} className="ml-5 underline underline-offset-2 cursor-pointer">Logout</span>
             </> : <Link to="/login" className=" underline underline-offset-2">Login</Link>
             }
        </div>
    )
}