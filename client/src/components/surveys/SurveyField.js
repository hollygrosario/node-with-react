// SurveyField contains the logic to render a custom/ single label and text input
import React from 'react'

// comparison long hand
// export default props => {
//  console.log('props:', props)
//  return (
//  <div>
//    <input onBlur={input.onBlur} onChange={input.onchange} etc... />
//  </div>
// )
// }

// es6 destructuring
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className='red-text' style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  )
}
