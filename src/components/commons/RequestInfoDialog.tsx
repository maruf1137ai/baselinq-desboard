'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function RequestInfoDialog({ wFull }) {
  const [open, setOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [date, setDate] = useState<Date>();

  console.log(wFull);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn('bg-transparent text-black border border-[#D1D5DC] hover:bg-transparent', wFull && 'w-full')}>
          <span className="mr-2">+</span>
          Request Info
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[420px] bg-white p-0">
        <DialogHeader className="py-[22px] px-6 border-b border-[#E5E7EB]">
          <DialogTitle className="text-lg text-[#1A1F36]">Request Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-6">
          <div className="space-y-5">
            {/* Document Title */}
            <div>
              <Label htmlFor="title" className="text-sm text-[#1A1F36]">
                Recipient(s)
              </Label>
              <Input id="title" placeholder="David Contractor, Sarah Johnson" className="mt-2" />
            </div>
            {/* Document Title */}
            <div className="flex flex-col">
              {/* 👇 Added your label here */}
              <Label htmlFor="date" className="text-sm text-[#1A1F36] mb-2">
                Recipient(s)
              </Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Document Title */}
            <div>
              <Label htmlFor="message" className="text-sm text-[#1A1F36]">
                Request details
              </Label>
              <Textarea
                id="message"
                placeholder="Please provide updated foundation drawings with soil test results..."
                className="min-h-[120px] w-full mt-2"
              />
            </div>

            {/* Document Title */}
            <div>
              <Label htmlFor="note" className="text-sm text-[#1A1F36]">
                Optional note
              </Label>
              <Input id="note" placeholder="Add any additional context..." className="mt-2" />
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end border-t py-4 mt-4 px-6">
          <div className="flex gap-2 items-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Send Request</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
