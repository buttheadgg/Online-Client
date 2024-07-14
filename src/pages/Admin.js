import { Button, Container} from "@chakra-ui/react";
import React, { useState } from "react";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  return (
    <Container display="flex">
      <Button mt="4px" onClick={() => setTypeVisible(true)}>
        Добавить тип
      </Button>
      <Button mt="4px" ml="4px" mr="4px" onClick={() => setBrandVisible(true)}>
        Добавить бренд
      </Button>
      <Button mt="4px" onClick={() => setDeviceVisible(true)}>
        Добавить устройство
      </Button>

      <CreateType isOpen={typeVisible} onClose={() => setTypeVisible(false)} />
      <CreateBrand
        isOpen={brandVisible}
        onClose={() => setBrandVisible(false)}
      />
      <CreateDevice
        isOpen={deviceVisible}
        onClose={() => setDeviceVisible(false)}
      />
    </Container>
  );
};

export default Admin;
