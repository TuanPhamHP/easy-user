import './App.css'
import Todo from './components/Todo';
import Button from './components/buttons/Button';
import Counter from './components/Counter';
import { useState } from 'react';

function App() {
  const [parentCount, setParentCount] = useState(0)
 
  const increase = ()=>{
    setParentCount(parentCount+ 1)
  }
  return (
    <>
    <h1>Todo App</h1>
    <div>
      <Counter count={parentCount} increaseCount={increase} />
      <Button color={'secondary'} >
        <span onClick={increase}>Cha Tăng</span> 
      </Button>
      {/* <Button color="primary" >
        <span>Xác nhận</span>
      </Button>
      <Button color="secondary">
        <span> Hủy</span>
        </Button> */}
    </div>
    </>
  )
}

export default App

// <PageWrapper>
//   <SideBar/>
//   {props.children}

// </PageWrapper>