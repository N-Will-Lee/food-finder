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
            console.log("got restaurants: ", response)
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
