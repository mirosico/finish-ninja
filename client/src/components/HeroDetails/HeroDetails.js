import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Carousel, Card, Container, Row, Col} from 'react-bootstrap'
import {Link, useParams} from "react-router-dom";

import {defaultImg} from "../../constants/defaultImg";
import {getHero} from "../../actions/heroes";

const HeroDetails = () => {
    const {id} = useParams();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getHero(id));
    }, [id])

    const heroDetails = useSelector(state => state.details)
    if (!heroDetails) {
        return null;
    }

    return (<Container className="mt-3 min-vh-100">
            <Row>
                <Col>
                    <Card bg="dark" className="w-50 mx-auto text-center pt-4">
                        <Carousel className="mx-auto" style={{width: '200px', height: 'auto'}}>
                            {!heroDetails.images.length ?
                                (<Carousel.Item>
                                    <Card.Img width="200" height="200" src={defaultImg} alt="banner"/>
                                </Carousel.Item>)
                                :
                                (
                                    heroDetails.images
                                        .map(image =>
                                            <Carousel.Item key={image}>
                                                <Card.Img width="200" height="200" src={image} alt="banner"/>
                                            </Carousel.Item>)

                                )
                            }
                        </Carousel>
                        <Card.Body>
                            <Card.Title
                                className="h2 mb-2 pt-2 font-weight-bold text-primary">{heroDetails.nickname}</Card.Title>
                            <Card.Subtitle className="text-secondary mb-3 font-weight-light text-uppercase"
                                           style={{fontSize: '0.8rem'}}>{heroDetails.real_name}</Card.Subtitle>
                            <Card.Text className="text-secondary mb-4"
                                       style={{fontSize: '0.75rem'}}>{heroDetails.origin_description}</Card.Text>
                            <Card.Text className="text-secondary mb-4"
                                       style={{fontSize: '0.75rem'}}>{heroDetails.superpowers}</Card.Text>
                            <Card.Text className="text-secondary mb-4"
                                       style={{fontSize: '0.75rem'}}>{heroDetails.catch_phrase}</Card.Text>

                            <Link to={`/set/${id}`} className="btn btn-warning">Edit Hero</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HeroDetails;
