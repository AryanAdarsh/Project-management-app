import ProjectsSidebar from "./components/ProjectSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectedSelected.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    tasks: [],
    projects: []
  });

  function handleSelectProject(id){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId: id,
      }
      })
    }
    function handleProjectsDelete(){
      setProjectsState(prevState=>{
        return{
          ...prevState,
          selectedProjectId: undefined,
          projects: prevState.projects.filter(
            (project) => project.id !== prevState.selectedProjectId,
          ),
        };
        });
      }
  function handleProjectsState(){
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId: null,
      }
      })
    }

    function handleCancel(){
      setProjectsState(prevState=>{
        return{
          ...prevState,
          selectedProjectId:undefined,
        }
      })
    }
    function handleAddTasks(text){
      const taskId= Math.random(); 
      setProjectsState((prevState)=>{
        const newTask = {
          text: text,
          projectId: prevState.selectedProjectId,
          id: taskId,
        };
        return{
          ...prevState,
          tasks: [...projectsState.tasks,newTask],
        };
      });
    }

    function handleDeleteTasks(id){
      setProjectsState(prevState=>{
        return{
          ...prevState,
          tasks: prevState.tasks.filter(
            (task) => task.id !== id,
          ),
        };
        });
    }
    function handleAddProjects(projectData){
      const projectId= Math.random(); 
      setProjectsState((prevState)=>{
        const newProject = {
          ...projectData,
          id: projectId,
        };
        return{
          ...prevState,
          selectedProjectId: undefined,
          projects: [...projectsState.projects,newProject],
        };
      });
    }

    const selectedProject = projectsState.projects.find(project=> project.id === projectsState.selectedProjectId);
    let content= <SelectedProject project={selectedProject} onDelete={handleProjectsDelete} onAddTasks={handleAddTasks} onDeleteTasks={handleDeleteTasks} tasks={projectsState.tasks}/>;

    if(projectsState.selectedProjectId===null){
      content = <NewProject onAdd={handleAddProjects} onStartAddProject={handleProjectsState} onCancel={handleCancel}/>
    }
    else if(projectsState.selectedProjectId===undefined){
      content = <NoProjectSelected onStartAddProject={handleProjectsState}/>
    }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleProjectsState} projects={projectsState.projects} onSelectProject={handleSelectProject}
      selectedProjectID={projectsState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
