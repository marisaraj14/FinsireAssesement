
import React, { useEffect, useState } from "react";
import db from './firebase';

export default function Calculation(props) {
    var newNumber = props.number;
    const [res, setRes] = useState({
        mean: 0,
        median: 0,
        mode: 0,
        stdDev: 0,
        list: []
    });

    useEffect(() => {

        const fetchdata = async () => {
            const response = db.collection("numberList");
            const data = await response.get();
            let arr = [];
            data.docs.forEach(element => {
                arr.push(element.data().no);
            });

            setRes({
                ...res,
                mean: calMean(arr),
                median: calMedian(arr),
                mode: calMode(arr),
                stdDev: getStandardDeviation(arr),
                list: arr
            });

        }
        fetchdata();
    }, []);

    useEffect(() => {
        //Adding Newnumber to the Array
        let arr = [...res.list];
        if (newNumber !== 0) {
            arr.push(parseInt(newNumber));
            setRes({
                ...res,
                mean: calMean(arr),
                median: calMedian(arr),
                mode: calMode(arr),
                stdDev: getStandardDeviation(arr)
            });

        }

    }, [newNumber]);


    //Calculates the Mean
    const calMean = (arr) => {
        if (arr === null || arr === undefined)
            return 0;
        var sum = (arr.reduce((a, v) => a = a + v, 0));
        var mean = sum / arr.length;
        return mean.toFixed(4);
    }

    //Calculates the Median
    const calMedian = (arr) => {
        let n = arr.length;
        let mid = parseInt(n / 2);
        arr.sort();
        var median = (n % 2 === 0 ? (arr[mid] + arr[mid - 1]) / 2 : arr[mid]);
        return median.toFixed(4);
    }

    //Calculatin of Mode
    const calMode = (arr) => {

        const count = {};
        arr.forEach(e => {
            if (!(e in count)) {
                count[e] = 0;
            }

            count[e]++;
        });

        let bestElement = 0.0;
        let bestCount = 0;

        Object.entries(count).forEach(([k, v]) => {
            if (v > bestCount && v > 1) {
                bestElement = k * 1.0;
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
        let number = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);

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