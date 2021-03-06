import React from 'react'
import PropTypes from 'prop-types'

import EditsTableCell from './TableCell.jsx'

const EditsTableRow = props => {
  if (!props.row || !props.fields) return null

  const lar = props.row.rowId
  const cells = []
  let cellCount = 0

  Object.keys(props.row).forEach(field => {
    cells.push(
      <EditsTableCell
        keyField={lar}
        field={field}
        cell={props.row[field]}
        key={++cellCount}
      />
    )
  })

  Object.keys(props.fields).forEach(field => {
    cells.push(
      <EditsTableCell
        keyField={lar}
        field={field}
        cell={props.fields[field]}
        key={++cellCount}
      />
    )
  })

  return <tr>{cells}</tr>
}

EditsTableRow.propTypes = {
  row: PropTypes.object,
  fields: PropTypes.object
}

export default EditsTableRow
