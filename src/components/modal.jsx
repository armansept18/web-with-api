/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Center,
  useToast,
} from "@chakra-ui/react";
import defaultImage from "../assets/default-image.jpg";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
export const ModalInputProduct = ({ isOpen, onClose, fetchProducts, id }) => {
  const toast = useToast();
  const [data, setData] = useState({
    thumbnail: "",
    title: "",
    price: 0,
  });

  const fetchProductById = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setData({
        thumbnail: res.data.thumbnail,
        title: res.data.title,
        price: res.data.price,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) fetchProductById();
  }, [isOpen]);

  const inputHandler = (e) => {
    if (e.target.id == "price") {
      const price = e.target.value.replace(/[,.]/g, "");
      if (isNaN(price)) return setData({ ...data, [e.target.id]: 0 });
      else {
        return setData({
          ...data,
          [e.target.id]: price,
        });
      }
    }
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const clear = () => {
    setData({
      thumbnail: "",
      title: "",
      price: 0,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/products/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast({
          title: "Success",
          description: "Product updated successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } else {
        await api.post("/products/add", data);
        toast({
          title: "Success",
          description: "Product added successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        clear();
      }
      fetchProducts();
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Error submitting product",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/products/${id}`);
      toast({
        title: "Success",
        description: "Product deleted successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      clear();
      fetchProducts();
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Error deleting product",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add/Edit Product</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={submit}>
          <ModalBody>
            <Center flexDir="column" gap={"15px"}>
              <img
                src={data?.thumbnail ? data?.thumbnail : defaultImage}
                width={"201px"}
                height={"143px"}
                alt="isi dengan gambar"
              ></img>
              <Input
                id="url"
                placeholder="Image URL"
                maxW="300px"
                defaultValue={data?.thumbnail}
                onChange={inputHandler}
                required
                type="url"
              ></Input>
              <Input
                id="name"
                placeholder="Product Name"
                maxW="300px"
                defaultValue={data?.title}
                onChange={inputHandler}
                required
              ></Input>
              <Input
                id="price"
                placeholder="Product Price"
                maxW="300px"
                defaultValue={data?.price}
                value={data?.price}
                onChange={inputHandler}
                // type="number"
                required
              ></Input>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="green" mr={3}>
              Submit
            </Button>
            {id ? (
              <Button type="button" colorScheme="red" mr={3} onClick={remove}>
                Delete
              </Button>
            ) : null}
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
