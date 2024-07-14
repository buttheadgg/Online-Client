import { Grid} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import DeviceItem from "../components/DeviceItem";
import { Context } from "../index";

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={5} ml='20px'>
      {device.devices.map((device) => (
        <DeviceItem key={device.id} device={device}/>
      ))}
    </Grid>
  );
});

export default DeviceList;
