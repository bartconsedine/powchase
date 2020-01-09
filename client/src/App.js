import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Map from './components/Map/Map'
import Filter from './components/Filter'
import UserInfo from './components/UserInfo'
import Nav from './components/Nav/Nav'

import {
  loginUser,
  registerUser
} from './services/api-helper'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: "",
        goal: 0
      },
      excerptData: {
        title: "",
        author: "",
        chapter: "",
        excerpts: ""
      },
      filterData: {
        title: "",
        author: "",
        chapter: "",
        excerpts: "",
        readingSpeed: 700
      },
      showNav: true,
      showEx: true,
      allExcerpts: [],
      multiplier: .42

    };
  }



  navToggle = () => {
    this.setState({ showNav: !this.state.showNav })
  }

  async componentDidMount() {
    await window.fetch('/api/excerpts')
      .then(response => response.json())
      .then(response => this.setState({ allExcerpts: response }))
      .catch(error => console.log(error));
    const filteredExcerpt = this.state.allExcerpts.filter((item) => item.author === this.state.filterData.author && item.title === this.state.filterData.title && item.chapter === this.state.filterData.chapter)
    // await this.setState({
    //   excerptData: {
    //     ...filteredExcerpt[0]
    //   }
    // })

    // this.setState({ showNav: true })
  }


  handleRegister = async () => {
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser });
  }

  handleLoginButton = (e) => {
    e.preventDefault();
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    console.log("login handled")
    this.navToggle()
    const currentUser = await loginUser(this.state.authFormData);
    await this.setState({ currentUser });

  }

  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
  }

  handleFormChange = (e) => {
    e.preventDefault();
    console.log(this.state.authFormData)
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }))
  }

  handleFilterChange = (e) => {
    e.preventDefault()
    console.log("filterdata", this.state.filterData)
    const { name, value } = e.target;
    this.setState(prevState => ({
      filterData: {
        ...prevState.filterData,
        [name]: value
      }
    }))

    const filteredExcerpt = this.state.allExcerpts.filter((item) => item.author === this.state.filterData.author && item.title === this.state.filterData.title && item.chapter === this.state.filterData.chapter)
    this.setState({
      excerptData: {
        ...filteredExcerpt[0]
      }
    })

  }


  handleFilterSubmit = e => {
    e.preventDefault()
    this.setState({ showEx: true })
    this.componentDidMount()
  }

  authHandleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  loginRender = () => {

    console.log(this.state.currentUser)
    return (
      <span className="login-text">

        {this.state.currentUser.username ? this.state.currentUser.username : this.state.currentUser.user.username}
        <br></br>
        <Link className="info-link"
          to={`/userinfo/${this.state.currentUser.id ? this.state.currentUser.id : this.state.currentUser.user.id}`}
        >info</Link>

        <br></br>
        <button className="logout" onClick={this.handleLogout}>logout</button>

      </span>
    )


  }



  render() {

    return (
      <div className="App">
        {/* {this.state.showNav && <div className="header">
          <span >
            {this.state.currentUser && this.loginRender()}
          </span>

          <div className="filter-nav">
            
            <div className="register-login-div">
              <Nav
                currentUser={this.state.currentUser}
                handleLogout={this.handleLogout}
                handleLogin={this.handleLoginButton}
                filterData={this.state.filterData}
                showEx={this.state.showEx}
              />
            </div>


          </div>
          

        </div>} */}

        <div>
            <Map />
          </div>
        <Route exact path="/" to="/" />

        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleFormChange={this.handleFormChange}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData}
            navToggle={this.navToggle}
            currentUser={this.state.currentUser}
          />)}
        />
        <Route exact path="/login" render={() => (
          <Login
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData}
            handleLogin={this.handleLogin}
            navToggle={this.navToggle}
          />)} />


        <Route exact path="/userinfo/:id" render={() => (
          <UserInfo
            currentUser={this.state.currentUser}
            navToggle={this.navToggle}
          />)}
        />

      </div>
    );
  }
}

export default withRouter(App);