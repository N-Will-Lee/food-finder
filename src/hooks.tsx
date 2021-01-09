import { useEffect, useState } from "react";
import { Restaurant } from "./types";


export const useGetRestaurants = (): [boolean, Restaurant[], string] => {

    const [loading, setLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([] as Restaurant[])
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);

        async function getData(url = '') {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Authorization": "Api-Key q3MNxtfep8Gt"
                }
            });
            return response.json();
        }

        getData("https://code-challenge.spectrumtoolbox.com/api/restaurants")
        .then((response) => {
            setRestaurants(response);
        })
        .catch((err) => {
            console.log("get restaurants error: ", err);
            setError(err);
        })
        .finally(() => setLoading(false))
    }, []);

    return [loading, restaurants, error];
};

export const useSortRestaurants = (restaurants: Restaurant[], field: string, ascending: boolean): Restaurant[] => {
    const [sortedRestaurants, setSortedRestaurants] = useState([] as Restaurant[]);

    useEffect(() => {
        let restaurantArr = restaurants;
        restaurantArr.sort((a, b) => {
            let restaurantA = a[field].toUpperCase();
            let restaurantB = b[field].toUpperCase();
            let returnValue = 0;

            restaurantA < restaurantB && (returnValue = -1);
            restaurantA > restaurantB && (returnValue = 1);
            !ascending && (returnValue = returnValue * -1);

            return returnValue;
        });
        setSortedRestaurants(restaurantArr);
    }, [restaurants, field, ascending])

    return sortedRestaurants;
}
