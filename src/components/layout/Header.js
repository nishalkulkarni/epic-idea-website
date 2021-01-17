import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div style={StyleSheet}>
               <h1>யோசனை கொடுங்கள்</h1> 
            </div>
        )
    }
}
const StyleSheet = {
    background: '#333333',
    fontFamily: 'Arima Madurai, cursive',
    color: 'white',
    textAlign: 'center',
    margin: '10px auto 0px auto',
    fontSize: '40px',
    borderRadius: '10px 10px 0 0'
}

export default Header
