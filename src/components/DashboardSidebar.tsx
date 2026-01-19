
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Trending from "./icons/Trending";
import AiWorkspace from "./icons/AiWorkspace";
import Communication from "./icons/Communication";
import Task from "./icons/Task";
import SaveMoney from "./icons/SaveMoney";
import Shield from "./icons/Shield";
import Meetings from "./icons/Meeting";
import Programme from "./icons/Programme";
import Document from "./icons/Document";
import Settings from "./icons/Settings";
import Help from "./icons/Help";
import Document2 from "./icons/Document2";
import React from "react";
import Logo from "./icons/Logo";

const navItems = [
  { title: "Overview", url: "/", icon: <Trending /> },
  { title: "AI Workspace", url: "/ai-workspace", icon: <AiWorkspace /> },
  { title: "Communications", url: "/communications", icon: <Communication /> },
  { title: "Tasks", url: "/tasks", icon: <Task /> },
  { title: "Finance", url: "/finance", icon: <SaveMoney /> },
  { title: "Compliance", url: "/compliance", icon: <Shield /> },
  { title: "Meetings", url: "/meetings", icon: <Meetings /> },
  { title: "Programme", url: "/programme", icon: <Programme /> },
  { title: "Documents", url: "/documents", icon: <Document2 /> },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: <Settings /> },
  { title: "Help", url: "/help", icon: <Help /> },
];

export function DashboardSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar className="border-r border-[#DEDEDE] bg-sidebar">
      <SidebarContent className="flex flex-col h-full">
        <div className="p-4">
          <div className="p-3 border border-[#EDEDED] rounded-[16px] flex items-center gap-3">
            <div className="h-9 w-9 bg-[#121212] rounded-[10px]">
              <Logo />
            </div>
            <div className="">
              <h1 className="text-sm font-regular text-[#121212] aeonik">
                Westfield
              </h1>
              {/* <p className="text-xs text-[#4B4B4B] aeonik">Free Plan</p> */}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-2">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs text-[#8B8B8B] px-0 uppercase py-2 text-[#8B8B8B]">
              Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent className="">
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={isActive ? "!bg-white px-[16px] py-[11px] border border-[#E8E8E8] rounded-[8px]" : "border border-transparent px-[16px] py-[11px]"}>
                        <NavLink
                          to={item.url}
                          className="flex items-center gap-3">
                          {React.cloneElement(item.icon, {
                            className: `text-[#6B6B6B]  ${isActive ? "text-black" : ""
                              }`,
                          })}
                          {open && (
                            <span className={`text-sm font-normal ${isActive ? "text-black" : "text-[#6B6B6B]"}`}>{item.title}</span>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs text-muted-foreground uppercase px-3 py-2">
              Settings
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={isActive ? "!bg-white px-[16px] py-[11px] border border-[#E8E8E8] rounded-[8px]" : "border border-transparent px-[16px] py-[11px]"}>
                        <NavLink
                          to={item.url}
                          className="flex items-center gap-3">
                          {React.cloneElement(item.icon, {
                            className: `text-[#6B6B6B]  ${isActive ? "text-black" : ""
                              }`,
                          })}
                          {open && (
                            <span className={`text-sm font-normal ${isActive ? "text-black" : "text-[#6B6B6B]"}`}>{item.title}</span>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {open && (
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {/* <span className="text-foreground font-medium text-sm">MR</span> */}
                <img
                  src="/images/profile-img.png"
                  alt=""
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Michael Robinson
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  michael.robin@gmail.com
                </p>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
