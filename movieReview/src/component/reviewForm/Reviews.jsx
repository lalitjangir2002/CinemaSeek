import {useEffect, useRef,useState,} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import React from 'react';

const Reviews = () => {
    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);

    const getMovieData = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/view/movies/${movieId}`);
            const singleMovie = await response.json();
            setMovie(singleMovie);
            if (Array.isArray(singleMovie.reviews)) {
                setReviews(singleMovie.reviews);
            } else {
                setReviews([]);
            }
        } catch (error) {
            console.error(error);
        }
    }

const revText = useRef();
let params = useParams();
const movieId = params.movieId;

useEffect(() => {
    getMovieData(movieId);
}, []);

const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
        const response = await fetch("http://localhost:8080/api/view/reviews", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reviewBody: rev.value,
                imdbId: movieId,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add review');
        }

        const newReview = await response.json();

        setReviews([...reviews, newReview]);

        rev.value = "";

        console.log(response);
    } catch (err) {
        console.error(err);
    }
};

return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((r,index) => {
                        return(
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>                                
                            </React.Fragment>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>        
    </Container>
)
}

export default Reviews