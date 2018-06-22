import React, { Component } from 'react';
class TaskForm extends Component {
  constructor ( props ) {
    super(props);
    this.state = {
      name: '',
      status: false
    }
  }

  componentWillMount() {
    if (this.props.taskEditing) {
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status
      })  
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEditing) {
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status
      })  
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.props.onHideForm();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    })
  }
  render() {
    return (
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">
                  { this.state.id ? "Edit Todo" : "New Todo"}
                  <span className="fa fa-times-circle text-right" onClick={ this.props.onHideForm }></span>
                </h3>
              </div>
              <div className="panel-body">
                <form onSubmit={ this.onSubmit }>
                  <div className="form-group">
                    <label>Name : </label>
                    <input type="text" 
                          className="form-control" 
                          name="name"
                          value={ this.state.name }
                          onChange={ this.onChange }
                    />
                  </div>
                  
                  <label>Status : </label>
                  <select name="status" 
                          className="form-control" 
                          value={ this.state.status }
                          onChange={ this.onChange }
                  >
                        
                        <option value={true}>Active</option>
                        <option value={false}>InActive</option>
                  </select>
                  <br/>
                  <div className="text-center">
                    <button type="submit" className="btn btn-warning">
                      <span className="fa fa-plus mr-5"></span>Save
                    </button>&nbsp;
                    <button type="button" className="btn btn-warning" onClick={ this.onClear }>
                      <span className="fa fa-plus mr-5"></span>Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
    );
  }
}

export default TaskForm;
