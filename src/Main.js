import {useRef} from 'react'
import Calculation from './Calculation';

export default function Main(props){
    const number= useRef();
    const setNo=props.setNo;

    const addData= function(){
        if(number.current.value){
            setNo(number.current.value);
        }
    }

    return (
        <section className="grid grid-flow-col grid-rows-auto grid-cols-1 justify-center m-12">
        <input type="text" ref={number} placeholder="Insert Number Here" className="p-2 row-start-1 mx-20 my-8 rounded-md text-2xl text-center focus:ring-2 focus:ring-green-600  "/>
        <button onClick={()=> addData()} className="p-2 rounded-md bg-green-600 text-white row-start-2 text-2xl mx-56">Calculate</button>
        <div className="row-start-3">
        <Calculation number={props.no} />
        </div>
        </section>);

}