import { fetch } from './fetch.js'

export function getInstitutions() {
  // return fetch({ pathname: '/institutions' })
  return new Promise(resolve => {
    resolve({
      institutions: [
        { id: '0', name: 'bank-0 National Association' },
        { id: '1', name: 'bank-1 Mortgage Lending' }
      ]
    })
  })
}

export function getInstitution(id) {
  // return fetch({ pathname: `/institutions/${id}` })
  if (id === '0') {
    return new Promise(resolve => {
      resolve({
        institution: { id: '0', name: 'bank-0 National Association' },
        filings: [
          {
            filingRequired: false,
            institutionId: '0',
            status: { code: 2, message: 'in-progress' },
            end: 0,
            start: 1513696746715,
            period: '2016'
          },
          {
            filingRequired: false,
            institutionId: '0',
            status: { code: 3, message: 'completed' },
            end: 1514741721031,
            start: 1514741668971,
            period: '2017'
          }
        ]
      })
    })
  } else {
    return new Promise(resolve => {
      resolve({
        institution: { id: '1', name: 'bank-1 Mortgage Lending' },
        filings: [
          {
            filingRequired: false,
            institutionId: '1',
            status: { code: 1, message: 'not-started' },
            end: 0,
            start: 0,
            period: '2016'
          },
          {
            filingRequired: false,
            institutionId: '1',
            status: { code: 3, message: 'completed' },
            end: 1515682213163,
            start: 1515682151087,
            period: '2017'
          }
        ]
      })
    })
  }
}

export function createSubmission(id, filing) {
  return fetch({
    pathname: `/institutions/${id}/filings/${filing}/submissions`,
    method: 'POST'
  })
}

export function getFiling(id, filing) {
  // return fetch({ pathname: `/institutions/${id}/filings/${filing}` })
  if (id === '0') {
    return new Promise(resolve => {
      resolve({
        filing: {
          filingRequired: false,
          institutionId: '0',
          status: { code: 3, message: 'completed' },
          end: 1514741721031,
          start: 1514741668971,
          period: '2017'
        },
        submissions: [
          {
            fileName: 'Bank 0_400 LARS_S025 Ready.txt',
            id: { institutionId: '0', period: '2017', sequenceNumber: 289 },
            receipt: '0-2017-289-1540304400322',
            status: {
              code: 10,
              message: 'Your submission has been accepted.',
              description:
                'This completes your HMDA filing process for this year. If you need to upload a new HMDA file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted.'
            },
            end: 1540304400322,
            start: 1540303997250
          },
          {
            fileName: 'Bank 1_400 LAR_S025 ready.txt',
            id: { institutionId: '0', period: '2017', sequenceNumber: 288 },
            receipt: '',
            status: {
              code: 8,
              message: 'Your data has edits that need to be reviewed.',
              description:
                'Your file has been uploaded, but the filing process may not proceed until edits are verified or the file is corrected and re-uploaded.'
            },
            end: 0,
            start: 1540303928101
          }
        ]
      })
    })
  } else {
    return new Promise(resolve => {
      resolve({
        filing: {
          filingRequired: false,
          institutionId: '1',
          status: { code: 3, message: 'completed' },
          end: 1515682213163,
          start: 1515682151087,
          period: '2017'
        },
        submissions: [
          {
            fileName: 'Bank 1_400 LAR_S025 ready.txt',
            id: { institutionId: '1', period: '2017', sequenceNumber: 87 },
            receipt: '1-2017-87-1536866772274',
            status: {
              code: 10,
              message: 'Your submission has been accepted.',
              description:
                'This completes your HMDA filing process for this year. If you need to upload a new HMDA file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted.'
            },
            end: 1536866772274,
            start: 1536866613151
          },
          {
            fileName: '777366.txt',
            id: { institutionId: '1', period: '2017', sequenceNumber: 86 },
            receipt: '',
            status: {
              code: 5,
              message: 'Your data has formatting errors.',
              description:
                'Review these errors and update your file. Then, upload the corrected file.'
            },
            end: 0,
            start: 1534988909641
          }
        ]
      })
    })
  }
}

export function getLatestSubmission() {
  // return fetch({ submission: 'latest' })

  return new Promise(resolve => {
    resolve({
      fileName: 'Bank 0_400 LARS_S025 Ready.txt',
      id: { institutionId: '0', period: '2017', sequenceNumber: 289 },
      receipt: '0-2017-289-1540304400322',
      status: {
        code: 10,
        message: 'Your submission has been accepted.',
        description:
          'This completes your HMDA filing process for this year. If you need to upload a new HMDA file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted.'
      },
      end: 1540304400322,
      start: 1540303997250
    })
  })
}

export function getEdits() {
  return fetch({ suffix: '/edits' })
}

export function getEdit(pathObj) {
  return fetch({ suffix: `/edits/${pathObj.edit}` })
}

export function getCSV(pathObj) {
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : '/edits/csv'
  pathObj.params = { format: 'csv' }
  return fetch(pathObj)
}

export function getIRSCSV(pathObj) {
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : '/irs/csv'
  pathObj.params = { format: 'csv' }
  return fetch(pathObj)
}

export function postVerify(type, verified) {
  return fetch({
    suffix: `/edits/${type}`,
    method: 'POST',
    body: { verified: verified }
  })
}

export function getIRS() {
  return fetch({ suffix: '/irs' })
}

export function getSummary() {
  return fetch({ suffix: '/summary' })
}

export function getSignature() {
  return fetch({ suffix: '/sign' })
}

export function getParseErrors() {
  return fetch({ suffix: '/parseErrors' })
}

export function postUpload(body) {
  return fetch({
    method: 'POST',
    body: body
  })
}

export function postSignature(signed) {
  return fetch({
    suffix: '/sign',
    method: 'POST',
    body: { signed: signed }
  })
}
