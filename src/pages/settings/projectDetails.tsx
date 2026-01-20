import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProjects } from "@/supabse/hook/useProject";
import { OnboardingModal } from "@/components/OnboardingModal";
import React, { useState } from "react";

const ProjectDetails = () => {
  const { data: projects = [], isLoading } = useProjects();
  const [showEditModal, setShowEditModal] = useState(false);
  const selectedProjectId = localStorage.getItem("selectedProjectId");
  const selectedProject = projects.find((project: any) => project.id === selectedProjectId);
  console.log(selectedProject);

  return <div className="p-6 ">
    <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
      <div>
        <h2 className="text-[23px] text-[#1A1A1A]">Project Details</h2>
        <p className="text-[#6B7280] text-base">
          View and manage core project information.
        </p>
      </div>
      <div className="flex gap-2">
        <Button className={cn('bg-transparent text-[#6B7280] border border-[#E5E7EB] hover:bg-transparent flex items-center gap-2 cursor-pointer')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 10V2" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.66699 6.6665L8.00033 9.99984L11.3337 6.6665" stroke="#6B7280" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          Export Details
        </Button>
        <Button
          onClick={() => setShowEditModal(true)}
          className={cn('bg-primary text-white border border-border_color text-base !py-3 !px-4 flex items-center gap-2 cursor-pointer')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.1156 4.54126C14.4681 4.18888 14.6662 3.71091 14.6662 3.2125C14.6663 2.71409 14.4683 2.23607 14.116 1.8836C13.7636 1.53112 13.2856 1.33307 12.7872 1.33301C12.2888 1.33295 11.8108 1.53088 11.4583 1.88326L2.56096 10.7826C2.40618 10.9369 2.29171 11.127 2.22763 11.3359L1.34696 14.2373C1.32973 14.2949 1.32843 14.3562 1.3432 14.4145C1.35796 14.4728 1.38824 14.5261 1.43083 14.5686C1.47341 14.6111 1.52671 14.6413 1.58507 14.656C1.64343 14.6707 1.70467 14.6693 1.7623 14.6519L4.6643 13.7719C4.87308 13.7084 5.06308 13.5947 5.21763 13.4406L14.1156 4.54126Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          Edit Project Info
        </Button>

      </div>
    </div>

    <div
      className="item border border-border_color rounded-[14px] mt-4"
    >
      <div className="p-6 flex gap-3">
        <div className="w-full">
          <div className="title text-base text-[#1A1A1A] mb-6">Overview</div>

          <div className="grid grid-cols-2 gap-5 mt-2">
            <div className="item">
              <div className="text-xs text-[#6B7280] mb-1">Project Name</div>
              <div className="text-base text-[#1A1A1A]">{selectedProject?.name || "N/A"}</div>
            </div>
            <div className="item">
              <div className="text-xs text-[#6B7280] mb-1">Project Code</div>
              <div className="text-base text-[#1A1A1A]">{selectedProject?.number || "N/A"}</div>
            </div>
            <div className="item">
              <div className="text-xs text-[#6B7280] mb-1">Location</div>
              <div className="text-base text-[#1A1A1A]">{selectedProject?.location || "N/A"}</div>
            </div>
            <div className="item">
              <div className="text-xs text-[#6B7280] mb-1">Project Type</div>
              <div className="text-base text-[#1A1A1A]">{selectedProject?.contract_type || "N/A"}</div>
            </div>
            <div className="item">
              <div className="text-xs text-[#6B7280] mb-1">Start Date</div>
              <div className="text-base text-[#1A1A1A]">{selectedProject?.start_date || "N/A"}</div>
            </div>
            <div className="item">
              <div className="text-xs text-[#6B7280] mb-1">End Date</div>
              <div className="text-base text-[#1A1A1A]">{selectedProject?.end_date || "N/A"}</div>
            </div>
            <div className="item col-span-2">
              <div className="text-xs text-[#6B7280] mb-1">Description</div>
              <div className="text-base text-[#1A1A1A]">{selectedProject?.description || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OnboardingModal
      isOpen={showEditModal}
      onOpenChange={setShowEditModal}
      project={selectedProject}
    />
  </div>;
};

export default ProjectDetails;
