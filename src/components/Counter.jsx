import Button from "./buttons/Button";

export default function Counter ({count, increaseCount}){

    const tryIncrease = ()=>{
        increaseCount()
    }
    
    return <div>
        <p>Count: {count}</p>
        <Button color={'primary'} >
           <span onClick={tryIncrease}>Con Tăng</span> 
        </Button>
    </div>
}

// Event Bus
// Data Drilling