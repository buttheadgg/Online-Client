import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Grid,
  Icon,
  Image
} from "@chakra-ui/react";
import { Context } from "../../index";
import {
  createDevice,
  fetchBrands,
  fetchTypes,
} from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
import TrashIcon from '../../assets/icons8-trash-24.png';


const CreateDevice = observer(({ isOpen, onClose }) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, [device]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("info", JSON.stringify(info));
    console.log(formData.getAll("img"));
    createDevice(formData).then(onClose);
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить устройство</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton isActive={isOpen} as={Button}>
                    {device.selectedType.name
                      ? device.selectedType.name
                      : "Выберете тип"}
                  </MenuButton>
                  <MenuList>
                    {device.types.map((type) => (
                      <MenuItem
                        onClick={() => device.setSelectedType(type)}
                        key={type.id}
                      >
                        {type.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          </FormControl>
          <FormControl mt={4}>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton isActive={isOpen} as={Button}>
                  {device.selectedBrand.name
                      ? device.selectedBrand.name
                      : "Выберете бренд"}
                  </MenuButton>
                  <MenuList>
                    {device.brands.map((brand) => (
                      <MenuItem
                        onClick={() => device.setSelectedBrand(brand)}
                        key={brand.id}
                      >
                        {brand.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
          </FormControl>
          <FormControl mt={4}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название устройства"
            />
          </FormControl>
          <FormControl mt={4}>
            <Input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Введите стоимость устройства"
              type="number"
            />
          </FormControl>
          <FormControl mt={4}>
            <Input pt="4px" type="file" onChange={selectFile} />
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={addInfo}>
            Добавить характеристику устройства
          </Button>
          {info.map((i) => (
            <Grid templateColumns="1fr 1fr 0.33fr" gap={1} key={i.number}>
              <FormControl mt={4}>
                <Input
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите название свойства"
                />
              </FormControl>
              <FormControl mt={4}>
                <Input
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание свойства"
                />
              </FormControl>
              <Button width="50px" mt={4} onClick={() => removeInfo(i.number)} ml='5px'>
              <Image src={TrashIcon}/>
              </Button>
            </Grid>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={addDevice} >
            Сохранить
          </Button>
          <Button onClick={onClose}>Закрыть</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default CreateDevice;
