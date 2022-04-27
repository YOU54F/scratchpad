import React from "react";

import Layout from "~/layouts/Layout.tsx";
import App from "~/components/App.tsx";

const Index = () => {
  return (
    <Layout navColor='violet'>
      <div className='page'>
        <h1>Sample SSR React Page!</h1>
        <p className='logo'></p>
        <App />
      </div>
    </Layout>
  );
};

export default Index;
