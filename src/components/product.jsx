/* eslint-disable react/prop-types */
import { Center, Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { ModalInputProduct } from "./modal";
export const ProductCard = ({ product, fetchProducts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center
        flexDir={"column"}
        maxWidth={"233px"}
        maxH={"239px"}
        padding={"20px 0px"}
        fontSize="14px"
        onClick={onOpen}
        cursor={"pointer"}
      >
        <Box maxW={"400px"} maxH={"400px"} padding={"0px 15px 0px 0px"}>
          <img
            style={{
              maxWidth: "150px",
              maxHeight: "150px",
              width: "100vw",
              height: "100vh",
              objectFit: "contain",
            }}
            src={product.thumbnail}
            alt=""
          />
        </Box>
        <Box
          fontWeight="500"
          w={"100%"}
          maxWidth={"400px"}
          padding={"0px 20px"}
        >
          <Box marginBottom={"8px"}>
            <h2 style={{ marginBottom: "8px" }}>{product.title}</h2>
          </Box>

          <span style={{ color: "#159953" }}>
            $ {Number(product.price)?.toLocaleString()}
          </span>
        </Box>
      </Center>
      <ModalInputProduct
        isOpen={isOpen}
        onClose={onClose}
        fetchProducts={fetchProducts}
        id={product.id}
      />
    </>
  );
};

export const ProductList = ({ products = [], fetchProducts }) => {
  return (
    <Grid className="grid-cols-2 sm:grid-cols-4">
      {products?.map((product, idx) => (
        <GridItem key={idx}>
          <a>
            <ProductCard product={product} fetchProducts={fetchProducts} />
          </a>
        </GridItem>
      ))}
    </Grid>
  );
};
