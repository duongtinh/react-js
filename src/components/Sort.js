import React, { Component } from 'react';
class Sort extends Component {
  constructor(props) {
    super(props);
  }
  onClick (sortName, sortValue) {
    // console.log(sortName + '-' + sortValue);

    this.props.onSort(sortName, sortValue);
  } 
  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button type="button" 
                  className="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                  id="dropdownMenu1"
                  
          >
            Sort <span className="fa fa-caret-square-o-down ml-5"></span>
          </button>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={ () => this.onClick('name', 1) }>
              <a role="button" className={(this.props.sortName === "name" && this.props.sortValue === 1) ? "sort_selected" : ""}>
                <span className="fa fa-sort-alpha-asc pr-5">
                  Name A-Z
                </span>
                
              </a>
            </li>

            <li onClick={ () => this.onClick('name', -1) }>
              <a role="button" className={(this.props.sortName === "name" && this.props.sortValue === -1) ? "sort_selected" : ""}>
                <span className="fa fa-sort-alpha-desc pr-5">
                  Name Z-A
                </span>
                
              </a>
            </li>
            <li role="separator" className="devider"></li>
            <li onClick={ () => this.onClick('status', 1) }>
              <a role="button" className={(this.props.sortName === "status" && this.props.sortValue === 1) ? "sort_selected" : ""}>
                <span className="fa fa-sort-alpha-desc pr-5">
                  Active
                </span>
                
              </a>
            </li>
            <li onClick={ () => this.onClick('status', -1) }>
              <a role="button" className={(this.props.sortName === "status" && this.props.sortValue === -1) ? "sort_selected" : ""}>
                <span className="fa fa-sort-alpha-desc pr-5">
                  InActive
                </span>
                
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
