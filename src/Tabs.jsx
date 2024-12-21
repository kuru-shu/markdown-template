import React from 'react';

function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <ul
      style={{
        display: 'flex',
        listStyle: 'none',
        padding: 0,
        borderBottom: '1px solid #ccc',
      }}
    >
      {tabs.map((tab) => (
        <li
          key={tab.id}
          style={{
            padding: '10px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderBottom: 'none',
            marginRight: '5px',
            background: tab.id === activeTab ? '#eee' : 'transparent',
            fontWeight: tab.id === activeTab ? 'bold' : 'normal',
          }}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
