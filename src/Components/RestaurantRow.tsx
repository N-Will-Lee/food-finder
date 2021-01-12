import React, {FC} from 'react';
import { Restaurant } from '../types';


interface IProps {
    restaurant: Restaurant
}

const RestaurantRow: FC<IProps> = ({restaurant}) => {

    return (
        <tr>
            <th>{restaurant.name}</th>
            <th>{restaurant.city}</th>
            <th>{restaurant.state}</th>
            <th>{restaurant.telephone}</th>
            <th>{restaurant.genre.replaceAll(",", ", ")}</th>
        </tr>
    )
}

export default RestaurantRow;
