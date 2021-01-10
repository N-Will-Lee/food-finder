import React, { useEffect, useState, useReducer } from "react";
import { useGetRestaurants, useSortRestaurants, useGetFilterOptions, useFilteredRestaurants } from "./hooks";
import { filterReducer } from "./reducers";
import Table from "./Components/Table";

import "./App.css";


function App() {
    const [sortBy, setSortBy] = useState({field: "name", ascending: true});
    const [page, setPage] = useState(1);
    const [filters, dispatchFilters] = useReducer(filterReducer, []);

    const [restaurants, loadingRestaurants, error] = useGetRestaurants();
    const [filterOptions, loadingFilters] = useGetFilterOptions(restaurants);
    const [filteredRestaurants, loadingFilteredRestaurants] = useFilteredRestaurants(restaurants, filters);
    const sortedRestaurants = useSortRestaurants(filteredRestaurants, sortBy.field, sortBy.ascending);

    useEffect(() => {
        document.title = "Food Finder";
    }, []);



    return (
        <div className="App">
            <h1 className="title">Food Finder</h1>
            {loadingRestaurants ? <p>Loading</p> : (
                <nav className="select-filters">
                    <h2>Sort By: </h2>
                    <button onClick={() => setSortBy({...sortBy, field: "city"})}>field: city</button>
                    <button onClick={() => setSortBy({...sortBy, field: "name"})}>field: name</button>
                    <button onClick={() => setSortBy({...sortBy, ascending: true})}>ascending</button>
                    <button onClick={() => setSortBy({...sortBy, ascending: false})}>descending</button>
                    <button onClick={() => dispatchFilters({modification: "add", filterPayload: {type: "search", value: "ap"}})}>add "sushi" filter</button>
                    <button onClick={() => dispatchFilters({modification: "reset", filterPayload: {type: "", value: ""}})}>reset filters</button>
                    <button onClick={() => console.log("filterOptions: ", filterOptions)}>show filters</button>
                    <button onClick={() => console.log("active filterOptions: ", filters)}>show active filters</button>
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
