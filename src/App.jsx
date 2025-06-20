import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from './actions/employees';
import EmployeeForm from './components/EmployeeForm';
import EmployeeRow from './components/EmployeeRow';
import styles from './App.module.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchEmployees();
  }

  render() {
    const { employees } = this.props;
    return (
        <div className={styles.container}>
          <EmployeeForm />
          <div className={styles.employeeList}>
            {employees.map((emp) => (
                <EmployeeRow key={emp.id} employee={emp} />
            ))}
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees
});

export default connect(mapStateToProps, { fetchEmployees })(App);
