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
            <h1 className="title">Food Finder</h1>
            {loading ? <p>Loading</p> : (
                <nav className="select-filters">
                    <h2>Sort By: </h2>
                    <button onClick={() => setSortBy({...sortBy, field: "city"})}>field: city</button>
                    <button onClick={() => setSortBy({...sortBy, field: "name"})}>field: name</button>
                    <button onClick={() => setSortBy({...sortBy, ascending: true})}>ascending</button>
                    <button onClick={() => setSortBy({...sortBy, ascending: false})}>descending</button>
                    <button onClick={() => console.log("sorted restaurants: ", sortedRestaurants)}>logem</button>
                </nav>
                    )}

            <section className="active-filters">
                <h2>Active Filters</h2>
            </section>
            <Table restaurants={sortedRestaurants} />
            <nav className="paging">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
            </nav>

        </div>
    );
}

export default App;
