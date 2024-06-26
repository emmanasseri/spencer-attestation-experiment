import { extendTheme, ChakraProvider } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Courier New', monospace",
    body: "'Courier New', monospace",
  },
  styles: {
    global: {
      body: {
        bg: "linear-gradient(to top, #FFFFFF 30%, #87ceeb 70%)",
        color: "white",
        fontFamily: "'Courier New', monospace",
      },
    },
  },
});

const Chakra = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Chakra;
