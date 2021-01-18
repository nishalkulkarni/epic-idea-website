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
            ' class="bg-gray-300 m-4 p-4 rounded">\
            <strong>' +
            uname +
            "</strong>\
            <p>" +
            udsc +
            '</p>\
          </div>'
        );
      });
      document.getElementById("ideaList").innerHTML = displayList.join(" ");
    });

    // this.setState({ name: "", description: "", currentIdeas: displayList });
  };

  render() {
    return (
      <div className="container flex flex-col justify-center py-5 pb-10 rounded-md bg-gray-100">
        <form className="w-3/5 m-auto" onSubmit={this.handleSubmit}>
          <h2 className="text-lg font-medium text-gray-600">Name:</h2>
          <input
            className="input w-full md:w-56 h-8"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <h2 className="text-lg font-medium text-gray-600">Your idea:</h2>
          <textarea
            className="input w-full py-2 "
            cols="30"
            name="description"
            rows="10"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />

          <div className="flex justify-end mt-5 gap-5">
            <input className="btn  text-blue-800 hover:bg-blue-800 hover:border-blue-800 hover:text-white" type="button" value="List All Ideas" onClick={this.displayIdeas} />
            <input className="btn text-gray-800 hover:bg-gray-800 hover:border-gray-800 hover:text-white" type="reset" value="Reset" onClick={this.handleReset} />
            <input className="btn text-green-400 hover:bg-green-400 hover:border-green-400 hover:text-white" type="submit" value="Submit" />
          </div>
        </form>
        <div className="" id="ideaList">{this.state.currentIdeas}</div>
      </div>
    );
  }
}

export default SubmissionBox;
