var React = require('react');
var EditsDetailRow = require('./EditsDetailRow.jsx');
require('cf-expandables');

var EditsDetail = React.createClass({
  propTypes: {
    edits: React.PropTypes.array
  },

  headerMap: {
    id: 'Edit ID',
    desc: 'Description',
    field: 'Field',
    valueSubmitted: 'Value Submitted',
    justification: 'Justification',
    verified: 'Verified'
  },

  render: function() {
    var self = this;
    if(!this.props.edits || !this.props.edits[0]) return null;

    var headers = Object.keys(this.props.edits[0]);
    if(!headers) return null;

    return (
      <div className="EditsDetail expandable_content">
        <table width="100%">
          <thead>
            <tr>
              {headers.map(function(header, i){
                return <th key={i}>{self.headerMap[header]}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.edits.map(function(edit, i){
              return <EditsDetailRow id={i} key={i} edit={edit}/>
            })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = EditsDetail;