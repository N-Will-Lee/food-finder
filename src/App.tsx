import React, { useEffect, useState, useReducer } from "react";
import { useGetRestaurants, useSortRestaurants, useGetFilterOptions, useFilteredRestaurants } from "./hooks";
import { filterReducer } from "./reducers";
import Table from "./Components/Table/Table";

import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


function App() {
    const [sortBy, setSortBy] = useState({field: "name", ascending: true});
    const [page, setPage] = useState(1);
    const [searchBy, setSearchBy] = useState("");
    const [activeSearchTerm, setActiveSearchTerm] = useState("");
    const [selectedFilterCategory, setSelectedFilterCategory] = useState("default");
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
            case "attire":
                setDisplayedFilterValues(filterOptions.attire);
                return;
            default:
                setDisplayedFilterValues([]);
                return;
        }
    }, [selectedFilterCategory]);

    const handleSearchTerm = (e: React.ChangeEvent<any>) => {
        if (e.target.value === "") {
            dispatchFilters({modification: "clear-search", filterPayload: {type: "search", value: ''}});
            setActiveSearchTerm("");
        }
        setSearchBy(e.target.value);
    };

    const handleEnter = (e: React.KeyboardEvent<any>) => {
        if (e.key === "Enter") {
            handleSearch(e);
        }
    };

    const handleSearch = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (searchBy.length > 0) {
            dispatchFilters({modification: "clear-search", filterPayload: {type: "search", value: ''}});
            dispatchFilters({modification: "add", filterPayload: {type: "search", value: searchBy}});
            setActiveSearchTerm(searchBy);
        }
    };

    const handleClearSearch = () => {
        dispatchFilters({modification: "clear-search", filterPayload: {type: "search", value: ''}});
        setActiveSearchTerm("");
        setSearchBy("");
    }

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
            <section className="filter-row">
                <nav className="filter-inputs">
                    <form className="search-form">
                        <input
                            type="search"
                            id="restaurant-search"
                            placeholder="Search name, city, or genre"
                            value={searchBy}
                            onChange={handleSearchTerm}
                            onKeyDown={handleEnter}
                            aria-label="Search through site content"
                        >
                        </input>
                        <button onClick={handleSearch}>Search</button>
                    </form>
                    <form className="filters-form">
                        <select className="filter-categories" onChange={handleFilterCategory} value={selectedFilterCategory}>
                            <option key={0} value="default">Filter By:</option>
                            <option key={1} value="state">State</option>
                            <option key={2} value="genre">Genre</option>
                            <option key={3} value="tags">Tag</option>
                            <option key={4} value="attire">Attire</option>
                        </select>
                        <select onChange={handleFilterValue} value={selectedFilterValue}>
                            {selectedFilterCategory === "default" ? (
                                <option value="default">Choose Filter Type</option>
                            ) : (
                                <option value="default">Choose</option>
                            )}
                            {displayedFilterValues && (
                                displayedFilterValues.map((option, i) => {
                                    return <option key={i} value={option}>{option}</option>
                                })
                            )}
                        </select>
                    </form>
                </nav>
                {activeSearchTerm && (
                    <span className="active-search-term">Showing results for <em className="search-term">{activeSearchTerm}</em><button className="clear-search" onClick={() => handleClearSearch()}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button></span>
                )}
            </section>
            <section className="active-filters">
                <h2>Active Filters</h2>
                {filters.map((filter, i) => {
                    if (filter.type !== "search") {
                        return (
                            <button
                                className="filter-button"
                                key={i}
                                onClick={() => dispatchFilters({modification: "remove", filterPayload: {type: filter.type, value: filter.value}})}
                            >
                                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                <span>{filter.value}</span>
                            </button>
                        )
                    }
                })}
            </section>
            <Table restaurants={sortedRestaurants} page={page} loading={loadingRestaurants}/>
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
