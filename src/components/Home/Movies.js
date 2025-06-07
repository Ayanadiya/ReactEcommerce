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
            const response= await fetch("http://127.0.0.1:4000/myshop/movies")
            if(!response.ok)
            {
                throw new Error({message:"Something went wrong...Retrying"})
            }
            const data= await response.json();
            console.log(data);
          setMovies(data);
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

    const deleteMovieHandler= async (id)=>{
        try {
            const response=await fetch(`http://127.0.0.1:4000/myshop/deletemovie/${id}`,{
                method:'DELETE'
            })
            if(!response.ok)
            {
                throw new Error('Failed to delete');
            }
            if(response.status===200)
            {
                const data=movies.filter((movie)=> movie._id!==id);
                setMovies(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate=(releaseDate)=>{
        const date=new Date(releaseDate);
        const day=String(date.getDate()).padStart(2,'0');
        const month=String(date.getMonth()+1).padStart(2,'0');
        const year=date.getFullYear();
        return `${day}/${month}/${year}`
    }

    const movieList=useMemo(()=>{
        return movies.map((movie)=>(
                        <Row key={movie._id}>
                            <Col>{movie.title}</Col>
                            <Col>{movie.openingText}</Col>
                            <Col>{formatDate(movie.releaseDate)}</Col>
                            <Col><Button onClick={()=>{deleteMovieHandler(movie._id)}}>Delete</Button></Col>
                        </Row>
    ))},[movies, deleteMovieHandler])

    let content=<p>No Movies</p>

    if(movies.length>0)
    {
        content=<></>;
    }

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
    const formSubmitHandler=async (event)=>{
        event.preventDefault();
        const newMovie={
            title,
            openText,
            releaseDate
        }
        console.log(newMovie)
        try {
            const response= await fetch("http://127.0.0.1:3000/myshop/movie",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(newMovie)
            })
            if(!response.ok)
            {
                throw new Error('Network response was not Ok')
            }
            const data=await response.json();
            setMovies((prev)=>[...prev,data]);
        } catch (error) {
            console.log(error);
        }
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