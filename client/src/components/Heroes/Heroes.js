import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CardGroup} from 'react-bootstrap'
import Hero from './Hero/Hero';
import PaginationButtons from "../Pagination/PaginationButtons";
import {fetchFilteredHeroes} from "../../actions/heroes";
import {SET_NUMBER_OF_PAGES} from "../../constants/actionTypes";

const Heroes = () => {
    const dispatch = useDispatch();
    const heroes = useSelector((state) => state.heroes);
    const page = useSelector((state) => state.page);
    const numberOfPages = useSelector((state) => state.numberOfPages);

    const heroesLength = useSelector(state => state.heroes.length);

    useEffect(() => {
        dispatch(fetchFilteredHeroes(page));
    }, [page, numberOfPages]);


    useEffect(() => {
        dispatch({
            type: SET_NUMBER_OF_PAGES,
            payload: Math.ceil(heroesLength / 5),
        });
    }, [heroesLength]);

    return (<>
            <CardGroup className="d-flex justify-content-center mt-5 mb-3 flex-wrap">
                {heroes.length && heroes.map(hero => (
                    <div key={hero._id}>
                        <Hero hero={hero}/>
                    </div>
                ))}
            </CardGroup>
            <div className="d-flex justify-content-center">
                <PaginationButtons/>
            </div>
        </>
    );
};

export default Heroes;
