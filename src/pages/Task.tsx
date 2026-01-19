import React, { useRef, useState } from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Paperclip, Eye, GitBranch, Plus, Link2 } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import Spark from '@/components/icons/Spark';
import { useNavigate } from 'react-router-dom';

const initialTasks = {
  todo: [
    {
      id: 'RFI-001',
      title: 'Review foundation specs with structural engineer',
      date: 'Jan 07, 2026',
      assignee: { name: 'RF', color: 'bg-orange-100 text-orange-600' },
      tag: '#rfi-001',
      // status: 'Overdue',
      // warning: 'Predicted delay >21 days',
      stats: { comments: 8, attachments: 3, views: 24, branches: 2 },
    },
    {
      id: 'SI-001',
      title: 'Submit fire safety certificate application',
      date: 'Jan 08, 2026',
      assignee: { name: 'SI', color: 'bg-blue-100 text-blue-600' },
      tag: '#si-001',
      status: 'Waiting on info',
      stats: { comments: 3, attachments: 1, views: 12, branches: 1 },
    },
    {
      id: 'VO-001',
      title: 'Approve material variation for facade panels',
      date: 'Jan 09, 2026',
      assignee: { name: 'VO', color: 'bg-purple-100 text-purple-600' },
      tag: '#vo-001',
      stats: { comments: 5, attachments: 7, views: 18, branches: 3 },
    },
    {
      id: 'DC-001',
      title: 'Facade Panel Material Variation Approval Delay Claim',
      date: 'Jan 12, 2026',
      assignee: { name: 'DC', color: 'bg-purple-100 text-purple-600' },
      tag: '#dc-001',
      stats: { comments: 5, attachments: 7, views: 18, branches: 3 },
    },
    {
      id: 'CPI-001',
      title: 'Cost Proposal for facade panels',
      date: 'Jan 12, 2026',
      assignee: { name: 'CPI', color: 'bg-purple-100 text-purple-600' },
      tag: '#cpi-001',
      stats: { comments: 5, attachments: 7, views: 18, branches: 3 },
    },
    {
      id: 'GI-001',
      title: 'GI for facade panels',
      date: 'Jan 12, 2026',
      assignee: { name: 'GI', color: 'bg-purple-100 text-purple-600' },
      tag: '#gi-001',
      stats: { comments: 5, attachments: 7, views: 18, branches: 3 },
    },
  ],
  inReview: [
    // {
    //   id: 'TSK-042',
    //   title: 'HVAC system design approval',
    //   date: 'Oct 25, 2025',
    //   assignee: { name: 'RF', color: 'bg-orange-100 text-orange-600' },
    //   tag: '#rfi-011',
    //   status: 'Under review',
    //   stats: { comments: 6, attachments: 4, views: 19, branches: 2 },
    // },
    // {
    //   id: 'TSK-044',
    //   title: 'Cost breakdown for electrical installation',
    //   date: 'Oct 30, 2025',
    //   assignee: { name: 'SI', color: 'bg-blue-100 text-blue-600' },
    //   tag: '#finance-03',
    //   stats: { comments: 9, attachments: 5, views: 31, branches: 4 },
    // },
    // {
    //   id: 'TSK-046',
    //   title: 'Review parking layout modifications',
    //   date: 'Nov 1, 2025',
    //   assignee: { name: 'VO', color: 'bg-purple-100 text-purple-600' },
    //   tag: '#vo-007',
    //   stats: { comments: 4, attachments: 6, views: 22, branches: 1 },
    // },
  ],
  done: [
    // {
    //   id: 'TSK-042-done',
    //   title: 'HVAC system design approval',
    //   date: 'Oct 25, 2025',
    //   assignee: { name: 'RF', color: 'bg-orange-100 text-orange-600' },
    //   tag: '#rfi-011',
    //   status: 'Under review',
    //   stats: { comments: 6, attachments: 4, views: 19, branches: 2 },
    // },
    // {
    //   id: 'TSK-044-done',
    //   title: 'Cost breakdown for electrical installation',
    //   date: 'Oct 30, 2025',
    //   assignee: { name: 'SI', color: 'bg-blue-100 text-blue-600' },
    //   tag: '#finance-03',
    //   stats: { comments: 9, attachments: 5, views: 31, branches: 4 },
    // },
    // {
    //   id: 'TSK-046-done',
    //   title: 'Review parking layout modifications',
    //   date: 'Nov 1, 2025',
    //   assignee: { name: 'VO', color: 'bg-purple-100 text-purple-600' },
    //   tag: '#vo-007',
    //   stats: { comments: 4, attachments: 6, views: 22, branches: 1 },
    // },
  ],
};

