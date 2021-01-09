import React, {FC, useState} from 'react';
import { Restaurant } from '../types';
import RestaurantRow from './RestaurantRow';


interface IProps {
    restaurants: Restaurant[]
}

const Table: FC<IProps> = ({restaurants}) => {

    return (
        <table>
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
                    return <RestaurantRow restaurant={restaurant} key={i}/>
                })}
            </tbody>
        </table>
    )
}

export default Table;
