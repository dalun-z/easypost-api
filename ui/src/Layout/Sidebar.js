import React from 'react';
import '../css/Layout.css';
import '../css/Banner.css';
import Banner from './Banner';

const Layout = ({ sidebar, mainContent }) => {
  return (
    <>
      <Banner />
      <div className="layout">
        <div className="sidebar">
          {sidebar}
        </div>
        <div className="main-content">
          {mainContent}
        </div>
      </div>
    </>
  );
};

export default Layout;