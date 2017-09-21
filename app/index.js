import component from './component';
import Library from './library.js';
import style1 from './style1.css';
import style2 from './style2.css';
import 'react';

document.body.appendChild(component('hello world',style1.class1,style2.class1));

// HMR interface
if(module.hot) {
  // Capture hot update
  module.hot.accept('./library', () => {
    console.log('Accepting the updated library module!');
    Library.log();
  });
}