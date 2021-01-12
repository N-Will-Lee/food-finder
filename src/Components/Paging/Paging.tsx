import React, {FC} from 'react';
import { Restaurant } from '../../types';


interface IProps {
    restaurants: Restaurant[],
    rowCount: number,
    setPage: (value: React.SetStateAction<number>) => void
}

const Paging: FC<IProps> = ({restaurants, rowCount, setPage}) => {
    return (
        <nav className="paging">
            {restaurants.map((restaurant, i) => {
                if (i % 10 === 0 ){
                    return <button key={i} onClick={() => setPage(i/10 % 10+1)}>{i/10 % 10+1}</button>
                }
            })}
        </nav>
    )
}

export default Paging;
