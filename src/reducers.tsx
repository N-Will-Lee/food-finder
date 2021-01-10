import { Restaurant, FilterOptions, FilterOptionsActions, FilterActions, Filter } from "./types";


export const filterOptionsReducer = (filterOptions: FilterOptions, action: FilterOptionsActions) => {
    switch (action.filterType) {
        case 'states':
            let state: string = action.filtersPayload;
            let statesArr: string[] = filterOptions.states;
            !filterOptions.states.includes(state) && (statesArr.push(state));

            return {...filterOptions, states: statesArr}
        case 'genres':
            let genresArr: string[] = action.filtersPayload.split(',')
            let newGenres = genresArr.filter((genre) => {
                return !filterOptions.genres.includes(genre);
            });

            return {...filterOptions, genres: filterOptions.genres.concat(newGenres)}
        case 'tags':
            let tagsArr: string[] = action.filtersPayload.split(',')
            let newTags = tagsArr.filter((tag) => {
                return !filterOptions.tags.includes(tag)
            });

            return {...filterOptions, tags: filterOptions.tags.concat(newTags)}
        default:
            return filterOptions;
    }
}

export const filterReducer = (filters: Filter[], action: FilterActions) => {
    switch (action.modification) {
        case "add":
            if (!filters.some((activeFilter) => {
                return activeFilter.type === action.filterPayload.type && activeFilter.value === action.filterPayload.value;
            })) {
                filters.push(action.filterPayload);
            }
            return filters;
        case "subtract":
           return filters.filter((activeFilter) => {
               return activeFilter.type !== action.filterPayload.type && activeFilter.value !== action.filterPayload.value
           });
        case "reset":
            return [] as Filter[];
        default:
            return filters;
    }
}
