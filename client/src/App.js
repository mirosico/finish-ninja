import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Form from './components/Form/Form';
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import HeroDetails from "./components/HeroDetails/HeroDetails";
import {Spinner} from 'react-bootstrap'
import {useSelector} from 'react-redux';
import Footer from './components/Footer/Footer'

const App = () => {
    const isLoading = useSelector(state => state.isLoading)

    return (<div>
            <BrowserRouter>
                <Navigation/>
                {isLoading && <Spinner animation="border" role="status" id="spinner">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
                <Routes>
                    <Route path="/" exact element={<Navigate to="/heroes"/>}/>
                    <Route path="/heroes" exact element={<Home/>}/>
                    <Route path="/details/:id" exact element={<HeroDetails/>}/>
                    <Route path="/set/:id" exact element={<Form/>}/>
                    <Route path="/set" exact element={<Form/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
};

export default App;