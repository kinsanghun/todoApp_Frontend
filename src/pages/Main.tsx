import axios from "axios";
import { Todo } from "components/Todo";
import { FormEvent, useEffect, useRef, useState } from "react";
import { TodoType } from "types/type";

const Main = () => {
    const [todoList, setTodoList] = useState<TodoType[]>([]);

    const titleRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        const token = sessionStorage.getItem("access-token");
        if (token) {
            const json = sessionStorage.getItem("user");
            if (json) {
                const user = JSON.parse(json);
                const URL = "http://localhost:8000/"

                axios.get(URL + "api/todos", { params: { email: user.email } })
                .then(res => { 
                    setTodoList(res.data); 
                    
                })
                .catch(error => { console.log(error) })
            }
        }
    }, [])

    const createTodoHandler = (e:FormEvent) => {
        e.preventDefault();

        if(titleRef.current && dateRef.current && descriptionRef.current) {
            const json = sessionStorage.getItem("user");
            if(json) {
                const user = JSON.parse(json);
                const formData = {
                    user : user.email,
                    title : titleRef.current.value,
                    date : dateRef.current.value,
                    description : descriptionRef.current.value,
                }

                const URL = "http://localhost:8000/"
                axios.post(URL + "api/todos", formData)
                .then((res) => {
                    setTodoList(res.data);
                })
                .catch((err) => {console.log(err)})
            }
            titleRef.current.value = "";
            dateRef.current.value = "";
            descriptionRef.current.value = "";
            
        }
    }


    return (
        <div>
            <form className="mb-5" onSubmit={(e:FormEvent)=>{createTodoHandler(e)}}>
                <div className="relative bg-gray-100 p-5 rounded-lg">
                    <div className="w-full flex justify-between items-center mb-3">
                        <div className="flex flex-1"><input className="w-full bg-transparent outline-none" type="text" placeholder="할 일을 입력해주세요" ref={titleRef}/></div>
                        <div className="flex gap-5"><input type="date" className=" bg-transparent outline-none" ref={dateRef}/></div>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div className="flex-1"><input className=" bg-transparent w-full outline-none" type="text" placeholder="description" ref={descriptionRef}/></div>
                        <div><input className="bg-blue-400 text-white px-3 py-1 rounded-lg" type="submit" value="저장" /></div>
                    </div>
                </div>
            </form>
            {
                todoList.map(data => {
                    return (
                        <Todo
                            key={data.id}
                            data={data}
                            setTodoList={setTodoList}
                        />
                    )
                })
            }
        </div>
    )
}

export default Main;