import React, {useEffect, useState, useRef, useCallback, useMemo} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import classes from './Home.module.css'

const tours=[
    {
        date:"Aug 16",
        show:"DETROIT,MI",
        place:"DTE ENERGY MUSIC THEATRE"
    },
    {
        date:"Aug 19",
        show:"TORONTO,ON",
        place:"BUDWEISER STAGE"
    },
    {
        date:"Aug 21",
        show:"BRISTOW,VA",
        place:"JIGGY LUBE LIVE"
    },
    {
        date:"Aug 25",
        show:"LAS VEGAS,NV",
        place:"T-MOBILE ARENA"
    },
    {
        date:"Aug 29",
        show:"CONCORD,CA",
        place:"CONCORD PAVILION"
    }
]
const Home=(props)=>{

    const [movies,setMovies]=useState([]);
    const [isLoading, setLoading]=useState(false);
    const [error, setError]=useState(null);
    const retryTimeoutIdRef=useRef(null);
    
    const fetchMoviesHandler=useCallback(async()=>{
        try {
            setLoading(true)
            setError(null)
            const response= await fetch('https://swapi.py4e.com/api/films/')
            if(!response.ok)
            {
                throw new Error({message:"Something went wrong...Retrying"})
            }
            const data= await response.json();
             const transformedMovies=data.results.map(movieData=>{
            return {
                id:movieData.episode_id,
                title:movieData.title,
                openingText:movieData.opening_crawl,
                releaseDate:movieData.release_date
            }
          })
          setMovies(transformedMovies)
          setLoading(false)
        } catch (error) {
            console.log(error);
            setError("Something went wrong....Retrying");
            setLoading(false);
        }
    },[])

    useEffect(()=>{
        fetchMoviesHandler();
    },[fetchMoviesHandler]);

    const cancelRetryHandler=()=>{
        if(retryTimeoutIdRef.current){
            clearTimeout(retryTimeoutIdRef.current);
            retryTimeoutIdRef.current=null;
        }
        setError(null);
    }

    useEffect(()=>{
      if(error)
      {
        const timeoutId=setTimeout(()=>{
           fetchMoviesHandler();
        },5000)
        retryTimeoutIdRef.current=timeoutId;
        return ()=>clearTimeout(timeoutId);
      }
    },[error, fetchMoviesHandler])

    const movieList=useMemo(()=>{
        return movies.map((movie)=>(
                        <Row key={movie.id}>
                            <Col>{movie.title}</Col>
                            <Col>{movie.openingText}</Col>
                            <Col>{movie.releaseDate}</Col>
                        </Row>
    ))},[movies])

    let content=<p>No Movies</p>

    if(error){
        content=<>
        <p>{error}</p>
        <Button onClick={cancelRetryHandler}>Cancel</Button>
    </>
    }
    if(isLoading)
    {
        content=<p>Loading....</p>
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <h2>Get our Latest Album</h2>
            </div>
            <Container>
                <h3>TOURS</h3>
                <Col>
                    {tours.map((tour,index)=>{
                        return <Row key={index} className="d-flex justify-content-between mb-3">
                            <Col>{tour.date}</Col>
                            <Col>{tour.show}</Col>
                            <Col>{tour.place}</Col>
                            <Col>
                            <Button>BUY TICKETS</Button>
                            </Col>  
                        </Row>
                    })}
                </Col>
            </Container>
            <Button onClick={fetchMoviesHandler}>Get Movies</Button>
           {!isLoading && <Container>
                <Col>{movieList}</Col>
            </Container>}
            {content}
        </React.Fragment>
    )

}


export default Home