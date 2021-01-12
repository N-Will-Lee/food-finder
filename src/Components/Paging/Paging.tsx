import React, {FC, useEffect, useState} from 'react';
import { Restaurant } from '../../types';
import "./Paging.css";


interface IProps {
    restaurants: Restaurant[],
    rowCount: number,
    setPage: (value: React.SetStateAction<number>) => void
}

const Paging: FC<IProps> = ({restaurants, rowCount, setPage}) => {
    const [activeButton, setActiveButton] = useState(0);

    useEffect(() => {
        setActiveButton(0);
        setPage(1);
    }, [restaurants])

    const handleClick = (idx: number) => {
        setPage(idx/10 % 10+1);
        setActiveButton(idx);
    }

    return (
        <nav className="paging">
            {restaurants.map((restaurant, i) => {
                if (i % 10 === 0 ){
                    return <button className={activeButton === i ? "active-page" : ""} key={i} onClick={() => handleClick(i)}>{i/10 % 10+1}</button>
                }
            })}
        </nav>
    )
}

export default Paging;
