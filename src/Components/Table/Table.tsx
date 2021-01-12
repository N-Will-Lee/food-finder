import React, {FC} from 'react';
import { Restaurant, sortByOptions } from '../../types';
import RestaurantRow from '../RestaurantRow';
import './Table.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faGripLines } from "@fortawesome/free-solid-svg-icons";

interface IProps {
    restaurants: Restaurant[],
    page: number,
    loading: boolean,
    error: boolean,
    sortBy: {field: string, ascending: boolean},
    setSortBy: React.Dispatch<React.SetStateAction<sortByOptions>>
}

const Table: FC<IProps> = ({restaurants, page, loading, error, sortBy, setSortBy}) => {
    const handleSort = (fieldStr: string) => {
        if (sortBy.field === fieldStr) {
            setSortBy({...sortBy, ascending: !sortBy.ascending});
        } else {
            setSortBy({field: fieldStr, ascending: true});
        }
    }

    return (
        <div className="restaurant-table">
            <h2>Restaurants</h2>
            <Loader
                visible={loading}
                className="spinner"
                type="Rings"
                color="#004c94"
                height={100}
                width={100}
            />
            {!loading && !error && (
                <table className="restaurant-table">
                    <thead>
                        <tr>
                            <th>
                                Name
                                <button
                                    className="sort-arrow"
                                    onClick={() => {handleSort("name")}}
                                >
                                    <FontAwesomeIcon icon={sortBy.field === "name" ? (sortBy.ascending ? faSortUp : faSortDown) : faGripLines} size="sm"></FontAwesomeIcon>
                                </button>
                            </th>
                            <th>
                                City
                                <button
                                    className="sort-arrow"
                                    onClick={() => {handleSort("city")}}
                                >
                                    <FontAwesomeIcon icon={sortBy.field === "city" ? (sortBy.ascending ? faSortUp : faSortDown) : faGripLines} size="sm"></FontAwesomeIcon>
                                </button>
                            </th>
                            <th>
                                State
                                <button
                                    className="sort-arrow"
                                    onClick={() => {handleSort("state")}}
                                >
                                    <FontAwesomeIcon icon={sortBy.field === "state" ? (sortBy.ascending ? faSortUp : faSortDown) : faGripLines} size="sm"></FontAwesomeIcon>
                                </button>
                                </th>
                            <th>Phone Number</th>
                            <th>Genres</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant: Restaurant, i: number, arr: Restaurant[]) => {
                            while (i < page * 10 && i >= (page * 10)-10 ) {
                                return <RestaurantRow restaurant={restaurant} key={i}/>
                            }
                        })}
                    </tbody>
                </table>
            )}
            {error && (
                <span>There was an error loading restaurants</span>
            )}
        </div>
    )
}

export default Table;
