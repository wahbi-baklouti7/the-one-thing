

const storeData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};


const getData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};


const getProjects = ()=>{
    return JSON.parse(localStorage.getItem("projects"));
}
const getProjectDB =(projectId)=>{

    const projects = getProjects();
    return projects.find((project) => project.id == projectId);
}


const getProjectTasks=(ProjectId)=>{
    const project = getProjectDB(ProjectId);

    return project.tasks

}

// const setProject
const setProjectTasksDB = (ProjectId, newTasks) => {
    const projects = getProjects();

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

export { storeData, getData , getProjects, getProjectDB, getProjectTasks, setProjectTasksDB, setProjectsDB}