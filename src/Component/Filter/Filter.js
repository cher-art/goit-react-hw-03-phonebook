import React, { Component } from 'react';
import styles from './Filter.module.css'

class Filter extends Component {
  render() {
    return (
      <label>
        <input className={styles.mainInput}name="filter" onChange={this.props.onHandleChange} value={this.props.filter}/>
      </label>
    );
  }
}

export default Filter;