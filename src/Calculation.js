
import React, { useEffect, useState } from "react";
import db from './firebase';

export default function Calculation(props) {
    var newNumber = props.number;
    const [res, setRes] = useState({
        mean: 0,
        median: 0,
        mode: 0,
        stdDev: 0
    });

    useEffect(() => {

        const fetchdata = async () => {
            const response = db.collection("numberList");
            const data = await response.get();
            let arr = [];
            data.docs.forEach(element => {
                arr.push(element.data());

            });

            //Adding Newnumber to the Array
            if (newNumber !== 0) {
               arr.push({no:parseInt(newNumber)});
            }
            setRes({
                ...res,
                mean: calMean(arr),
                median: calMedian(arr),
                mode: calMode(arr),
                stdDev: getStandardDeviation(arr)
            });

        }
        fetchdata();
    }, [newNumber]);


    //Calculates the Mean
    const calMean = (arr) => {
        var sum = (arr.reduce((a, v) => a = a + v.no, 0));
        var len = (newNumber !== 0 ? arr.length + 1 : arr.length);
        var mean = (sum + parseInt(newNumber)) / len;
        if (arr === null || arr === undefined)
            return 0;
        else
            return mean.toFixed(4);
    }

    //Calculates the Median
    const calMedian = (arr) => {
        let n=arr.length;
        let mid = parseInt(n / 2);

        //Soritng the Array
        for (let i = 0; i < n; i++) {
            //Inner pass
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j + 1].no < arr[j].no) {
                    //Swapping
                    [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
                }
            }
        }

        var median = (n % 2 === 0 ? (arr[mid].no + arr[mid - 1].no) / 2 : arr[mid].no);
        return median.toFixed(4);
    }

    //Calculatin of Mode
    const calMode = (arr) => {
        
        const count = {};
        arr.forEach(e => {
            if (!(e.no in count)) {
                count[e.no] = 0;
            }

            count[e.no]++;
        });

        console.log(count)
        let bestElement = 0.0;
        let bestCount = 0;

        Object.entries(count).forEach(([k, v]) => {
            console.log(k,v)
            if (v > bestCount && v > 1) {
                bestElement = k*1.0;
                bestCount = v;
            }
        });
        return bestElement.toFixed(4);
    };

    //Standard Deviation
    const getStandardDeviation = (array) => {
        console.log(array);
        const n = array.length;
        const mean = calMean(array);
        let number=Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b.no) / n);
        

        return number.toFixed(4);
    }

return (
    <>
        <table className="border-4 border-dashed border-green-800 p-10 m-20 w-4/5 text-center">
            <tbody className="p-10" >
                <tr className="border-2 p-10" >
                    <td className="p-6 font-bold text-xl">Mean</td>
                    <td className="">{res.mean}</td>
                </tr>
                <tr className="border-2">
                    <td className="p-6 font-bold text-xl">Median</td>
                    <td className="">{res.median}</td>
                </tr>
                <tr className="border-2">
                    <td className="p-6 font-bold text-xl">StdDev</td>
                    <td className="">{res.stdDev}</td>
                </tr>
                <tr className="border-2">
                    <td className="p-6 font-bold text-xl">Mode</td>
                    <td className="">{res.mode}</td>
                </tr>
            </tbody>
        </table>
    </>
);
}