"use client";
import RootLayout from "./layout";
import Chakra from "./chakra";
//import Navbar from "@/components/Navbar";
//import Footer from "@/components/Footer";
import Place from "@/components/Place";
import AttestationsLog from "@/components/AttestationsLog";
import AttestationForm from "@/components/AttestationForm";
import People from "@/components/People";

function Home() {
  return (
    <RootLayout>
      <Chakra>
        {/* <Navbar /> */}

        {/* <Footer /> */}
        <Place />
        <AttestationsLog />
        <AttestationForm />
        <People />
      </Chakra>
    </RootLayout>
  );
}

export default Home;
