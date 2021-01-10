import React, { useEffect, useState } from "react";
import { useGetRestaurants, useSortRestaurants } from "./hooks";
import { Restaurant } from "./types";
import Table from "./Components/Table";

import "./App.css";

function App() {
    const [sortBy, setSortBy] = useState({field: "name", ascending: true});
    const [page, setPage] = useState(1)

    const [loading, restaurants, filterOptions, error] = useGetRestaurants();
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
                    <button onClick={() => console.log("filterOptions: ", filterOptions)}>show filters</button>
                </nav>
                    )}

            <section className="active-filters">
                <h2>Active Filters</h2>
            </section>
            <Table restaurants={sortedRestaurants} page={page}/>
            <nav className="paging">
                <button onClick={() => setPage(1)}>1</button>
                <button onClick={() => setPage(2)}>2</button>
                <button onClick={() => setPage(3)}>3</button>
                <button onClick={() => setPage(4)}>4</button>
                <button onClick={() => setPage(5)}>5</button>
                <button onClick={() => setPage(6)}>6</button>
            </nav>

        </div>
    );
}

export default App;
