import { useState, useEffect } from "react";

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        if (Array.isArray(json)) {
            json.map(item => {
                item.id = item._id;
            });
        }
        if (json._id) json.id = json._id;
        setData(json);
        setTimeout(() => {
            console.log('JSON:', json, 'ROWS:', data);
        }, 1000);
        setLoading(false);
    }
    useEffect(() => {
        fetchUrl().then();
    }, []);
    return [data, setData, loading, setLoading];
}

export { useFetch };
