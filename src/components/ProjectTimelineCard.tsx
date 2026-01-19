import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import ProjectTimeline from './icons/ProjectTimeline';

interface ProjectTimelineCardProps {
  startDate: string;
  currentDate: string;
  deadline: string;
  progress: number;
  daysStatus: string;
}

export function ProjectTimelineCard({ startDate, currentDate, deadline, progress, daysStatus }: ProjectTimelineCardProps) {
  return (
    <Card>
      <CardContent className="p-5 bg-[#F3F2F0] border-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              {/* <img
                src="/images/time-schedule.png"
                alt=""
                className="h-4 w-4 text-gray2"
              /> */}
              <ProjectTimeline />
            </div>
            <h3 className="text-sm text-gray2">Project Timeline</h3>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray2">
            <span className="py-[1px] px-3 bg-white rounded-full">{progress}% Complete</span>
            <span className="text-red_dark border border-red_light py-[1px] px-3 bg-white rounded-full">{daysStatus}</span>
          </div>
        </div>

        <div className=" bg-white h-[142px] flex flex-col justify-between p-4 rounded-[6px]">
          <div></div>
          <div className="flex flex-col gap-5">
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray2 text-sm">Started: {startDate}</span>
              <span className="text-primary text-sm">Current: {currentDate}</span>
              <span className="text-gray2 text-sm">Deadline: {deadline}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
