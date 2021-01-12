import { useEffect, useState, useReducer } from "react";
import { Restaurant, FilterOptions, Filter } from "./types";
import { filterOptionsReducer } from "./reducers";


export const useGetRestaurants = (): [Restaurant[], boolean, boolean] => {

    const [loading, setLoading] = useState<boolean>(false);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [error, setError] = useState<boolean>(false);

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
            setError(true);
        })
        .finally(() => setLoading(false))
    }, []);

    return [restaurants, loading, error];
};

export const useGetFilterOptions = (restaurants: Restaurant[]): FilterOptions => {
    const [filterOptions, dispatchFilterOptions] = useReducer(filterOptionsReducer, { genres: [], states: [], tags: [], attire: [] } as FilterOptions);

    useEffect(() => {
        for (const {state, genre, tags, attire} of restaurants) {
            dispatchFilterOptions({filterType: "states", filtersPayload: state});
            dispatchFilterOptions({filterType: "genres", filtersPayload: genre});
            dispatchFilterOptions({filterType: "tags", filtersPayload: tags});
            dispatchFilterOptions({filterType: "attire", filtersPayload: attire});
        }
    }, [restaurants]);

    return filterOptions;

}

export const useFilteredRestaurants = (restaurants: Restaurant[], filters: Filter[]): Restaurant[] => {
    const [activeRestaurants, setActiveRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        setActiveRestaurants([...restaurants]);
        if (filters.length > 0) {
            let filteredRestaurants = restaurants.filter((restaurant) => {
                let filterMatch = true;
                for (const filter of filters) {
                    let relevantRestaurantCategory = '';
                    if (filter.type === "search") {
                        relevantRestaurantCategory = `${restaurant.name},${restaurant.city},${restaurant.genre}`.toLowerCase();
                    } else {
                        relevantRestaurantCategory = restaurant[filter.type.toLowerCase()].toLowerCase();
                    }
                    if (!relevantRestaurantCategory.includes(filter.value.toLowerCase())) {
                        filterMatch = false;
                    }
                }
                return filterMatch;
            })
            setActiveRestaurants(filteredRestaurants);
        }

    },[restaurants, filters])

    return activeRestaurants;
}

export const useSortRestaurants = (restaurants: Restaurant[], field: string, ascending: boolean): Restaurant[] => {
    const [sortedRestaurants, setSortedRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        let restaurantArr = [...restaurants];
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
