import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'

// dummy component
// const SurveyNew = () => <h2>Survey New</h2>

// 180 redirect on submit outdated material
// webhooks stuff not working wouldnt install ngrock
// https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/7607726#questions

class App extends Component {
  componentDidMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <div className='container'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/surveys' element={<Dashboard />} />
            <Route path='/surveys/new' element={<SurveyNew />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