function TaskCard({ task, isDragging }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const navigate = useNavigate();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3">
      <Card
        onClick={() => navigate(`/tasks/${task.id}`)}
        className="p-[17px] bg-[#F3F2F0] rounded-[13px] shadow-none border-none hover:shadow-md transition-shadow cursor-move"
      >
        <div className="space-y-4">
          <h3 className="text-sm text-[#1A1A1A] leading-tight">
            {task.id} · {task.title}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#717784]">{task.date}</span>
            <span className="text-[#E6E8EB]">•</span>
            <Avatar className="h-6 w-6">
              <AvatarFallback className={`text-xs ${task.assignee.color}`}>A</AvatarFallback>
            </Avatar>
            <span className="text-[#E6E8EB]">•</span>
            <Badge variant="secondary" className="text-[11px] bg-orange-50 border border-[#FED7AA] text-orange-600 hover:bg-orange-50">
              {task.assignee.name}
            </Badge>
          </div>

          <div>
            <span className="text-xs border-b border-dotted border-[#717784] text-[#717784]">{task.tag}</span>
          </div>

          {task.status && (
            <div>
              <span className={`text-xs block ${task.status === 'Overdue' ? 'text-[#DC2626]' : 'text-[#717784] '}`}>{task.status}</span>
            </div>
          )}

          <div>
            {task.warning && (
              <div className="bg-orange-50 border border-[#FED7AA] rounded-[28px] py-[5px] px-[9px] flex items-center gap-2">
                <Spark />
                <span className="text-[11px] text-[#D97706]">{task.warning}</span>
              </div>
            )}

            <div className="flex pt-[15px] border-t border-[#E6E8EB] mt-3 items-center gap-4 text-[#9CA3AF] text-xs">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{task.stats.comments}</span>
              </div>
              <div className="flex items-center gap-1">
                <Paperclip className="h-3.5 w-3.5" />
                <span>{task.stats.attachments}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                <span>{task.stats.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <Link2 className="h-3.5 w-3.5" />
                <span>{task.stats.branches}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Column({ id, title, count, tasks }) {
  const { setNodeRef } = useSortable({ id });

  return (
    <div className="flex-1 min-w-[320px]">
      <div className=" border border-dashed  border-[#0000001C] rounded-[21px] p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-sm text-[#1A1A1A]">{title}</h2>
            <Badge variant="secondary" className="bg-[#F2F3F5] text-[#717784] text-xs">
              {count}
            </Badge>
          </div>
          <button className="text-[#717784] hover:text-gray-600">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className="space-y-3">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

export default function Task() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = id => {
    if (id in tasks) return id;
    return Object.keys(tasks).find(key => tasks[key].some(task => task.id === id));
  };

  const handleDragStart = event => {
    setActiveId(event.active.id);
  };

  const handleDragOver = event => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setTasks(prev => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.findIndex(t => t.id === active.id);
      const overIndex = overItems.findIndex(t => t.id === over.id);

      let newIndex;
      if (over.id in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: prev[activeContainer].filter(t => t.id !== active.id),
        [overContainer]: [...prev[overContainer].slice(0, newIndex), activeItems[activeIndex], ...prev[overContainer].slice(newIndex)],
      };
    });
  };

  const handleDragEnd = event => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }

    const activeIndex = tasks[activeContainer].findIndex(t => t.id === active.id);
    const overIndex = tasks[overContainer].findIndex(t => t.id === over.id);

    if (activeIndex !== overIndex) {
      setTasks(prev => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  };

  return (
    <DashboardLayout>
      <div className="w-full h-screen bg-white overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 min-w-min">
            <Column id="todo" title="To Do" count={tasks.todo.length} tasks={tasks.todo} />
            <Column id="inReview" title="In Review" count={tasks.inReview.length} tasks={tasks.inReview} />
            <Column id="done" title="Done" count={tasks.done.length} tasks={tasks.done} />
          </div>

          <DragOverlay>
            {activeId ? (
              <TaskCard task={[...tasks.todo, ...tasks.inReview, ...tasks.done].find(t => t.id === activeId)} isDragging />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </DashboardLayout>
  );
}
