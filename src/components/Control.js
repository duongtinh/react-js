import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
class Control extends Component {
  render() {
    return (
      <div className="row mt-15">
        <Search onSearch={ this.props.onSearch }/>

        <Sort onSort={ this.props.onSort }  sortName={ this.props.sortName } sortValue={ this.props.sortValue }/>
      </div>
    );
  }
}

export default Control;
