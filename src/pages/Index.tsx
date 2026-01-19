import { DashboardLayout } from '@/components/DashboardLayout';
import { ProjectStatusCard } from '@/components/ProjectStatusCard';
import { ProjectTimelineCard } from '@/components/ProjectTimelineCard';
import { ActionItem } from '@/components/ActionItem';
import { ActivityFeedItem } from '@/components/ActivityFeedItem';
import { BudgetBreakdownCard } from '@/components/BudgetBreakdownCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Clock, Shield, TrendingUp } from 'lucide-react';
import svgPaths from '../components/svg-msqaf6zyu8';
import { useFetchData } from '@/hooks/useFetchData';
import MyAction from '@/components/icons/MyAction';
import Caution from '@/components/icons/Caution';
import Caution2 from '@/components/icons/Caution2';
import Asterisk from '@/components/icons/Asterisk';
import CashIcon from '@/components/icons/CashIcon';
import Calander2 from '@/components/icons/Calander2';

const icons = ['/images/cash-01.png', '/images/calendar-02.png', '/images/shield-01.png', '/images/asterisk-02.png'];

const Index = () => {
  const { data: projectsOverview, isLoading: loadingProjectsOverview } = useFetchData('project-overview/');
  // const { data: budget, isLoading: loadingBudget } =
  //   useFetchData("budget-breakdown/");
  // const { data: compliance, isLoading: loadingCompliance } =
  //   useFetchData("compliance-status/");
  // const { data: risk, isLoading: loadingRisk } = useFetchData("ai-risk-score/");
  // const { data: schedule, isLoading: loadingsChedule } =
  //   useFetchData("schedule-health/");
  // const { data: projectActivity, isLoading: loadingProjectActivity } =
  //   useFetchData("project-activity/");

  const enhancedData = projectsOverview?.map((item, index) => ({
    ...item,
    icon: icons[index],
  }));

  // console.log({
  //   enhancedData,
  // });

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white">
        <div>
          {/* <p className="text-base text-gray3 mb-1">Dashboard</p>
          <h1 className="text-3xl  tracking-tight text-foreground">Project Overview</h1> */}
          <p className="text-3xl  tracking-tight text-foreground">Welcome , Michael </p>
        </div>





        <div className="grid gap-4 md:grid-cols-2">
          {/* My Action Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <MyAction />
                </div>
                <h3 className="text-sm text-gray2">My Action (6)</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 bg-white p-[7px] mx-2 rounded-[6px]">
              <ActionItem
                title="Review foundation specs with structural engineer"
                description="Check foundation specs and coordinate with structural engineer"
                priority="High"
                dueDate="Jan 07, 2026"
                assignee={{ name: 'RF', color: 'bg-orange-100 text-orange-600' }}
                tag="#rfi-001"
                stats={{ comments: 8, attachments: 3, views: 24, branches: 2 }}
              />
              <ActionItem
                title="Submit fire safety certificate application"
                description="Prepare and submit the fire safety certificate for approval"
                priority="Medium"
                dueDate="Jan 08, 2026"
                assignee={{ name: 'SI', color: 'bg-blue-100 text-blue-600' }}
                tag="#si-001"
                stats={{ comments: 3, attachments: 1, views: 12, branches: 1 }}
              />
              <ActionItem
                title="Approve material variation for facade panels"
                description="Review and approve the proposed material variations for facade"
                priority="High"
                dueDate="Jan 09, 2026"
                assignee={{ name: 'VO', color: 'bg-purple-100 text-purple-600' }}
                tag="#vo-001"
                stats={{ comments: 5, attachments: 7, views: 18, branches: 3 }}
              />
              {/* <ActionItem
                title="Facade Panel Material Variation Approval Delay Claim"
                description="Handle delay claim for facade panel material approval"
                priority="Medium"
                dueDate="Jan 12, 2026"
                assignee={{ name: 'DC', color: 'bg-purple-100 text-purple-600' }}
                tag="#dc-001"
                stats={{ comments: 5, attachments: 7, views: 18, branches: 3 }}
              />
              <ActionItem
                title="Cost Proposal for facade panels"
                description="Prepare cost proposals for the facade panel materials"
                priority="Medium"
                dueDate="Jan 12, 2026"
                assignee={{ name: 'CPI', color: 'bg-purple-100 text-purple-600' }}
                tag="#cpi-001"
                stats={{ comments: 5, attachments: 7, views: 18, branches: 3 }}
              />
              <ActionItem
                title="GI for facade panels"
                description="Prepare General Instructions (GI) for facade panel works"
                priority="Medium"
                dueDate="Jan 12, 2026"
                assignee={{ name: 'GI', color: 'bg-purple-100 text-purple-600' }}
                tag="#gi-001"
                stats={{ comments: 5, attachments: 7, views: 18, branches: 3 }}
              /> */}
            </CardContent>
          </Card>

          {/* Activity Feed Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Caution2 />
                </div>
                <h3 className="text-sm text-gray2">Activity Feed</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-0 bg-white p-[7px] mx-2 rounded-[6px]">
              <ActivityFeedItem
                title="RFI-001: Review foundation specs with structural engineer"
                status="Waiting"
                author="RF"
                timeAgo="Just now"
              />
              <ActivityFeedItem
                title="SI-001: Submit fire safety certificate application"
                status="Waiting on info"
                author="SI"
                timeAgo="1 hour ago"
              />
              <ActivityFeedItem
                title="VO-001: Approve material variation for facade panels"
                status="Pending"
                author="VO"
                timeAgo="2 hours ago"
              />
              {/* <ActivityFeedItem
                title="DC-001: Facade Panel Material Variation Approval Delay Claim"
                status="Pending"
                author="DC"
                timeAgo="3 hours ago"
              />
              <ActivityFeedItem
                title="CPI-001: Cost Proposal for facade panels"
                status="Pending"
                author="CPI"
                timeAgo="4 hours ago"
              />
              <ActivityFeedItem
                title="GI-001: GI for facade panels"
                status="Pending"
                author="GI"
                timeAgo="5 hours ago"
              /> */}
            </CardContent>
          </Card>
        </div>


        <BudgetBreakdownCard progress={65} daysStatus="8 days behind" />
        <ProjectTimelineCard startDate="Jan 15" currentDate="Mar 8" deadline="May 30" progress={65} daysStatus="8 days behind" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ProjectStatusCard
            icon={<CashIcon />}
            title="Budget Health"
            value="85%"
            subtitle="R 862,500 / R 15,000,000"
            badgeText="On track"
            badgeVariant="success"
            actionText="Review forecast"
          />
          <ProjectStatusCard
            icon={<Calander2 />}
            title="Schedule Health"
            value="115%"
            subtitle="3 days average"
            badgeText="2 delayed"
            badgeVariant="destructive"
            actionText="Adjust timeline"
          />
          <ProjectStatusCard
            icon={<Shield />}
            title="Compliance"
            value="5"
            subtitle="2 overdue • 3 due soon"
            badgeText="Action required"
            badgeVariant="destructive"
            actionText="Review obligations"
          />
          <ProjectStatusCard
            icon={<Asterisk />}
            title="AI Risk Score"
            value="Medium"
            badgeText="Improving"
            badgeVariant="success"
            actionText="View risk dashboard"
          />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Index;
