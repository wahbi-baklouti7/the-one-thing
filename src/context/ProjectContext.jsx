import React, { createContext } from 'react'
import { getData } from '../lib/localDB'


const ProjectContext = createContext()
const ProjectProvider = () => {

    // const getProjectTasks= () => {
    //     const project = getData("projects")
    //     const getProject = project.find((p) => p.id == id)
    //     console.log("getProject.tasks------------------------"+getProject.tasks)
    //     setTasks(getProject.tasks)
    // }
  return (
    <ProjectContext.Provider value={{}}>
          {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider