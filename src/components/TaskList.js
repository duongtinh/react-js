import React, { Component } from 'react';
import TaskItem from './TaskItem'
class TaskList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    }
  } 

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value
    })
  }
  render() {
    var { tasks } = this.props; // var tasks = this.props.tasks;
    // var { filterName, filterStatus } = this.state;
    var eleTasks = tasks.map((task, index) => {
      return <TaskItem key= { task.id } index= { index } task= { task } onUpdateStatus={ this.props.onUpdateStatus } onDelete={ this.props.onDelete } onUpdate={ this.props.onUpdate }/>;
    })
    return (
        <table className="table table-bordered table-hover mt-15">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input type="text" 
                          name="filterName" 
                          className="form-control" 
                          value={ this.state.filterName }
                          onChange={ this.onChange }
                  />
                </td>
                <td>
                  <select name="filterStatus" 
                          className="form-control" 
                          value={ this.state.filterStatus }
                          onChange={ this.onChange }
                  >

                    <option value={-1}>All</option>
                    <option value={0}>InActive</option>
                    <option value={1}>Active</option>
                  </select>
                </td>
                <td></td>
              </tr>
                { eleTasks }
            </tbody>
          </table>
    );
  }
}

export default TaskList;
