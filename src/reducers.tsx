import { FilterOptions, FilterOptionsActions, FilterActions, Filter } from "./types";


export const filterOptionsReducer = (filterOptions: FilterOptions, action: FilterOptionsActions) => {
    switch (action.filterType) {
        case 'states':
            let state: string = action.filtersPayload;
            let statesArr: string[] = filterOptions.states;
            !filterOptions.states.includes(state) && (statesArr.push(state));

            return {...filterOptions, states: statesArr.sort()}

        case 'genres':
            let genresArr: string[] = action.filtersPayload.split(',')
            let newGenres = genresArr.filter((genre) => {
                return !filterOptions.genres.includes(genre);
            });

            return {...filterOptions, genres: filterOptions.genres.concat(newGenres).sort()}

        case 'tags':
            let tagsArr: string[] = action.filtersPayload.split(',')
            let newTags = tagsArr.filter((tag) => {
                return !filterOptions.tags.includes(tag)
            });

            return {...filterOptions, tags: filterOptions.tags.concat(newTags).sort()}

        case 'attire':
            let attire: string = action.filtersPayload;
            let attireArr: string[] = filterOptions.attire;
            !filterOptions.attire.includes(attire) && (attireArr.push(attire));

            return {...filterOptions, attire: attireArr.sort()}

        default:
            return filterOptions;
    }
}

export const filterReducer = (filters: Filter[], action: FilterActions) => {
    switch (action.modification) {
        case "add":
            let newFilters = [...filters];
            if (!filters.some((activeFilter) => {
                return activeFilter.type === action.filterPayload.type && activeFilter.value === action.filterPayload.value;
            })) {
                newFilters.push(action.filterPayload);
            }

            return newFilters;

        case "remove":
           return filters.filter((activeFilter) => {
               return activeFilter.value !== action.filterPayload.value;
           });

        case "clear-search":
            return filters.filter((activeFilter) => {
                return activeFilter.type !== action.filterPayload.type
            })

        case "reset":
            return [] as Filter[];

        default:
            return [...filters];
    }
}
