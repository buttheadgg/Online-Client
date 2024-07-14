import React, { useContext } from "react";
import { UnorderedList, ListItem } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <UnorderedList styleType="''">
         {device.types.map(type => 
            <ListItem
            width='150px'
            mt='1px'
            style={{cursor: 'pointer'}}
            isActive={type.id === device.selectedType.id}
            sx={{ backgroundColor: type.id === device.selectedType.id ? 'teal.200' : 'transparent' }}
            onClick={() => device.setSelectedType(type)}
            border='1px' key={type.id}
            >
                {type.name}
            </ListItem>
         )}
    </UnorderedList>
  );
});

export default TypeBar;
