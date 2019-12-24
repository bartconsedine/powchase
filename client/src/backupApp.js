import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import ChunkPage from './components/Chunkpage'
import Chunkreverse from './components/Chunkreverse'
import ChunkSingle from './components/Chunksingle'
import Concentrater from './components/Concentrater'
import ChunkCustom from './components/Chunkcustom'
import Filter from './components/Filter'
import UserInfo from './components/UserInfo'
import Nav from './components/Nav'

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
        title: "Frankenstein",
        author: "Mary Shelley",
        chapter: "1.a",
        excerpts: "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes. Inspirited by this wind of promise, my daydreams become more fervent and vivid. I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight."
      },
      filterData: {
        title: "Frankenstein",
        author: "Mary Shelley",
        chapter: "1.a",
        excerpts: "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes. Inspirited by this wind of promise, my daydreams become more fervent and vivid. I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight.",
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
    await this.setState({
      excerptData: {
        ...filteredExcerpt[0]
      }
    })

    this.setState({ showNav: true })
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
    this.setState({showEx: true})
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
        {this.state.showNav && <div className="header">
          <span >
            {this.state.currentUser && this.loginRender()}
          </span>
          <h1 className="logo">METRIC READER</h1>
          <div className="filter-nav">
            <div>
              <Nav
                currentUser={this.state.currentUser}
                handleLogout={this.handleLogout}
                handleLogin={this.handleLoginButton}
                filterData={this.state.filterData}
                showEx={this.state.showEx}
              />
            </div>
            <div>
              <Filter
                handleFilterSubmit={this.handleFilterSubmit}
                handleFilterChange={this.handleFilterChange}
                filterData={this.state.filterData}
                allExcerpts={this.state.allExcerpts}
              />
            </div>
          </div>

        </div>}
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
        <Route exact path="/custom" render={() => (
          <ChunkCustom
            handleRegister={this.handleRegister}
            handleFormChange={this.handleFormChange}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData}
            currentUser={this.state.currentUser}
            excerptData={this.state.excerptData}
            navToggle={this.navToggle}
            showNav={this.state.showNav}
            filterData={this.state.filterData}
            multiplier={this.state.multiplier}
            
          />)}
        />
        <Route exact path="/reverse" render={() => (
          <Chunkreverse
            handleRegister={this.handleRegister}
            handleFormChange={this.handleFormChange}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData}
            currentUser={this.state.currentUser}
            excerptData={this.state.excerptData}
            navToggle={this.navToggle}
            showNav={this.state.showNav}
            filterData={this.state.filterData}
            multiplier={this.state.multiplier}
          />)}
        />
        <Route exact path="/chunkpage" render={() => (
          <ChunkPage
            excerptData={this.state.excerptData}
            navToggle={this.navToggle}
            showNav={this.state.showNav}
            filterData={this.state.filterData}
            multiplier={this.state.multiplier}
          />)}
        />
        <Route exact path="/chunksingle" render={() => (
          <ChunkSingle
            excerptData={this.state.excerptData}
            navToggle={this.navToggle}
            showNav={this.state.showNav}
            filterData={this.state.filterData}
            multiplier={this.state.multiplier}
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
        <Route exact path="/concentrater" render={() => (
          <Concentrater
            navToggle={this.navToggle}
            showNav={this.state.showNav}
            filterData={this.state.filterData}
            multiplier={this.state.multiplier}
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