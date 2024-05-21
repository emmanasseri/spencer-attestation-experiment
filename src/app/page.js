"use client";
import RootLayout from "./layout";
import Chakra from "./chakra";
//import Navbar from "@/components/Navbar";
//import Footer from "@/components/Footer";
import Place from "@/components/Place";
import AttestationsLog from "@/components/AttestaionsLog";
import People from "@/components/People";

function Home() {
  return (
    <RootLayout>
      <Chakra>
        {/* <Navbar /> */}

        {/* <Footer /> */}
        <Place />
        <AttestationsLog />
        <People />
      </Chakra>
    </RootLayout>
  );
}

export default Home;
