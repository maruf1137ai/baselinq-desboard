import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/supabse/hook/useProject";
import { toast } from "sonner";

const projectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  number: z.string().min(1, "Project number is required"), // e.g., PRJ-001
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  fx_rate: z.coerce.number().min(0, "Must be a positive number"),
  retention_rate: z.coerce.number().min(0).max(100, "Must be between 0 and 100"),
  vat_rate: z.coerce.number().min(0).max(100, "Must be between 0 and 100"),
  contract_type: z.string().min(1, "Contract type is required"),
  total_budget: z.coerce.number().min(0, "Must be a positive number"),
});

interface OnboardingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingModal({ isOpen, onOpenChange }: OnboardingModalProps) {
  const { mutate: createProject, isPending } = useCreateProject();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      number: "PRJ-001",
      start_date: "",
      end_date: "",
      fx_rate: 1,
      retention_rate: 0,
      vat_rate: 0,
      contract_type: "JBCC",
      total_budget: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    createProject(values, {
      onSuccess: (data) => {
        toast.success("Project created successfully!");
        onOpenChange(false);
        // Optionally save to localStorage if this is the first project
        localStorage.setItem("selectedProjectId", data.id);
      },
      onError: (error) => {
        toast.error(`Failed to create project: ${error.message}`);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Welcome! Let's set up your first project</DialogTitle>
          <DialogDescription>
            You need at least one project to get started. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Number</FormLabel>
                    <FormControl>
                      <Input placeholder="PRJ-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="total_budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Budget</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fx_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FX Rate</FormLabel>
                    <FormControl>
                      <Input type="number"step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contract_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contract type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="JBCC">JBCC</SelectItem>
                        <SelectItem value="NEC">NEC</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="retention_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retention Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vat_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VAT Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
