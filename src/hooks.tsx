import { useEffect, useState, useReducer } from "react";
import { Restaurant, FilterOptions } from "./types";
import { filterOptionsReducer } from "./reducers";


export const useGetRestaurants = (): [Restaurant[], boolean, string] => {

    const [loading, setLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([] as Restaurant[]);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);

        const getData = async (url = '') => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Authorization": "Api-Key q3MNxtfep8Gt"
                }
            });
            return response.json();
        }

        getData("https://code-challenge.spectrumtoolbox.com/api/restaurants")
        .then((restaurantsResponse: Restaurant[]) => {
            setRestaurants(restaurantsResponse);
        })
        .catch((err) => {
            console.log("get restaurants error: ", err);
            setError(err);
        })
        .finally(() => setLoading(false))
    }, []);

    return [restaurants, loading, error];
};

export const useGetFilterOptions = (restaurants: Restaurant[]): [FilterOptions, boolean] => {
    const [loading, setLoading] = useState(false);
    const [filterOptions, dispatchFilterOptions] = useReducer(filterOptionsReducer, { genres: [], states: [], tags: [] } as FilterOptions);

    useEffect(() => {
        setLoading(true);
        for (const {state, genre, tags} of restaurants) {
            dispatchFilterOptions({filterType: "states", filtersPayload: state});
            dispatchFilterOptions({filterType: "genres", filtersPayload: genre});
            dispatchFilterOptions({filterType: "tags", filtersPayload: tags});
        }
    }, [restaurants]);

    return [filterOptions, loading]

}

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
