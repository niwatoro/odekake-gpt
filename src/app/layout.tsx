import { Footer } from "@/app/components/layout/footer";
import { GoogleAnalytics } from "@/app/components/layout/google-analytics";
import { Header } from "@/app/components/layout/header";
import { AuthProvider } from "@/app/context/auth";
import "@/app/globals.css";
import { classNames } from "@/app/utils/class-names";
import { Zen_Kaku_Gothic_New } from "next/font/google";

const font = Zen_Kaku_Gothic_New({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "OdekakeGPT",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Zen+Old+Mincho&display=swap" rel="stylesheet"></link>
      </head>
      <GoogleAnalytics />
      <body className={classNames(font.className, "text-indigo-950")}>
        <AuthProvider>
          <Header />
          <div className="w-full min-h-screen flex justify-center text-lg">
            <div className="lg:w-[1000px] flex flex-col py-12 px-6 lg:px-0">{children}</div>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
