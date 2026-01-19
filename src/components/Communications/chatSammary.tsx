import { Check, ExternalLink, TriangleAlert } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import TaskDrawer from './viewTask';
import { RequestInfoDialog } from '../commons/RequestInfoDialog';

const ChatSammary = () => {
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
          <div className="date text-xs py-2 px-3 bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] rounded-full">Overdue</div>
          <p className="text text-sm text-[#4A5565]">Response required by Mar 12</p>
        </div>

        <div className="title text-base mt-6 text-[#101828]">Next Steps</div>
        <div className="items">
          <div className="item flex gap-2 text-[#4A5565] text-sm mt-2.5">
            <Check className="text-[#99A1AF] h-4 w-4 mt-[2px]" />
            Contact structural engineer for clarification
          </div>
          <div className="item flex gap-2 text-[#4A5565] text-sm mt-2.5">
            <Check className="text-[#99A1AF] h-4 w-4 mt-[2px]" />
            Contact structural engineer for clarification
          </div>
          <div className="item flex gap-2 text-[#4A5565] text-sm mt-2.5">
            <Check className="text-[#99A1AF] h-4 w-4 mt-[2px]" />
            Contact structural engineer for clarification
          </div>
        </div>

        <div className="title text-base mt-6 text-[#101828]">Risks</div>
        <div className="items">
          <div className="item flex gap-2 text-[#EF4444] text-sm mt-2.5">
            <TriangleAlert className="text-[#EF4444] h-4 w-4 mt-[2px]" />
            Schedule delay possible
          </div>
          <div className="item flex gap-2 text-[#EF4444] text-sm mt-2.5">
            <TriangleAlert className="text-[#EF4444] h-4 w-4 mt-[2px]" />
            Cost implications unknown
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mt-8">
          <TaskDrawer />
          <RequestInfoDialog />
        </div>
      </div>
    </div>
  );
};

export default ChatSammary;
