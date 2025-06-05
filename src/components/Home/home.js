import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import classes from './Home.module.css'
import Movies from "./Movies";

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
           <Movies/>
        </React.Fragment>
    )

}


export default Home