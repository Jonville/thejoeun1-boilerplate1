import React from "react";
import MainNavigation from "./MainNavigation";

function Layout (props) {
  return (
    <>
      <MainNavigation />
      <main className=''>
        {props.children}
      </main>
    </>
  );
};

export default Layout;