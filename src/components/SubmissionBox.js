import React, { Component } from "react";

function getIdeas(callback) {
  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (callback) callback(req.responseText);
    }
  };

  req.open(
    "GET",
    "https://api.jsonbin.io/b/60047c6bf98f6e35d5fdaf35/latest",
    true
  );
  req.setRequestHeader(
    "secret-key",
    "$2b$10$NQziUAHRmo..9Hz/ShroQ.duypujF4S3rGvH6a4eWYI9g4jwvxSIm"
  );
  req.send();
}

const saveIdea = (idea) => {
  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      console.log(req.responseText);
    }
  };

  req.open("PUT", "https://api.jsonbin.io/b/60047c6bf98f6e35d5fdaf35", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader(
    "secret-key",
    "$2b$10$NQziUAHRmo..9Hz/ShroQ.duypujF4S3rGvH6a4eWYI9g4jwvxSIm"
  );
  req.send(JSON.stringify(idea));
};

export class SubmissionBox extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", description: "", currentIdeas: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.displayIdeas = this.displayIdeas.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let idea = {
      id: Date.now(),
      name: this.state.name,
      description: this.state.description,
    };
    console.log(idea);
    getIdeas(function (previousIdeas) {
      var ideaList = JSON.parse(previousIdeas);
      ideaList.push(idea);
      console.log("nishal", ideaList);
      saveIdea(ideaList);
    });
  }

  handleReset = () => {
    this.setState({
      name: "",
      description: "",
    });
  };

  displayIdeas = () => {
    const displayList = [];
    getIdeas(function (previousIdeas) {
      var ideaList = JSON.parse(previousIdeas);

      ideaList.forEach((element) => {
        let uid = element.id;
        let uname = element.name;
        let udsc = element.description;
        displayList.push(
          "<div key=" +
            uid +
            ' style="width: 70%, margin: 10px auto">\
            <strong>' +
            uname +
            "</strong>\
            <p>" +
            udsc +
            '</p>\
            <hr style="margin: 10px auto" />\
          </div>'
        );
      });
      document.getElementById("ideaList").innerHTML = displayList.join(" ");
    });

    // this.setState({ name: "", description: "", currentIdeas: displayList });
  };

  render() {
    return (
      <div style={container}>
        <form onSubmit={this.handleSubmit} style={formContainer}>
          <h2 style={h2}>Name:</h2>
          <input
            style={inputBox}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <h2 style={h2}>Your idea:</h2>
          <textarea
            style={inputBox}
            cols="30"
            name="description"
            rows="10"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <div style={{ alignSelf: "flex-end" }}>
            <input
              style={resetButton}
              type="button"
              value="List All Ideas"
              onClick={this.displayIdeas}
            />

            <input
              style={resetButton}
              type="reset"
              value="Reset"
              onClick={this.handleReset}
            />
            <input style={submitButton} type="submit" value="Submit" />
          </div>
        </form>
        <div id="ideaList">{this.state.currentIdeas}</div>
      </div>
    );
  }
}

const container = {
  background: "#F6F5F4",
  padding: "20px 0 30px 0",
  zIndex: "-1",
  borderRadius: "0 0 10px 10px",
};

const formContainer = {
  display: "flex",
  flexDirection: "column",
  width: "60%",
  margin: "auto",
};

const inputBox = {
  // fontFamily: 'sans-serif',
  fontFamily: "sans-serif",
  fontSize: "25px",
  padding: "10px 10px",
  marginBottom: "5px",
  border: "2px solid #808080",
  borderRadius: "5px",
};

const h2 = {
  margin: "5px 0",
};

const button = {
  padding: "15px 35px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  fontWeight: "400",
  cursor: "pointer",
  marginLeft: "10px",
};

const submitButton = {
  ...button,
  color: "#fff",
  background: "#68bc00",
};

const resetButton = {
  ...button,
  color: "#fff",
  background: "#303030",
};

export default SubmissionBox;
