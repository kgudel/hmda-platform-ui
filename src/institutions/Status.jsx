import React from 'react'
import PropTypes from 'prop-types'
import CSVDownload from '../common/CSVContainer.jsx'
import * as STATUS from '../constants/statusCodes.js'

const defaultSubmission = {
  status: {
    code: STATUS.CREATED,
    message: 'No data has been uploaded yet.',
    description:
      'The filing period is open and available to accept HMDA data. Make sure your data is in a pipe-delimited text file.'
  }
}

const InstitutionStatus = props => {
  const submission = props.submission || defaultSubmission
  const { code, message, description } = submission.status
  return (
    <section className="status">
      <h4>{message}</h4>
      <p>{description}</p>
      {props.filing.status.code === 3 && code !== STATUS.SIGNED ? (
        <p className="usa-text-small">
          You have previously submitted a HMDA file and are in the process of
          refiling. If you do not complete your current refiling process, your
          original submission will be accepted for the current filing period.
        </p>
      ) : null}
      {code > STATUS.VALIDATING ? (
        <div className="usa-text-small" style={{ lineHeight: '1.5em' }}>
          <CSVDownload submission={submission} text="Download edit report" />
        </div>
      ) : null}
    </section>
  )
}

InstitutionStatus.propTypes = {
  filing: PropTypes.object,
  submission: PropTypes.object
}

export default InstitutionStatus
