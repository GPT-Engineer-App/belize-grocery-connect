import React, { useState } from "react";
import { Box, Heading, Text, Image, Button, Input, Grid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, FormControl, FormLabel, Select, Flex, Spacer, IconButton, useToast } from "@chakra-ui/react";
import StoreSelector from "../components/StoreSelector";
import { FaShoppingCart, FaUser, FaSearch, FaTrash } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Fresh Bananas",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1621295112702-f6e5ff69b8a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXN8ZW58MHx8fHwxNzEyMTk4MDc1fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    name: "Organic Apples",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1502666231573-e36f6cdec2f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYXBwbGVzfGVufDB8fHx8MTcxMjE5ODA3NXww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  // Add more products...
];

const stores = [
  { id: 1, name: "Store A" },
  { id: 2, name: "Store B" },
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()) && (!selectedStore || product.storeId === selectedStore));

  return (
    <Box>
      <Flex bg="green.500" p={4} color="white">
        <Heading size="md">CARTZ</Heading>
        <Spacer />
        <IconButton icon={<FaShoppingCart />} variant="ghost" onClick={onOpen} aria-label="Cart" />
        <IconButton icon={<FaUser />} variant="ghost" ml={2} aria-label="Account" />
      </Flex>

      <Box p={4}>
        <Flex mb={4} alignItems="center">
          <StoreSelector stores={stores} selectedStore={selectedStore} onStoreSelect={setSelectedStore} />
          <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} ml={4} />
          <IconButton icon={<FaSearch />} ml={2} aria-label="Search" onClick={() => {}} />
        </Flex>

        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          {filteredProducts.map((product) => (
            <GridItem key={product.id}>
              <Box borderWidth={1} borderRadius="md" p={4}>
                <Image src={product.image} alt={product.name} mb={2} />
                <Heading size="sm">{product.name}</Heading>
                <Text fontWeight="bold">${product.price.toFixed(2)}</Text>
                <Button mt={2} colorScheme="blue" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {cart.length === 0 ? (
              <Text>Your cart is empty.</Text>
            ) : (
              cart.map((item) => (
                <Flex key={item.id} alignItems="center" mb={2}>
                  <Text>{item.name}</Text>
                  <Spacer />
                  <Text fontWeight="bold">${item.price.toFixed(2)}</Text>
                  <IconButton icon={<FaTrash />} ml={2} aria-label="Remove" onClick={() => removeFromCart(item.id)} />
                </Flex>
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Continue Shopping
            </Button>
            <Button variant="ghost">Checkout</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bg="gray.100" p={4} mt={8}>
        <Heading size="md" mb={4}>
          Delivery Information
        </Heading>
        <Text>We deliver groceries from 8:00 am to 8:00 pm. Our delivery personnel will match unique codes to fulfill your orders.</Text>
      </Box>

      <Box p={4}>
        <Heading size="md" mb={4}>
          Payment Methods
        </Heading>
        <Text>We accept payments through local bank cards such as Belize Bank, Atlantic Bank, Heritage Bank, or upfront payment upon delivery.</Text>
      </Box>
    </Box>
  );
};

export default Index;
