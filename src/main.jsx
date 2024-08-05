import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
// import './index.css'
import './App.css'
import ProjectProvider from './context/ProjectContext.jsx'
import TaskProvider from './context/TaskContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectProvider>
      <TaskProvider>
        <App />
        </TaskProvider>
    </ProjectProvider>
  </React.StrictMode>,
)
