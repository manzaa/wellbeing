// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>App Name</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/dashboard" activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/topics" activeClassName="active">
                            Topics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/subtopics" activeClassName="active">
                            Subtopics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourites" activeClassName="active">
                            Favourites
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/completed" activeClassName="active">
                            Completed
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/audio-recording" activeClassName="active">
                            Audio Recording
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
