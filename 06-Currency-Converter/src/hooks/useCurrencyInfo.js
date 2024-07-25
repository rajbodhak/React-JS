import { useEffect, useState } from "react";

const useCurrencyInfo = function(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/15e3364f6763159013f02b14/latest/${currency}`)
        .then((res) => res.json())
        .then((res) => setData(res["conversion_rates"]))
    },[currency])
    console.log(data);
    return data;
}

export  default useCurrencyInfo;