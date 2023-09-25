import ReactDOM from 'react-dom';
import React from 'react';
import App from "./App";
import "./widget.css";


document.addEventListener(
  'DOMContentLoaded',
  function () {
    const reactRenderDiv = document.createElement('div');
    reactRenderDiv.setAttribute('id', 'element');
    document.body.append(reactRenderDiv);

    const root = ReactDOM.createRoot(reactRenderDiv);
    root.render(<App/>);
  },
  false
);
