import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEmployee } from '../actions/employees';
import styles from './EmployeeRow.module.css';

const validate = {
    firstName: v => /^[A-Za-z]+$/.test(v),
    lastName: v => /^[A-Za-z]+$/.test(v),
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    department: v => /^[A-Za-z]+$/.test(v),
    salary: v => /^\d+$/.test(v),
    yearsOfExperience: v => /^\d+$/.test(v),
};

class EmployeeRow extends Component {
    state = {
        edit: false,
        form: { ...this.props.employee },
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

    handleSave = () => {
        const { form } = this.state;
        this.props.updateEmployee(this.props.employee.id, {
            ...form,
            salary: parseFloat(form.salary),
            yearsOfExperience: parseInt(form.yearsOfExperience)
        });
        this.setState({ edit: false });
    };

    render() {
        return (
            <div className={styles.row}>
                {Object.entries(this.state.form).map(([key, value]) => (
                    <input
                        key={key}
                        name={key}
                        value={value}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        disabled={!this.state.edit}
                        className={
                            this.state.edit && this.state.touched[key] && !validate[key](value)
                                ? styles.invalid
                                : ''
                        }
                    />
                ))}
                {this.state.edit ? (
                    <button disabled={!this.isValid()} onClick={this.handleSave}>Save</button>
                ) : (
                    <>
                        <button onClick={() => this.setState({ edit: true })}>Edit</button>
                        <button>Delete</button>
                    </>
                )}
            </div>
        );
    }
}

export default connect(null, { updateEmployee })(EmployeeRow);
