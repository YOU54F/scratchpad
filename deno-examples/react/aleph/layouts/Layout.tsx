import React, { ReactNode } from "react";

const Layout = ({ navColor, children }: { navColor: any; children: any }) => {
  return (
    <div>
      <nav
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "firebrick",
          backgroundColor: navColor
        }}>
        <a style={{ margin: "1rem 3rem" }} href='/'>
          Home
        </a>
        <img
          style={{ height: "100px", margin: "1rem" }}
          src='/assets/twemoji_chicken.svg'
          alt='chicken'
        />
        <a style={{ margin: "1rem 3rem" }} href='/about'>
          About
        </a>
      </nav>
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "1rem"
        }}>
        {children}
      </main>
    </div>
  );
};

// const navStyle = (navColor: Property.BackgroundColor | undefined) => {
//   return {
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "firebrick",
//     backgroundColor: navColor
//   };
// };

// const navLinkStyle = { margin: "1rem 3rem" };

// const mainStyle = {
//   maxWidth: "800px",
//   margin: "0 auto",
//   padding: "1rem"
// };

export default Layout;
