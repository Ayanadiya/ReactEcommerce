import React, {useEffect, useState, useRef, useCallback, useMemo} from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Movies=()=>{
    const [movies,setMovies]=useState([]);
    const [isLoading, setLoading]=useState(false);
    const [error, setError]=useState(null);
    const retryTimeoutIdRef=useRef(null);
    const [title, setTitle]=useState("");
    const [openText, setOpenText]=useState("");
    const [releaseDate, setReleaseDate]=useState("");

    const titleChangeHandler=(event)=>setTitle(event.target.value);
    const openTextChangeHandler=(event)=>setOpenText(event.target.value);
    const releaseDateChangeHandler=(event)=>setReleaseDate(event.target.value);
    
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
    const formSubmitHandler=(event)=>{
        event.preventDefault();
        const newMovie={
            title,
            openText,
            releaseDate
        }
        console.log(newMovie)
    }
    return (
        <>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={titleChangeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Opening Text</Form.Label>
                <Form.Control type="text" value={openText} onChange={openTextChangeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Release Date</Form.Label>
                <Form.Control type="date" value={releaseDate} onChange={releaseDateChangeHandler}/>
            </Form.Group>
            <Button variant="primary" onClick={formSubmitHandler}>Add Movie</Button>
        </Form>
        <Button onClick={fetchMoviesHandler}>Get Movies</Button>
        {!isLoading && <Container>
                <Col>{movieList}</Col>
            </Container>}
        {content}
        </>
    )
}

export default Movies;