import { Metadata } from "next";
import Header from "./components/header";
import Service from "./components/service";
import Selected from "./components/selected";
import Testimonials from "./components/testimonials";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "GoFlight",
};

export default function Home() {
  return (
    <>
      <Header />
      <Service />
      <Selected />
      <Testimonials />
      <Footer />
    </>
  );
}
