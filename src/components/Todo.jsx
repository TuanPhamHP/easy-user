import { useState } from "react"

const todoWrapper = {
    border: '1px solid #000',
    borderRadius: '4px',
    padding: '6px 12px',
    width: 'fit-content'
}

export default function Todo() {
    const [task, setTask] = useState({
        content:'Thực hành ReactJS 100 tiếng liên tục',
        isDone: false,
    })

    const finish = ()=>{
        // shallow copy là được vì không có nested ref value
        const newValue = {...task}
        newValue.isDone = true
        setTask(newValue)
    }

    const redo = ()=>{
        setTask({...task, isDone: false})
    }

    const renderListBtn = ()=>{
        if (task.isDone) {
            return <button onClick={redo}>Re-do</button>
        }
        return <button onClick={finish}>Hoàn thành</button> 
    }
    
    return <div style={todoWrapper} className='' >
			<p>Nội dung: {task.content}</p>

            {/* Hiển thị trạng thái hiện tại */}
			<p>Trạng thái: {task.isDone ? 'Đã xong' : 'Chưa làm'}</p>
            {renderListBtn()}
		</div>
}