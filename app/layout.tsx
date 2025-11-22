import "./globals.css";


export const metadata = {
  title: "Bids Zone",
  description: "Leading Online Marketplace for Birds in Lahore Pakistan - Buy and Sell Lovebirds, Cockatiels, Macaws, Finches & Exotic Birds with Verified Sellers on Birds Hub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
