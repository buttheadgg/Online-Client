import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Card } from "@chakra-ui/react";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <div display="flex">
      {device.brands.map((brand) => (
        <Card
        ml='20px'
        mt='1px'
        width='150px'
        border='1px' 
        key={brand.id}
        style={{cursor: 'pointer'}}
        isActive={brand.id === device.selectedBrand.id}
        sx={{ backgroundColor: brand.id === device.selectedBrand.id ? 'teal.200' : 'transparent' }}
        onClick={() => device.setSelectedBrand(brand)}
        >{brand.name}</Card>
      ))}
    </div>
  );
});

export default BrandBar;
