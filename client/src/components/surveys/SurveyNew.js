// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'
import { reduxForm } from 'redux-form'

class SurveyNew extends Component {
  // initialize component level state - long version vs shorthand below
  //constructor (props) {
  // call super with props
  //  super(props)
  // assign state object
  //  this.state = { showFormReview: true }
  //}

  // condense state initialization (built into babel/create rect app )
  state = { showFormReview: false }

  // helper method
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      )
    }

    // can also use if/else statement
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    )
  }

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default reduxForm({
  form: 'SurveyForm'
})(SurveyNew)
