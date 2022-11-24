import {
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";

export default function LogIn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [LogIn, setLogIn] = useState(false);

  type PostResponse = {
    accessToken: string;
    user: {
      email: string;
      id: number;
    };
  };

  async function authenticate() {
    try {
      const response = await axios.post<PostResponse>(
        "http://localhost:3000/login",
        {
          email: email,
          password: password,
        }
      );
      function isData(data: PostResponse): data is PostResponse {
        return "accessToken" in data && "user" in data;
      }
      const data = isData(response.data);
      if (data === true) {
        setLogIn(true);
        localStorage.setItem("data", JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
      setLogIn(false);
    }
  }

  function handleEmail(event: React.FormEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }

  function handlePassword(event: React.FormEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  function handleError(close: boolean) {
    if (email === "") {
      setEmailError(true);
    }
    if (email !== "" || !close) {
      setEmailError(false);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (password !== "" || !close) {
      setPasswordError(false);
    }
  }

  return (
    <>
      <Button
        fontSize="4xl"
        bg="none"
        _hover={{ bg: "none", color: "white" }}
        _active={{ bg: "none" }}
        p={0}
        onClick={onOpen}
      >
        <Box fontSize="5xl">
          <FontAwesomeIcon icon={faCircleUser} />
        </Box>
        <Text pl="0.5em" pr="1em">
          Sign in
        </Text>
      </Button>

      <Modal
        onCloseComplete={() => {
          setEmail("");
          setPassword("");
          handleError(false);
        }}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader>Sign in</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                onChange={handleEmail}
                value={email}
                placeholder="Email"
                type="email"
              />
              {email === "" && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={passwordError} mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={handlePassword}
                value={password}
                placeholder="Password"
                type="password"
              />
              {password === "" && (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                if (email !== "" && password !== "") {
                  authenticate();
                  handleError(true);
                  onClose();
                } else {
                  handleError(true);
                }
              }}
            >
              Log in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
