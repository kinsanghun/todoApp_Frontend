import axios from "axios";
import { FormEvent, useRef } from "react";
import { TodoType } from "types/type";

const UpdateModal = (props:{data:TodoType, updateFunc:Function, closeFunc:Function}) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const updateFunction = (e:FormEvent) => {
        e.preventDefault();
        if(titleRef.current && descriptionRef.current && dateRef.current) {
            const URL = "http://localhost:8000/";
            axios.put(URL + "api/todos", {
                id : props.data.id,
                type : "update",
                isChecked : props.data.isChecked,
                title : titleRef.current.value,
                description : descriptionRef.current.value,
                deadline : dateRef.current.value
            })
            .then((res)=>{
                console.log("update true");
                console.log(res.data);
                props.updateFunc(res.data);
                props.closeFunc(false);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
    return (
        <div className=" clear-both fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 p-5 z-[1000]">
            <form className="relative w-96 bg-gray-600 p-5 flex flex-col gap-5 rounded-xl" onSubmit={(e)=>{updateFunction(e)}}>
                <h3 className="text-white text-lg">수정하기</h3>
                <div><input ref={titleRef} type="text" placeholder="제목" className="w-full bg-transparent text-white outline-none border-b-slate-50 border-b" defaultValue={props.data.title}/></div>
                <div><textarea ref={descriptionRef} placeholder="설명" className="w-full min-h-[100px] bg-transparent text-white outline-none border-b-slate-50 border-b"defaultValue={props.data.description}/></div>
                <div><input ref={dateRef} type="date" className="w-full bg-transparent text-white outline-none border-b-slate-50 border-b" defaultValue={props.data.deadline.slice(0, 10)}/></div>
                <div className="w-full flex justify-end gap-3 text-white">
                    <button type="submit">수정</button>
                    <button type="button" onClick={()=>{props.closeFunc(false)}}>취소</button>
                    </div>
            </form>
        </div>
    )
}

export default UpdateModal;