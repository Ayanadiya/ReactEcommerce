import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

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
            <div>
                <h2>Get our Latest Album</h2>
            </div>
            <Container>
                <h3>TOURS</h3>
                <Row>
                    {tours.map((tour,index)=>{
                        return <Col key={index}>
                            <p>{tour.date}</p>
                            <p>{tour.show}</p>
                            <p>{tour.place}</p>
                            <Button>BUY TICKETS</Button>
                        </Col>
                    })}
                </Row>
            </Container>
        </React.Fragment>
    )
}


export default Home;