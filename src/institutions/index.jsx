import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../common/Loading.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import Institution from './Institution.jsx'
import InstitutionsHeader from './Header.jsx'
import sortInstitutions from '../utils/sortInstitutions.js'
import Alert from '../common/Alert.jsx'

const _setSubmission = (submission, filingObj) => {
  if (
    submission.id &&
    submission.id.institutionId === filingObj.filing.institutionId
  ) {
    return submission
  }

  return filingObj.submissions[0]
}

const _whatToRender = ({ filings, filingPeriod, institutions, submission }) => {
  // we don't have institutions yet
  if (!institutions.fetched) return <Loading className="floatingIcon" />

  // we don't have any institutions
  // this shouldn't happen because they need to pick
  // an institution when registering but just in case
  if (Object.keys(institutions.institutions).length === 0)
    return (
      <Alert type="error">
        <p>
          There was an error getting your list of institutions, please refresh
          the page or try again later. If the problem persists, contact{' '}
          <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
        </p>
      </Alert>
    )

  // sorted to keep the listing consistent
  const sortedInstitutions = Object.keys(institutions.institutions).sort(
    sortInstitutions
  )
  return sortedInstitutions.map((key, i) => {
    const institution = institutions.institutions[key]
    const institutionFilings = filings[institution.id]

    if (!institutionFilings) {
      // there are no filings
      return <Institution key={i} institution={institution} />
    } else if (!institutionFilings.fetched) {
      // filings are not fetched yet
      return <Loading className="floatingIcon" key={i} />
    } else {
      // we have good stuff
      const filingObj = institutionFilings.filing
      return (
        <Institution
          key={i}
          filing={filingObj.filing}
          institution={institution}
          submission={_setSubmission(submission, filingObj)}
          submissions={filingObj.submissions}
        />
      )
    }
  })
}

export default class Institutions extends Component {
  render() {
    const { error, filingPeriod } = this.props

    return (
      <main id="main-content" className="usa-grid Institutions">
        {error ? <ErrorWarning error={error} /> : null}
        <div className="usa-width-one-whole">
          <h3>Bank of Andrew - 1234567890</h3>
          <span style={{ marginRight: '10px' }} className="usa-label">
            Accepted
          </span>

          <p style={{ display: 'inline' }}>HMDA filing process complete</p>
          <div
            style={{
              border: '1px solid #ddd',
              borderRadius: '2px',
              marginTop: '20px'
            }}
          >
            <p
              style={{
                borderBottom: '1px solid #ddd',
                backgroundColor: '#f5f5f5',
                padding: '15px',
                margin: '0'
              }}
            >
              <strong>Andrew Wolfe</strong> submitted 2 hours ago
            </p>
            <p style={{ padding: '15px', margin: '0' }}>
              This completes your HMDA filing process for this year. If you need
              to upload a new HMDA file, the previously completed filing will
              not be overridden until all edits have been cleared and verified,
              and the new file has been submitted.
            </p>
          </div>
          <div style={{ padding: '0 15px', borderBottom: '4px solid #ddd' }}>
            <ul
              style={{
                paddingLeft: '14px',
                borderLeft: '2px solid #ddd',
                marginLeft: '10px',
                marginTop: '0',
                marginBottom: '0'
              }}
            >
              <li style={{ paddingTop: '30px' }}>
                <strong>Bill Gates</strong> verified macro edits 1 day ago
              </li>
              <li style={{ marginTop: '20px' }}>
                <strong>Steve Jobs</strong> verified quality edits 2 days ago
              </li>
              <li style={{ marginTop: '20px' }}>
                <strong>Steve Jobs</strong> uploaded a file with edits 3 days
                ago
              </li>
              <li style={{ marginTop: '20px' }}>
                <strong>Steve Jobs</strong> uploaded a file with syntactical
                edits 3 days ago
              </li>
              <li style={{ marginTop: '20px' }}>
                <strong>Bill Gates</strong> uploaded a file with syntactical
                edits 3 days ago
              </li>
              <li style={{ marginTop: '20px', paddingBottom: '15px' }}>
                <strong>Bill Gates</strong> uploaded a file with parsing errors
                3 days ago
              </li>
            </ul>
          </div>
          {/*<h3>Bank of Andrew - 1234567890</h3>
          <span style={{ marginRight: '10px' }} className="usa-label">
            Not started
          </span>

          <p style={{ display: 'inline' }}>
            No data has been uploaded yet. The filing period is open and
            available to accept HMDA data. Make sure your data is in a
            pipe-delimited text file.
          </p>

          <h3>Bank of Andrew - 1234567890</h3>
          <span style={{ marginRight: '10px' }} className="usa-label">
            Errors
          </span>

          <p style={{ display: 'inline' }}>
            Your data has formatting errors. Review these errors and update your
            file. Then, upload the corrected file.
          </p>

          <h3>Bank of Andrew - 1234567890</h3>
          <span style={{ marginRight: '10px' }} className="usa-label">
            Edits
          </span>

          <p style={{ display: 'inline' }}>
            Your data has edits that need to be reviewed. Your file has been
            uploaded, but the filing process may not proceed until edits are
            verified or the file is corrected and re-uploaded.
          </p>

          <h3>Bank of Andrew - 1234567890</h3>
          <span style={{ marginRight: '10px' }} className="usa-label">
            Edits
          </span>

          <p style={{ display: 'inline' }}>
            Your data has edits that need to be reviewed. Your file has been
            uploaded, but the filing process may not proceed until edits are
            verified or the file is corrected and re-uploaded.
          </p>

          <h3>Bank of Andrew - 1234567890</h3>
          <span style={{ marginRight: '10px' }} className="usa-label">
            Edits
          </span>

          <p style={{ display: 'inline' }}>
            Your data has edits that need to be reviewed. Your file has been
            uploaded, but the filing process may not proceed until edits are
            verified or the file is corrected and re-uploaded.
          </p>

          <h3>Bank of Andrew - 1234567890</h3>
          <span style={{ marginRight: '10px' }} className="usa-label">
            Ready
          </span>

          <p style={{ display: 'inline' }}>
            Your data is ready for submission. Your financial institution has
            certified that the data is correct, but it has not been submitted
            yet.
          </p>*/}

          {this.props.institutions.fetched ? (
            <p className="multi-message">
              If you are planning to file on behalf of more than one financial
              institution, contact{' '}
              <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.
            </p>
          ) : null}
        </div>
      </main>
    )
  }
}

Institutions.propTypes = {
  submission: PropTypes.object,
  error: PropTypes.object,
  filings: PropTypes.object,
  filingPeriod: PropTypes.string,
  institutions: PropTypes.object
}
