/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

// language dropdown nav item for when translations are enabled
class UsageTips extends React.Component {
  render() {
    return (
      <div>
        <a id="idea-menu" href={`${this.props.baseUrl}help`}>
            <img
                className="idea-icon"
                src={`${this.props.baseUrl}img/idea.svg`}
                alt="使用小贴士"
            />
        </a>
      </div>
    );
  }
}

module.exports = UsageTips;
