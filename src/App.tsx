import React, { useEffect } from "react";
import { useGetRestaurants } from "./hooks";


import "./App.css";

function App() {
    useEffect(() => {
        document.title = "Food Finder";
    }, []);

    const [loading, restaurants, error] = useGetRestaurants();


    return (
        <div className="App">
            {loading ? <p>Loading</p> : <p>Restaurant Table Here</p>}
        </div>
    );
}

export default App;
