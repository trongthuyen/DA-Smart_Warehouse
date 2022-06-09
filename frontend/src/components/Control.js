import Sidebar from './Sidebar';
import ControlContent from './ControlContent';
import React, { useState } from 'react';

const Control = () => {
  const [showSidebar, onSetShowSidebar] = useState(false);
  return (
    <div className="flex">
      <Sidebar
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <ControlContent
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
      />
    </div>
  );
}
export default Control;
