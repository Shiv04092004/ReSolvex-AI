import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <ul>
                <li>
                    <NavLink 
                        to="/dashboard" 
                        className={({ isActive }) => (isActive ? 'active' : '')}
                        onClick={onClose}
                    >
                        📊 Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/submit" 
                        className={({ isActive }) => (isActive ? 'active' : '')}
                        onClick={onClose}
                    >
                        ✏️ New Report
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/my-complaints" 
                        className={({ isActive }) => (isActive ? 'active' : '')}
                        onClick={onClose}
                    >
                        📁 My Reports
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
