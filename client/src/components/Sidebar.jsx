import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                        📊 Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/submit" className={({ isActive }) => (isActive ? 'active' : '')}>
                        ✏️ New Report
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/my-complaints" className={({ isActive }) => (isActive ? 'active' : '')}>
                        📁 My Reports
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
