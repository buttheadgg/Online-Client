import React, { useContext } from 'react';
import { Button, ButtonGroup, Box, Flex } from '@chakra-ui/react'
import { Context } from '../index';
import {observer} from 'mobx-react-lite'
import {useNavigate } from "react-router-dom"
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
    }

    return (
        <>
        <Box bg="teal.500" px={4} >
          <Flex h={14} alignItems={"center"} justifyContent={"space-between"} >
            
            <ButtonGroup position="fixed" left={0} ml='30px'>
            <Button fontSize='24px' variant='link' color="white" onClick={() => history(SHOP_ROUTE)}> buttheadgg </Button>
            </ButtonGroup>
 
            {user.isAuth ?
                <ButtonGroup position="fixed" right={0} mr='15px'>
                <Button bg="teal.700" color="white" _hover={{ bg: "teal.900" }} onClick={() => history(ADMIN_ROUTE)}> Админ Панель </Button>
                <Button bg="teal.700" color="white" _hover={{ bg: "teal.900" }} onClick={() => logOut()}> Выйти </Button>
                </ButtonGroup>
            :
                <ButtonGroup spacing={4} position="fixed" right={0} mr='15px'>
                <Button bg="teal.700" color="white" _hover={{ bg: "teal.400" }} onClick={() => history(LOGIN_ROUTE)}> Авторизация </Button>
                </ButtonGroup>
            }
          </Flex>
        </Box>
      </>
    );
});

export default NavBar;