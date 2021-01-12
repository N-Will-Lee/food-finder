import React, {FC, useState} from 'react';
import { Restaurant } from '../../types';
import RestaurantRow from '../RestaurantRow';
import './Table.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

interface IProps {
    restaurants: Restaurant[],
    page: number,
    loading: boolean
}

const Table: FC<IProps> = ({restaurants, page, loading}) => {

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
            {!loading && (
                <table className="restaurant-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>State</th>
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
        </div>
    )
}

export default Table;
