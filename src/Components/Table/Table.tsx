import React, {FC, useState} from 'react';
import { Restaurant } from '../../types';
import RestaurantRow from '../RestaurantRow';
import './Table.css';

interface IProps {
    restaurants: Restaurant[],
    page: number
}

const Table: FC<IProps> = ({restaurants, page}) => {

    return (
        <div className="restaurant-table">
            <h2>Restaurants</h2>
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
        </div>
    )
}

export default Table;
