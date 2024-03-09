import {useEffect, useState} from "react";

export function useLocal(initialState, key) {
    const [value, setValue] = useState(
        function () {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialState;
    }
    );

    /* HANDLES LOCAL STORAGE*/
    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(value));
    }, [value,key]);
    return [value,setValue]
}