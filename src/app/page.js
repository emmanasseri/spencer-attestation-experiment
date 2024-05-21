"use client";
import RootLayout from "./layout";
import Chakra from "./chakra";
//import Navbar from "@/components/Navbar";
//import Footer from "@/components/Footer";
import Place from "@/components/Place";

function Home() {
  return (
    <RootLayout>
      <Chakra>
        {/* <Navbar /> */}

        {/* <Footer /> */}
        <Place />
      </Chakra>
    </RootLayout>
  );
}

export default Home;
