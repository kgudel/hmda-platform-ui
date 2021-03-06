import setFile from './setFile.js'
import suppressEdits from './suppressEdits.js'

export default function selectFile(file) {
  return (dispatch, getState) => {
    const id = getState().app.institutionId
    if (file.size > 5e6) dispatch(suppressEdits())
    return dispatch(setFile(file, id))
  }
}
