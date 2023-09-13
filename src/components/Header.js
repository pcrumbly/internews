import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const headerJSX = (
        <table>
          <thead>
            <th><p><a href="/">InterNews.pro</a></p></th>
            <th><p>New</p></th>
            <th><p>Past</p></th>
            <th><p>Comments</p></th>
            <th><Link to="/submit">Submit </Link></th>
            <th><Link to="/login">Login </Link></th>
          </thead>
        </table>
    ); 
    
    return headerJSX
  }


export default Header;