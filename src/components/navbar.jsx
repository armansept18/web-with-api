/* eslint-disable react/prop-types */
import { Center } from "@chakra-ui/react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Link,
} from "@chakra-ui/react";
import magnifier from "../assets/magnifier.png";
import logo from "../assets/ka-logo.png";
import profile from "../assets/profile.png";
import burger from "../assets/burger.png";

export const Navbar = ({ setSearch }) => {
  return (
    <Box
      justifyContent={"space-between"}
      borderBottom={"1px solid #ebebeb"}
      alignItems={"center"}
      height={"50px"}
      position={"sticky"}
      top={0}
      zIndex={"100"}
      w={"full"}
      className="hidden lg:flex"
      bgColor={"white"}
    >
      <InputGroup marginLeft={"32px"} height={"18px"} maxW={"317px"}>
        <InputLeftElement pointerEvents="none" height={"100%"}>
          <img src={magnifier} width="14px" height="14px" alt="" />
        </InputLeftElement>
        <Input
          border={"0px"}
          _focus={{
            boxShadow: "none",
          }}
          placeholder="Type any products here"
          height={"100%"}
          onKeyPress={(e) => {
            if (e.key == "Enter") setSearch(e.target.value);
          }}
        />
      </InputGroup>

      <Center position={"absolute"} width={"100%"} zIndex={"-1"}>
        <Center zIndex={0}>
          <Link
            textDecor="none"
            _hover={{ textDecor: "none", fontSize: "17px", color: "green" }}
            padding={"0px 16px"}
          >
            Home
          </Link>
          <Link
            textDecor={"none"}
            padding={"0px 16px"}
            _hover={{ textDecor: "none", fontSize: "17px", color: "green" }}
          >
            Products
          </Link>
          <Link
            textDecor={"none"}
            padding={"0px 16px"}
            _hover={{ textDecor: "none", fontSize: "17px", color: "green" }}
          >
            <img
              src={logo}
              width={"32px"}
              height={"32px"}
              style={{ borderRadius: "50%" }}
            />
          </Link>

          <Link
            textDecor={"none"}
            padding={"0px 16px"}
            _hover={{ textDecor: "none", fontSize: "17px", color: "green" }}
          >
            About Us
          </Link>
          <Link
            textDecor={"none"}
            padding={"0px 16px"}
            _hover={{ textDecor: "none", fontSize: "17px", color: "green" }}
          >
            Contact
          </Link>
        </Center>
      </Center>

      <Center marginRight={"32px"}>
        <img
          src={profile}
          alt=""
          width={"18px"}
          style={{ borderRadius: "50%", objectFit: "cover", height: "18px" }}
        />

        <Box marginLeft={"8px"}> test@mail.com</Box>
      </Center>
    </Box>
  );
};

export const NavbarMobile = () => {
  return (
    <Box
      justifyContent={"space-between"}
      borderBottom={"1px solid #ebebeb"}
      alignItems={"center"}
      height={"50px"}
      position={"sticky"}
      top={0}
      w={"full"}
      className="flex lg:hidden"
      bgColor={"white"}
    >
      <img
        style={{ marginLeft: "32px" }}
        src={magnifier}
        width={"24px"}
        height={"24px"}
      />

      <img
        src={logo}
        width={"24px"}
        height={"24px"}
        style={{ borderRadius: "50%" }}
      />

      <img
        src={burger}
        width={"24px"}
        height={"24px"}
        style={{ marginRight: "32px" }}
      />
    </Box>
  );
};
