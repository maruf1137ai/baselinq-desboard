import { useState } from "react";
import {
  Plus,
  PenSquare,
  MoreVertical,
  PanelLeft,
  Grid3x3,
  UserPlus,
  MoreHorizontal,
  Search,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideBar from "../icons/SideBar";
import NewChat from "../icons/NewChat";
import Explorer from "../icons/Explorer";
import NewDoc from "../icons/NewDoc";
import InviteMember from "../icons/InviteMember";
import { Input } from "../ui/input";

interface Conversation {
  id: string;
  title: string;
  preview: string;
}

const data = [
  {
    id: "RFI-001",
    title: "Review foundation specs with structural engineer",
    due: "Jan 07, 2026",
    count: 2,
  },
  {
    id: "SI-001",
    title: "Submit fire safety certificate application",
    due: "Jan 08, 2026",
    count: 1,
  },
  {
    id: "VO-001",
    title: "Approve material variation for facade panels",
    due: "Jan 09, 2026",
    count: 0,
  },
  {
    id: "DC-001",
    title: "Approve material variation for facade panels",
    due: "Jan 12, 2026",
    count: 0,
  },
  {
    id: "CPI-001",
    title: "Cost Proposal for facade panels",
    due: "2025-01-12",
    count: 0,
  },
  {
    id: "GI-001",
    title: "GI for facade panels",
    due: "2025-01-12",
    count: 0,
  },
];

interface ChatSidebarProps {
  onNewChat: () => void;
}

export function ChatSidebar({ onNewChat }: ChatSidebarProps) {
  const [activeChat, setActiveChat] = useState("2");
  const [open, setOpen] = useState(true);


  return (
    <div
      className={`border-r h-full flex flex-col border-[#DEDEDE] transition-all justify-between max-h-[calc(100vh-65px)] overflow-y-auto ${open ? "w-64" : "w-16"
        }`}>
      <div className=" p-3">
        {/* <div
          className={`flex items-center ${
            open ? "justify-between" : "justify-center"
          } gap-2`}>
          <button
            className="w-[50px] rounded-lg flex items-center justify-center h-10 bg-[#F9F9F9] shrink-0"
            onClick={setOpen.bind(null, !open)}>
            <SideBar />
          </button>
        </div> */}

        {open && (
          <>
            <div className="flex items-center gap-1.5">
              <div className="relative max-w-md flex-1 hidden md:block ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground" />
              <Input
                placeholder="Search Channels"
                className="pl-10 bg-[#F7F7F7] py-[12px] placeholder:text-[#6B6B6B] border-[#EDEDED] rounded-[11px]"
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-sm text-muted-foreground border border-[#EDEDED] bg-white p-[9px] rounded-[9px]">
                <Command color="#000" className="h-[14px] w-[14px]" />
                <span>K</span>
              </div>
            </div>
              <button className="py-[15px] border rounded-[9px] px-[15px]">
                <UserPlus size={14} />
              </button>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {data.map((item) => {
                const { id, title, due, count } = item;
                return (
                  <div
                    key={id}
                    className="py-3.5 px-4 bg-white rounded-[8px] cursor-pointer hover:bg-[#F3F4F6] border border-[#E8E8E8] relative">
                    {count > 0 && (
                      <div className="py-[2px] px-2 bg-black rounded-full inline-block text-white absolute top-2 right-2 text-xs">
                        {count}
                      </div>
                    )}

                    <div className="flex flex-col gap-2.5">
                      <div className="title text-black text-sm">{id}</div>
                      <div className="title text-[#4B5563] text-sm">
                        {title}
                      </div>
                      <div className="title text-[#6B7280] text-xs">
                        Due: {due}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <SidebarFooter className=" p-3">
        {open ? (
          <button className="flex items-center gap-2 text-sm text-[#0D0D0D] hover:text-foreground">
            <InviteMember />
            <span>Invite members</span>
          </button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8 mx-auto">
            <InviteMember />
          </Button>
        )}
      </SidebarFooter>
    </div>
  );
}
