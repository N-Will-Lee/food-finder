export type Restaurant = {
    [key: string]: any,
    id: string,
    name: string,
    address1: string,
    city: string,
    state: string,
    zip: number,
    lat: number,
    long: number,
    telephone: string,
    tags: string,
    website: string,
    genre: string,
    hours: string,
    attire: string
};

export type FilterOptions = {
    states: string[],
    genres: string[],
    tags: string[]
};

export type FilterOptionsActions = {
    filterType: string,
    filtersPayload: string
}
