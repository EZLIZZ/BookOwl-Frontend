import React from 'react';
import UserSidebar from './_components/UserSidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <UserSidebar />

      {/* Content */}
      <div className="flex-1 ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
