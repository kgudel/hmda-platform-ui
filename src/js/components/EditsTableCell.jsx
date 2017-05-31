import React, { PropTypes } from 'react'

const EditsTableCell = props => {
  let cellContent = props.cell
  if(props.cell === '') cellContent = <em>(blank)</em>
  return <td>{cellContent}</td>
}

EditsTableCell.propTypes = {
  cell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
}

export default EditsTableCell
