import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CardGroup} from 'react-bootstrap'
import Hero from './Hero/Hero';
import PaginationButtons from "../Pagination/PaginationButtons";
import {fetchFilteredHeroes} from "../../actions/heroes";

const Heroes = () => {
    const dispatch = useDispatch();
    const heroes = useSelector((state) => state.heroes);
    const page = useSelector((state) => state.page);

    useEffect(() => {
        dispatch(fetchFilteredHeroes(page));
    }, [page]);



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
