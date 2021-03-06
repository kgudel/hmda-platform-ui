jest.unmock('./requestFiling.js')
jest.unmock('../constants')
import * as types from '../constants'
import requestFiling from './requestFiling.js'

describe('requestFiling', () => {
  it('creates an action to signal a request for the relevant filing', () => {
    expect(requestFiling({ institutionId: '123' })).toEqual({
      type: types.REQUEST_FILING,
      id: '123'
    })
  })
})
