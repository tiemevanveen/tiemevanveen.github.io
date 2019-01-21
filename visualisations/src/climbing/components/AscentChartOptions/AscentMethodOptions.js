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
      .filter(m => m !== AscentMethods.ATTEMPT)
      .map(m => m.id)
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
