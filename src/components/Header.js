import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../contexts/GlobalStateContext.js';

function Header() {
    const { user } = useGlobalState();
    const [showWarning, setShowWarning] = useState(false);

    const handleOnClick = () => {
        if (!user) {
            setShowWarning(true);
            setTimeout(() => {
                setShowWarning(false);  // hide the warning after 3 seconds
            }, 3000);
        }
    }

    return (
        <table>
            <thead>
                <th><Link to="/">InterNews </Link></th>
                <th><Link to="/new">New </Link></th>
                <th><Link to="/past">Past </Link></th>
                <th><Link to="/comments">Comments </Link></th>
                <th onClick={handleOnClick}>
                    <Link to={user ? "/submit" : "#"}>Submit </Link>
                    {showWarning && <div className="warning">You must be logged in to access Submit</div>}
                </th>
                <th><Link to={user ? "/profile" : "/login"}>{user ? "Profile" : "Login/Register"}</Link></th>
            </thead>
        </table>
    );
}

export default Header;
