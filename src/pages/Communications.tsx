import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ChatSidebar } from "@/components/Communications/chatSidebar";
import ChatWindow from "@/components/Communications/chatWindow";
import ChatSammary from "@/components/Communications/chatSammary";

const Communications = () => {
  return (
    <DashboardLayout padding="p-0">
      <div className="h-full flex">
        <div className="border-border bg-white flex-shrink-0">
          <ChatSidebar />
        </div>
        <div className="chatWindow flex-1">
          <ChatWindow />
        </div>
        <div className="chatSummary flex-shrink-0 w-80">
          <ChatSammary />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Communications;
