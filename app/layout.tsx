import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Load the Space Grotesk font
const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "700"], // Specify the weights you need
  subsets: ["latin"], // Latin subset for proper character support
  variable: "--font-space-grotesk", // CSS variable for custom styling
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
