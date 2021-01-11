import React, { useEffect, useState, useReducer } from "react";
import { useGetRestaurants, useSortRestaurants, useGetFilterOptions, useFilteredRestaurants } from "./hooks";
import { filterReducer } from "./reducers";
import Table from "./Components/Table";

import "./App.css";


function App() {
    const [sortBy, setSortBy] = useState({field: "name", ascending: true});
    const [page, setPage] = useState(1);
    const [searchBy, setSearchBy] = useState("");
    const [selectedFilterCategory, setSelectedFilterCategory] = useState("");
    const [selectedFilterValue, setSelectedFilterValue] = useState("default");
    const [displayedFilterValues, setDisplayedFilterValues] = useState([] as string[]);
    const [filters, dispatchFilters] = useReducer(filterReducer, []);

    const [restaurants, loadingRestaurants, error] = useGetRestaurants();
    const [filterOptions, loadingFilters] = useGetFilterOptions(restaurants);
    const [filteredRestaurants, loadingFilteredRestaurants] = useFilteredRestaurants(restaurants, filters);
    const sortedRestaurants = useSortRestaurants(filteredRestaurants, sortBy.field, sortBy.ascending);

    useEffect(() => {
        document.title = "Food Finder";
    }, []);

    useEffect(() => {
        switch (selectedFilterCategory) {
            case "state":
                setDisplayedFilterValues(filterOptions.states);
                return;
            case "genre":
                setDisplayedFilterValues(filterOptions.genres);
                return;
            case "tags":
                setDisplayedFilterValues(filterOptions.tags);
                return;
            default:
                return;
        }
    }, [selectedFilterCategory]);

    const handleSearchTerm = (e: React.ChangeEvent<any>) => {
        if (e.target.value === "") {
            dispatchFilters({modification: "clear-search", filterPayload: {type: "search", value: ''}});
        }
        setSearchBy(e.target.value);
    };

    const handleEnter = (e: React.KeyboardEvent<any>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        dispatchFilters({modification: "clear-search", filterPayload: {type: "search", value: ''}});
        dispatchFilters({modification: "add", filterPayload: {type: "search", value: searchBy}});
    };

    const handleFilterCategory = (e: React.ChangeEvent<any>) => {
        setSelectedFilterCategory(e.target.value);
    };

    const handleFilterValue = (e: React.ChangeEvent<any>) => {
        if (e.target.value !== "default") {
            dispatchFilters({modification: "add", filterPayload: {type: selectedFilterCategory, value: e.target.value}});
            setSelectedFilterValue("default");
        }
    };

    return (
        <div className="App">
            <h1 className="title">Food Finder</h1>
            {loadingRestaurants ? <p>Loading</p> : (
                <nav className="select-filters">
                    <input
                        type="search"
                        id="restaurant-search"
                        placeholder="name, city, or genre"
                        value={searchBy}
                        onChange={handleSearchTerm}
                        onKeyDown={handleEnter}
                        aria-label="Search through site content"
                    >
                    </input>
                    <button onClick={handleSearch}>Search</button>
                    <select onChange={handleFilterCategory} value={selectedFilterCategory}>
                        <option value="default">Filter By:</option>
                        <option value="state">State</option>
                        <option value="genre">Genre</option>
                        <option value="tags">Tag</option>
                    </select>
                    <select onChange={handleFilterValue} value={selectedFilterValue}>
                        {!selectedFilterCategory ? (
                            <option value="default">Choose Filter Type</option>
                        ) : (
                            <option value="default">Choose</option>
                        )}
                        {displayedFilterValues && (
                            displayedFilterValues.map((option) => {
                                return <option value={option}>{option}</option>
                            })
                        )}
                    </select>
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
