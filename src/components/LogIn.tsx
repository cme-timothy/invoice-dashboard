import { Button, Box, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

export default function LogIn() {
  return (
    <Button
      fontSize="4xl"
      bg="none"
      _hover={{ bg: "none", color: "white" }}
      _active={{ bg: "none" }}
      p={0}
    >
      <Box fontSize="5xl">
        <FontAwesomeIcon icon={faCircleUser} />
      </Box>
      <Text pl="0.5em" pr="1em">Log in</Text>
    </Button>
  );
}
