import React from "react";
import { Checkbox } from "antd";

import AscentNotes from "../../model/AscentNotes";

class AscentNoteOptions extends React.Component {
  handleChangeNote = ascentNoteValues => {
    this.props.onChange(ascentNoteValues.reduce((res, note) => (res | note), 0));
  };

  render() {
    const { ascentTypeShortHand } = this.props;
    const notes = Object.values(AscentNotes)
      .filter(note => note.ascentTypes.includes(ascentTypeShortHand))
      .map(note => ({ label: note.label, value: note.value }));

    const defaultValue = Object.values(AscentNotes)
      .map(note => note.value)

    return (
      <Checkbox.Group
        options={notes}
        defaultValue={defaultValue}
        onChange={this.handleChangeNote}
      />
    );
  }
}

export default AscentNoteOptions;
