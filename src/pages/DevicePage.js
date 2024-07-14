import {
  Button,
  Card,
  Container,
  Grid,
  GridItem,
  Image,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import star from "../assets/star.png";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, [id]);

  return (
    <Container
      mt="30px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={15}>
        <GridItem width="300px" height="300px">
          <Image
            width="300px"
            height="300px"
            src={process.env.REACT_APP_API_URL + device.img}
            alt="123"
          />
        </GridItem>
        <GridItem>
          <h2 style={{ textAlign: "center", fontSize: 24 }}>{device.name}</h2>
          <div
            style={{
              width: "280px",
              height: "260px",
              background: `url(${star}) no-repeat center`,
              backgroundSize: "cover",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
            }}
          >
            {device.raiting}
          </div>
        </GridItem>
        <GridItem>
          <Card
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ textAlign: "center" }}> От: {device.price} руб</h3>
            <Button variant={"outline-dark"}> Добавить в корзину </Button>
          </Card>
        </GridItem>
        <GridItem>
          <h2 style={{ fontSize: 28 }}>Характеристики:</h2>
          {device.info.map((info) => (
            <Box
              key={info.id}
              style={{ borderBottom: "2px solid gray" }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <span>{info.title}: </span>
              <span>{info.description}</span>
            </Box>
          ))}
        </GridItem>
      </Grid>
    </Container>
  );
};

export default DevicePage;
