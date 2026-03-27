import React, {useState} from 'react'
export default function MyWords() {

    // useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]

    // const fakeUseState = (initValue)=>{
    //     root.state1 = initValue // biến giá trị gốc lưu vào root để listen

    //     const setState1 = (newValue)=>{ // hàm DUY NHẤT CÓ THỂ THAY ĐỔI GIÁ TRỊ CỦA state1
    //         root.state1 = newValue
    //     }

    //     const snapshotOfState1 = deepCopy(root.state1) // bản sao giá trị tại một thời điểm xác định\

    //     return [snapshotOfState1, setState1]
    // }

    // const [myCounter, setMyCounter] = fakeUseState(10)
    // myCounter là: là snapShot của state1
    // setMyCounter là: hàm DUY NHẤT có thể thay đổi giá trị state1
    

    let [myCounter, setMyCounter] = useState(0) // DESTRUCTORING

  // state
  const increase = ()=>{
    setMyCounter(myCounter += 1)
    // myCounter += 1
  }
  const decrease = ()=>{
    
    setMyCounter(myCounter -= 1)
    // myCounter -= 1
  }
  const info = ()=>{
    alert(`Curent counter is: ${myCounter}`)
  }

  // View
  return (
    <>
      <p>Counter: {myCounter}</p>

      <div>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
        <button onClick={info}>Show</button>
      </div>
    </>
  );
}
