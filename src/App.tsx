import React, { useEffect, useState, useReducer } from "react";
import { useGetRestaurants, useSortRestaurants, useGetFilterOptions, useFilteredRestaurants } from "./hooks";
import { filterReducer } from "./reducers";
import Table from "./Components/Table";

import "./App.css";


function App() {
    const [sortBy, setSortBy] = useState({field: "name", ascending: true});
    const [page, setPage] = useState(1);
    const [searchBy, setSearchBy] = useState("");
    const [filters, dispatchFilters] = useReducer(filterReducer, []);

    const [restaurants, loadingRestaurants, error] = useGetRestaurants();
    const [filterOptions, loadingFilters] = useGetFilterOptions(restaurants);
    const [filteredRestaurants, loadingFilteredRestaurants] = useFilteredRestaurants(restaurants, filters);
    const sortedRestaurants = useSortRestaurants(filteredRestaurants, sortBy.field, sortBy.ascending);

    useEffect(() => {
        document.title = "Food Finder";
    }, []);

    const handleSearchTerm = (e: React.ChangeEvent<any>) => {
        if (e.target.value === "") {
            dispatchFilters({modification: "clear-search", filterPayload: {type: "search", value: ''}});
        }
        setSearchBy(e.target.value);
    };

    const handleSearch = () => {
        dispatchFilters({modification: "clear-search", filterPayload: {type: "search", value: ''}});
        dispatchFilters({modification: "add", filterPayload: {type: "search", value: searchBy}});
    }



    return (
        <div className="App">
            <h1 className="title">Food Finder</h1>
            {loadingRestaurants ? <p>Loading</p> : (
                <nav className="select-filters">
                    <label htmlFor="restaurant-search">Search Restaurants:</label>
                    <input
                        type="search"
                        id="restaurant-search"
                        value={searchBy}
                        onChange={handleSearchTerm}
                        aria-label="Search through site content"
                    >
                    </input>
                    <button onClick={handleSearch}>Search</button>

                    <button onClick={() => dispatchFilters({modification: "add", filterPayload: {type: "search", value: "ap"}})}>add "sushi" filter</button>
                    <button onClick={() => dispatchFilters({modification: "reset", filterPayload: {type: "", value: ""}})}>reset filters</button>
                    <button onClick={() => console.log("filterOptions: ", filterOptions)}>show filters</button>
                    <button onClick={() => console.log("active filterOptions: ", filters)}>show active filters</button>
                </nav>
            )}

            <section className="active-filters">
                <h2>Active Filters</h2>
                {filters.map((filter, i) => {
                    return <button key={i} onClick={() => dispatchFilters({modification: "remove", filterPayload: {type: filter.type, value: filter.value}})}>{filter.type} - {filter.value} X</button>
                })}
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
