import { Link, useLocation } from "react-router-dom";
import { MenuType } from "types/type";
import {
    AiFillHome,
    AiTwotoneSetting,
    AiOutlineMenu
} from "react-icons/ai";

const Menu = (props:MenuType) => {
    const location = useLocation();
    const isActive:Boolean = location.pathname === props.url ? true : false;
    return (
        <Link 
            to={props.url} 
            className={`flex py-3 text-xl${isActive ? " text-blue-500 font-semibold" : " text-gray-500 font-light"}`}
        ><div className="flex items-center gap-3 cursor-pointer">{props.icon} {props.menu}</div></Link>
    )
}
const Header = () => {
    const menuList:MenuType[] = [
        {
            id : 1000,
            menu : "Main",
            url : "/",
            icon : <AiFillHome/>

        }, {
            id : 1001,
            menu : "Setting",
            url : "/setting",
            icon : <AiTwotoneSetting/>
        }
    ];

    return (
        <header className=" bg-white w-80 h-screen py-5 px-10">
            <h1 className="flex h-20 gap-3 text-2xl items-center"><AiOutlineMenu/> LOGO</h1>
            <nav>
                {menuList.map(data => (
                    <Menu 
                        key={data.id}
                        id={data.id} 
                        menu={data.menu} 
                        url={data.url}
                        icon={data.icon}
                    />
                ))}
            </nav>
        </header>
    )
}

export default Header;