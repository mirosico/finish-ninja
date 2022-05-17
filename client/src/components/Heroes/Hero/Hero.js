import React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import {defaultImg} from '../../../constants/defaultImg';
import {Card, ButtonGroup, Button} from 'react-bootstrap'
import {deleteHero} from '../../../actions/heroes';

const Hero = ({hero}) => {
    const dispatch = useDispatch();

    return (
        <Card style={{width: '15rem', height: "17rem"}} className="text-center m-1 hero-container">
            <Link to={`/details/${hero._id}`}>
                <Card.Img variant="top" className="p-3 px-4" style={{maxHeight: "10rem", height: "10rem"}}
                          src={hero.images[0] || defaultImg}/>
            </Link>
            <Card.Body>
                <Card.Title className="mb-3">{hero.nickname}</Card.Title>
                <ButtonGroup className="w-100">
                    <Link to={`/set/${hero._id}`} type="button" size="sm" className="btn btn-warning w-50">Edit</Link>
                    <Button variant="danger" className="w-50" size="sm"
                            onClick={() => dispatch(deleteHero(hero._id))}>Delete</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
};

export default Hero;
