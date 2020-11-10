import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useURLLoader = (url: string, deps: any[] = []) => {
    const [data, setData] = useState<any>(null);

    // useHooks, 类似函数调用，结果返回出来便于理解
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(url).then(result => {
            setData(result.data);
            setLoading(false);
        })
    }, deps);
    return [data, loading];
}

export default useURLLoader;