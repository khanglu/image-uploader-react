import React from 'react';
import styles from './App.css';
import UploadContainer from '../src/UploadContainer';

const App = () => (
  <div className={styles.app}>
    <h2>Hello, World</h2>
    <UploadContainer/>
  </div>
);

export default App;