import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm : false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: ''
    }
  }

  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
      console.log(tasks);
    }
  }

  generateId(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  s4() {
    return Math.floor((1+Math.random()) * 0x100000).toString(16).substring(1);
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      })
    }
    
  }

  onHideForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onSubmit = (data) => {
    console.log(data);
    var { tasks } = this.state;
    if (data.id === '') {
      data.id = this.generateId();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
      this.setState({
        taskEditing: null
      })
    }
    
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.onHideForm();
    }
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) 
        result = index;
    })
    return result;
  }

  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    if (index !== -1) {
      this.setState({
        taskEditing: taskEditing
      })
      this.onShowForm();
    }
  }

  onFilter = (filterName, filterStatus) => {
    console.log(filterName + ' - ' + filterStatus);
    filterStatus = parseInt(filterStatus, 10);
    this.setState ({
      filter: {
        name: filterName,
        status: filterStatus
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    });
  }
  render() {
    var { tasks, isDisplayForm, taskEditing , filter , keyword } = this.state; // var tasks = this.state.tasks;
    var eleTaskForm = isDisplayForm ? <TaskForm  onHideForm= { this.onHideForm } onSubmit={ this.onSubmit } taskEditing={ taskEditing }/> : '';
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
        });
      }

      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true :  false)
        }
      })
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase())  !== -1;
      });
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Todo List</h1>
        </div>
        <div className="row">
          <div className={ isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
             {/*Form*/}
            {/*<TaskForm/>*/}
            { eleTaskForm }
            
          </div>
          <div className={ isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={ this.onToggleForm }>
              <span className="fa fa-plus mr-5"></span>Add new todo
            </button>
           {/* <button type="button" className="btn btn-danger" onClick={ this.onGenerateData }>
              Generate data
            </button>*/}
            
            {/*sort - search*/}
            <Control onSearch={ this.onSearch } />
            
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList tasks= { tasks } onUpdateStatus={ this.onUpdateStatus } onDelete={ this.onDelete } onUpdate={ this.onUpdate } onFilter={ this.onFilter }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
