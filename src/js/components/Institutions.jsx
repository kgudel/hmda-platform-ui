import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoadingIcon from './LoadingIcon.jsx'
import ErrorWarning from './ErrorWarning.jsx'
import Institution from './Institution.jsx'
import InstitutionsHeader from './InstitutionsHeader.jsx'
import Alert from './Alert.jsx'
import * as STATUS from '../constants/statusCodes.js'

const _setSubmission = (submission, filing, filingObj) => {
  if (submission.id && submission.id.institutionId === filing.institutionId) {
    return submission
  }

  return filingObj.submissions[0]
}

export const getFilingFromInstitution = (institution, filings) => {
  for (let i = 0; i < filings.filings.length; i++) {
    if (institution.id === filings.filings[i].filing.institutionId) {
      return filings.filings[i]
    }
  }

  return null
}

export default class Institutions extends Component {
  render() {
    const {
      error,
      filings,
      filingPeriod,
      institutions,
      submission,
      onDownloadClick
    } = this.props

    return (
      <main id="main-content" className="usa-grid Institutions">
        {error ? <ErrorWarning error={error} /> : null}
        <div className="usa-width-one-whole">
          {filingPeriod ? (
            <InstitutionsHeader filingPeriod={filingPeriod} />
          ) : null}

          {!filings.fetched || filings.isFetching ? (
            <LoadingIcon />
          ) : institutions && institutions.length !== 0 ? (
            institutions.map((institution, i) => {
              const filing = getFilingFromInstitution(institution, filings)

              if (!filing) return

              return (
                <Institution
                  key={i}
                  filing={filing.filing}
                  institution={institution}
                  onDownloadClick={onDownloadClick}
                  submission={filing.submissions[0]}
                  submissions={filing.submissions}
                />
              )
            })
          ) : (
            <Alert type="error">
              <p>
                There is a problem with your filing. Please contact{' '}
                <a href="mailto:hmdahelp@cfpb.gov">HMDA Help</a>.
              </p>
            </Alert>
          )}

          <Alert type="info">
            <p>
              If you are planning to file on behalf of more than one financial
              institution, contact{' '}
              <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.
            </p>
          </Alert>
        </div>
      </main>
    )
  }
}

Institutions.propTypes = {
  error: PropTypes.object,
  filings: PropTypes.object,
  filingPeriod: PropTypes.string,
  institutions: PropTypes.array,
  submission: PropTypes.object,
  onDownloadClick: PropTypes.func
}
