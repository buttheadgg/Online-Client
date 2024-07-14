import React, { useContext, useState } from "react";
import {
  Card,
  Container,
  Input,
  Box,
  Button,
  Link,
  Stack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/core";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { useLocation, useNavigate } from "react-router-dom";
import { login, registration} from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      if (isLogin) {
        const { token } = await login(email, password); 
        user.token = token; 
      } else {
        const { token } = await registration(email, password); 
        user.token = token; 
      }
      user.setUser(user);
      user.setIsAuth(true);
      history(SHOP_ROUTE);
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        alert(e.response.data.message);
      } else {
        alert('Произошла ошибка. Попробуйте позже.'); 
      }
    }
  };

  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="90vh"
      width="100%"
      maxWidth="1000px"
      mx="auto"
    >
      <Card>
        <Box mx="auto" fontSize={28}>
          {isLogin ? "Авторизация" : "Регистрация"}
        </Box>
        <Stack
          pb="3"
          pr="3"
          pl="2"
          display="flex"
          direction={["column"]}
          gap={"5"}
        >
          <FormControl mt="7">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              type="email"
              id="email"
              aria-describedby="email-helper-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              aria-describedby="password-helper-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Box display="flex" justifyContent="space-between" width="100%">
            {isLogin ? (
              <Box as="div" flex="none">
                Нет аккаунта?{" "}
                <Link color="teal.500" href={REGISTRATION_ROUTE}>
                  Зарегистрируйтесь!
                </Link>
              </Box>
            ) : (
              <Box as="div" flex="none">
                Есть аккаунт?{" "}
                <Link color="teal.500" href={LOGIN_ROUTE}>
                  Войти
                </Link>
              </Box>
            )}
            <Button colorScheme="teal" width="100px" ml="auto" onClick={click}>
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
});

export default Auth;
