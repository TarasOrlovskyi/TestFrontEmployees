import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEmployee } from '../actions/employees';
import styles from './EmployeeForm.module.css';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    salary: '',
    experience: ''
};

const validate = {
    firstName: v => /^[A-Za-z]+$/.test(v),
    lastName: v => /^[A-Za-z]+$/.test(v),
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    department: v => /^[A-Za-z]+$/.test(v),
    salary: v => /^\d+$/.test(v),
    experience: v => /^\d+$/.test(v),
};

class EmployeeForm extends Component {
    state = {
        form: { ...initialState },
        touched: {}
    };

    handleChange = (e) => {
        this.setState({
            form: { ...this.state.form, [e.target.name]: e.target.value }
        });
    };

    handleBlur = (e) => {
        this.setState({
            touched: { ...this.state.touched, [e.target.name]: true }
        });
    };

    isValid = () => {
        return Object.keys(validate).every(
            key => validate[key](this.state.form[key])
        );
    };

    handleSubmit = () => {
        const { form } = this.state;
        const payload = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            department: form.department,
            salary: parseFloat(form.salary),
            yearsOfExperience: parseInt(form.experience)
        };
        this.props.addEmployee(payload);
        this.setState({ form: { ...initialState }, touched: {} });
    };

    render() {
        return (
            <div className={styles.formRow}>
                {Object.keys(initialState).map((field) => (
                    <input
                        key={field}
                        name={field}
                        value={this.state.form[field]}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className={
                            this.state.touched[field] && !validate[field](this.state.form[field])
                                ? styles.invalid
                                : ''
                        }
                    />
                ))}
                <button disabled={!this.isValid()} onClick={this.handleSubmit}>
                    Add employee
                </button>
            </div>
        );
    }
}

export default connect(null, { addEmployee })(EmployeeForm);