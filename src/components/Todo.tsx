import axios from "axios";
import { Dispatch, useState } from "react"
import { TodoType } from "types/type"
import { IoIosArrowDown } from "react-icons/io";
import UpdateModal from "./UpdateModal";


export const Todo = (props: { data: TodoType, setTodoList: Dispatch<React.SetStateAction<TodoType[]>> }) => {
    const [dataState, setDataState] = useState<TodoType>(props.data);
    const [isChecked, setIsChecked] = useState(props.data.isChecked);
    const [showDetail, setShowDetail] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const checkHandler = () => {
        setIsChecked(prev => !prev);

        const URL = process.env.REACT_APP_API_BASE_URL;
        axios.put(URL + "todos", {
            id: props.data.id,
            type: "checked",
            isChecked: isChecked
        })
            .then((res) => { console.log(res.data); })
            .catch((err) => { console.log(err); })
    }
    const updateHandler = () => {
        setShowModal(prev => true);
    }

    const deleteHandler = () => {
        const select = window.confirm("이 할 일을 삭제할까요?");
        if (!select) return;
        else {
            const URL = process.env.REACT_APP_API_BASE_URL;
            axios.delete(URL + "todos", { data: { id: dataState.id } })
                .then(res => {
                    props.setTodoList(prev => {
                        const newData = prev.filter(data => data.id !== props.data.id);
                        return newData;
                    });
                })
                .catch(err => { console.log(err) });
        }
    }
    const DetailButton = (props: { title: string, callback: Function }) => {
        return (<button type="button" onClick={() => { props.callback() }}>{props.title}</button>)
    }

    return (
        <div className="relative rounded-xl mb-3">
            <div className="relative flex gap-3 justify-between bg-gray-100 p-4 rounded-xl z-10  shadow-lg">
                <div><input type="checkbox" checked={isChecked} onChange={() => { checkHandler() }} /></div>
                <div className={`flex-1 ${isChecked ? "text-gray-300 line-through" : ""}`}>{dataState.title}</div>
                <div>{dataState.deadline.slice(0, 10)}</div>
                <div className={`flex items-center transition-all ${showDetail ? "" : "rotate-180"}`} onClick={() => { setShowDetail(prev => !prev) }}><IoIosArrowDown /></div>
            </div>
            <div className={`relative -top-3 w-full px-7 overflow-hidden rounded-b-xl shadow-2xl text-white bg-gray-600 ${showDetail ? " h-52 px-3 py-6" : "h-0 px-3"}`} style={{ transition: "0.6s", zIndex: 0 }}>
                <div className="mb-4">{dataState.description}</div>
                <div>등록일자 : {dataState.createdAt.slice(0, 10)}</div>
                <div>최종 업데이트 : {dataState.updatedAt.slice(0, 10)}</div>
                <div className="absolute bottom-0 right-0 p-5 flex gap-5">
                    <DetailButton title="수정" callback={updateHandler} />
                    <DetailButton title="삭제" callback={deleteHandler} />
                </div>
            </div>

            {showModal ? <UpdateModal data={props.data} updateFunc={setDataState} closeFunc={setShowModal} /> : null}
        </div>
    )
}