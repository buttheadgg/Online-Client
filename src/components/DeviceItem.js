import { Card, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({device}) => {
  const history = useNavigate();
  return (
    <Card
      width="150px"
      cursor="pointer"
      border="light"
      onClick={() => history(DEVICE_ROUTE + "/" + device.id)}
    >
      <Image width="150px" height="150" src={process.env.REACT_APP_API_URL + device.img} />
      <div>
        <div></div>
        <div>{device.name}</div>
        <div>
          <div>{device.raiting}☆</div>
        </div>
      </div>
    </Card>
  );
};

export default DeviceItem;
