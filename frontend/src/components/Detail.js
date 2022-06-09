import Sidebar from './Sidebar';
import DetailContent from './DetailContent';
import React, { useState } from 'react';

const Detail = () => {
  const [showSidebar, onSetShowSidebar] = useState(false);
  return (
    <div className="flex">
      <Sidebar
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <DetailContent
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
      />
    </div>
  );
}
export default Detail;
