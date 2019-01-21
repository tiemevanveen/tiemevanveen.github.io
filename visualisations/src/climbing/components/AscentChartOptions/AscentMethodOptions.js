import React from "react";
import { Checkbox } from "antd";

import AscentMethods from "../../model/AscentMethods";

class AscentMethodOptions extends React.Component {
  handleChangeMethod = ascentMethodIds => {
    this.props.onChange(ascentMethodIds);
  };

  render() {
    const { ascentTypeShortHand } = this.props;
    const methods = Object.values(AscentMethods)
      
      .filter(method => method.ascentTypes.includes(ascentTypeShortHand))
      .map(method => ({ label: method.label, value: method.id }));
    const defaultValue = Object.values(AscentMethods)
      
      .map(m => m.id)
      .filter(id => id !== 6); /* attempt */
    return (
      <Checkbox.Group
        options={methods}
        defaultValue={defaultValue}
        onChange={this.handleChangeMethod}
      />
    );
  }
}

export default AscentMethodOptions;
