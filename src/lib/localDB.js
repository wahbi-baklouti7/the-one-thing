

const getProjectsDB = ()=>{
    return JSON.parse(localStorage.getItem("projects"));
}
const getProjectDB =(projectId)=>{

    const projects = getProjectsDB();
    return projects.find((project) => project.id == projectId);
}


const getProjectTasks=(ProjectId)=>{
    const project = getProjectDB(ProjectId);

    return project.tasks

}

// const setProject
const setProjectTasksDB = (ProjectId, newTasks) => {
    const projects = getProjectsDB();

    const newProjects = projects.map((project) => {
        if (project.id == ProjectId) {
            return { ...project, tasks: newTasks };
        }
        return project;
    })
    const project = getProjectDB(ProjectId);
    project.tasks = newTasks;
    setProjectsDB(newProjects)
}

const setProjectsDB = (newProjects) => {
    localStorage.setItem("projects", JSON.stringify(newProjects));
}

// export { storeData, getData , getProjectsDB, getProjectDB, getProjectTasks, setProjectTasksDB, setProjectsDB}
export {  getProjectsDB, getProjectDB, getProjectTasks, setProjectTasksDB, setProjectsDB}