import React, { Component } from 'react'

export class SubmissionBox extends Component {
    state = {
        name: '',
        description: ''
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        console.log(this.state.name)
    }

    render() {
        return (
            <div style={container}>
                <form action="" method="post" style={formContainer}>
                    <h2 style={h2}>Name:</h2>
                    <input style={inputBox} type="text" name='name' value={this.state.name}
                    onChange={this.onChange}/>

                    <h2 style={h2}>Your idea:</h2>
                    <textarea style={inputBox} cols="30" name='description' rows="10" value={this.state.description}
                    onChange={this.onChange}/>
                    
                    <div style={{alignSelf:'flex-end'}}>
                        <input style={resetButton} type="button" value="Reset" />
                        <input style={submitButton} type="button" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}

const container = {
    background: '#F6F5F4',
    padding: '20px 0 30px 0',
    zIndex: '-1',
    borderRadius: '0 0 10px 10px'
}

const formContainer = {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    margin: 'auto',
}

const inputBox = {
    // fontFamily: 'sans-serif',
    fontFamily: 'sans-serif',
    fontSize: '25px',
    padding: '10px 10px',
    marginBottom: '5px',
    border: '2px solid #808080',
    borderRadius: '5px'
}

const h2 = {
    margin: '5px 0'
}

const button = {
    padding: "15px 35px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "400",
    cursor: "pointer",
    marginLeft: '10px',
}

const submitButton = {
    ...button,
    color: "#fff",
    background: "#68bc00",
}

const resetButton = {
    ...button,
    color: "#fff",
    background: "#303030",
}

export default SubmissionBox
