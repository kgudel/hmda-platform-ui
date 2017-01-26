import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { justifyUpdate } from '../actions'

const delimiter = ':::'

class JustificationSelector extends Component {
  constructor(props) {
    super(props)
    this.labelledJustifications = []
    this.valueDict = {}
  }

  componentWillMount() {
    this.labelledJustifications = this.props.justifications.map(justification => {
      return {
        ...justification,
        label: justification.label === undefined ? justification.value : justification.label
      }
    })

    this.labelledJustifications.forEach(justification => {
      if(justification.verified) this.valueDict[justification.label] = 1
    })

    this.setState({
      value: this.labelledJustifications.filter(justification => {
        return justification.verified
      }).map(justification => {
        return justification.value
      }).join(delimiter)
    })
  }

  render() {
    const { syntax, validity } = this.props.edits.types
    const disabled = (this.props.code === 8 && (validity.length === 0 && syntax.length === 0)) ? false : true
    return (
      <Select
        allowCreate={true}
        joinValues={false}
        delimiter={delimiter}
        addLabelText={'Add custom justification: "{label}"'}
        multi={true}
        value={this.state && this.state.value}
        onChange={this.props.dispatchOnChange.bind(this)}
        options={this.labelledJustifications}
        disabled={disabled}
      />
    )
  }
}

JustificationSelector.defaultProps = {
  justifications: []
}

function mapStateToProps(state, ownProps) {
  const code = state.app.submission.status.code || null

  // can remove the edits if we later update status to include a status for syntax/validity edits and separate status for quality/macro
  const edits = state.app.edits || null

  return {
    ...ownProps,
    code,
    edits
  }
}

function mapDispatchToProps(dispatch, ownProps){

 return {
    dispatchOnChange: function(value) {
      const values = value.split(delimiter)
      const valueDict = this.valueDict

      const currentValue = values.filter(val => {
        return !valueDict[val]
      })[0]

      const removedValue = Object.keys(valueDict).filter((key) => {
        return valueDict[key] && (values.indexOf(key) === -1)
      })[0]

      const currentJustification = ownProps.justifications.filter((justification) => {
          return justification.value === (removedValue || currentValue)
        })[0]

      currentJustification.verified = !!currentValue

      dispatch(justifyUpdate({
        edit: ownProps.edit,
        justification: currentJustification
      }))

      this.setState({value})

      if(currentValue) valueDict[currentValue] = 1
      if(removedValue) valueDict[removedValue] = null
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JustificationSelector)
