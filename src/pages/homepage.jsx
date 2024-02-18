/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ProductList } from "../components/product";
import { Button, Center, Flex, Spinner } from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import { ModalInputProduct } from "../components/modal";
import { api } from "../api/axios";
import Pagination from "../components/pagination";
export const HomePage = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      setTimeout(async () => {
        const res = await api.get("/products/search", {
          params: { q: search, limit: 20, skip: (page - 1) * 20 },
        });
        setProducts([...res.data.products]);
        setTotalPages(Math.ceil(res.data.total / 20));
        setLoading(false);
      }, 800);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [search, currentPage]);

  const handlePageChange = (newPage) => {
    setLoading(true);
    setTimeout(() => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        fetchProducts(newPage);
      } else {
        setLoading(false);
      }
    }, 500);
  };
  return (
    <>
      <Center flex={"flex"} flexDirection={"column"} marginTop={"35px"}>
        <Button colorScheme="green" onClick={onOpen}>
          Add Product
        </Button>
        {loading ? (
          <Center mt={4}>
            <Spinner size="lg" />
          </Center>
        ) : (
          <ProductList
            search={search}
            products={[...products]}
            fetchProducts={fetchProducts}
            setProducts={setProducts}
          />
        )}
        <Flex justifyContent={"right"} bgColor={"blue"}></Flex>
        <ModalInputProduct
          isOpen={isOpen}
          onClose={onClose}
          fetchProducts={fetchProducts}
        />
      </Center>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
