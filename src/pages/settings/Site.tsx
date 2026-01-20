import { useProjects } from "@/supabse/hook/useProject";
import { useEffect, useState } from "react";


const Site = () => {
    const { data: projects = [], isLoading } = useProjects();
   const [selectedProjectId, setSelectedProjectId] = useState(() =>
      localStorage.getItem("selectedProjectId") || ""
    );
    const [currentProject , setCurrentProject] = useState<any>(null)
  
    useEffect(() => {
     if(isLoading) return
     setCurrentProject(projects.find((p: any) => p.id === selectedProjectId))
    }, [projects, isLoading, selectedProjectId]);
    
    console.log('currentProject', currentProject)
  
  return  <div className="p-6">
     <h2 className="text-[23px] text-[#1A1A1A] mb-2">Site Settings</h2>
      <p className="text-[#6B7280] text-base mb-6">
       Manage site location, photos, and environmental settings.
      </p>
  </div>
};

export default Site;
