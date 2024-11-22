import "../../globals.css";
import Navbar from "./components/navbar";
import RunningCompany from "./components/runningCompany";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      id="Signup"
      className="bg-[url('/assets/images/background/airplane.png')] bg-no-repeat bg-cover bg-left-top -z-10 min-h-screen"
    >
      <div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)] z=0 min-h-screen">
        <Navbar />
        <div className="flex flex-col justify-between min-h-[calc(100vh-78px)]">
          {children}
          <RunningCompany />
        </div>
      </div>
    </section>
  );
}
