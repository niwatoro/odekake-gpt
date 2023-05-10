import Script from "next/script";
import { FC } from "react";

export const GoogleAnalytics: FC = () => {
  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KD8LQP264Z" />
      <Script>
        {`
          window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-KD8LQP264Z');
        `}
      </Script>
    </>
  );
};
