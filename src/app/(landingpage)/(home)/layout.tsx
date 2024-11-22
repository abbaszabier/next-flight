import "../../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-white font-poppins bg-flysha-black">{children}</div>
  );
}
