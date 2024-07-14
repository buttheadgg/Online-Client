import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Box position="fixed" bottom={0} ml='30%' mb='20px' border='1px' borderColor='teal' bg="teal.500" px={20} borderRadius='md' >
      <Flex h={10} alignItems={"center"} justifyContent={"space-between"} >
      <ButtonGroup>
        {pages.map((page) => (
          <Button
            key={page}
            isActive={device.page === page}
            variant={device.page === page ? "" : "solid"}
            colorScheme="teal.700"
            onClick={() => device.setPage(page)}
            color="white" 
            _hover={{ bg: "teal.900" }}
          >
            {page}
          </Button>
        ))}
      </ButtonGroup>
      </Flex>
    </Box>
  );
});

export default Pages;
