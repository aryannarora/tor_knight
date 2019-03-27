import React from 'react';

function Header() {
    return (
        <header style={headerStyle}>
            <h3>_Tor_Knight_</h3>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '3px'
};

export default Header;