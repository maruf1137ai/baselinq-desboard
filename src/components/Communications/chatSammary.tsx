import { Check, ExternalLink, TriangleAlert } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { RequestInfoDialog } from '../commons/RequestInfoDialog';
import { useUpdateTask } from '@/supabse/hook/useTask';

const ChatSammary = ({ task }: { task: any }) => {
  const navigate = useNavigate();
  const { mutateAsync: updateTask } = useUpdateTask();

  if (!task) {
    return (
      <div className="p-6 text-center text-gray-500 text-sm">
        Select a task to view summary
      </div>
    );
  }

  const handleViewTask = () => {
    navigate(`/tasks/${task.id}`);
  };

  const handleRequestInfoSubmit = async (requestData: any) => {
      if (!task) return;
      
      const currentRequests = task.request_info && Array.isArray(task.request_info) 
        ? task.request_info 
        : [];
        
      const updatedRequests = [...currentRequests, requestData];
      
      try {
        await updateTask({ 
          id: task.id, 
          request_info: updatedRequests 
        });
        toast.success("Request sent successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to send request");
      }
    };

  return (
    <div>
      <div className="nav py-3 px-6 border-b border-[#DEDEDE] flex items-center justify-between gap-2 flex-wrap">
        <div>
          <div className="title text-base text-[#101828]">AI Summary</div>
          <p className="text text-sm text-[#6A7282] mt-1">Current status and recommendations</p>
        </div>
      </div>

      <div className="py-3.5 px-6">
        <div className="title text-base text-[#101828]">Status</div>
        <div className="flex items-center gap-2 mt-2">
          <div className={`date text-xs py-2 px-3 border rounded-full ${
            task.status === 'Overdue' || new Date(task.due_date) < new Date() 
            ? 'bg-[#FEF2F2] border-[#FECACA] text-[#EF4444]' 
            : 'bg-green-50 border-green-200 text-green-700'
          }`}>
            {task.status || (new Date(task.due_date) < new Date() ? 'Overdue' : 'On Track')}
          </div>
          <p className="text text-sm text-[#4A5565]">
            {task.due_date ? `Response required by ${new Date(task.due_date).toLocaleDateString()}` : 'No deadline'}
          </p>
        </div>

        {/* Next Steps - Only show if data exists (mocked or real) */}
        {task.nextSteps && task.nextSteps.length > 0 && (
            <>
                <div className="title text-base mt-6 text-[#101828]">Next Steps</div>
                <div className="items">
                {task.nextSteps.map((step: string, i: number) => (
                    <div key={i} className="item flex gap-2 text-[#4A5565] text-sm mt-2.5">
                        <Check className="text-[#99A1AF] h-4 w-4 mt-[2px]" />
                        {step}
                    </div>
                ))}
                </div>
            </>
        )}

        {/* Risks - Only show if data exists */}
        {task.risks && task.risks.length > 0 && (
            <>
                <div className="title text-base mt-6 text-[#101828]">Risks</div>
                <div className="items">
                {task.risks.map((risk: string, i: number) => (
                    <div key={i} className="item flex gap-2 text-[#EF4444] text-sm mt-2.5">
                        <TriangleAlert className="text-[#EF4444] h-4 w-4 mt-[2px]" />
                        {risk}
                    </div>
                ))}
                </div>
            </>
        )}


        <div className="flex flex-col gap-2.5 mt-8">
          <Button onClick={handleViewTask} className="w-full bg-[#6366F1] hover:bg-[#5558E3] text-white">
            <ExternalLink className="mr-2 h-4 w-4" /> View Task
          </Button>
          <RequestInfoDialog onSubmit={handleRequestInfoSubmit} wFull />
        </div>
      </div>
    </div>
  );
};
export default ChatSammary;
