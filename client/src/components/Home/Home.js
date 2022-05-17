import Heroes from "../Heroes/Heroes";
import {Link} from "react-router-dom";
import React from 'react';

const Home = () => {

    return <>
        <h1>SuperHeroes</h1>
        <div className="underline mb-5"></div>
        <Link to="/set" className="button new touch"/>
        <Heroes/>
    </>
}

export default Home;