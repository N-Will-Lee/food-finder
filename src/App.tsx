import React, { useEffect, useState } from "react";
import { useGetRestaurants, useSortRestaurants } from "./hooks";
import { Restaurant } from "./types";
import Table from "./Components/Table";

import "./App.css";

function App() {
    const [sortBy, setSortBy] = useState({field: "name", ascending: true});

    const [loading, restaurants, error] = useGetRestaurants();
    const sortedRestaurants = useSortRestaurants(restaurants, sortBy.field, sortBy.ascending);

    useEffect(() => {
        document.title = "Food Finder";
    }, []);





    return (
        <div className="App">
            <h1>Food Finder</h1>
            {loading ? <p>Loading</p> : <p>Sort By:</p>}
            <button onClick={() => setSortBy({...sortBy, field: "city"})}>field: city</button>
            <button onClick={() => setSortBy({...sortBy, field: "name"})}>field: name</button>
            <button onClick={() => setSortBy({...sortBy, ascending: true})}>ascending</button>
            <button onClick={() => setSortBy({...sortBy, ascending: false})}>descending</button>
            <button onClick={() => console.log("sorted restaurants: ", sortedRestaurants)}>logem</button>
            <Table restaurants={sortedRestaurants} />
        </div>
    );
}

export default App;
