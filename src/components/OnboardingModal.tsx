import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { uploadFile } from "@/supabse/api";
import { Loader2 } from "lucide-react";
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
  retention_rate: z.coerce.number().min(0).max(10, "Must be between 0 and 10"),
  vat_rate: z.coerce.number().min(0).max(25, "Must be between 0 and 25"),
  contract_type: z.string().min(1, "Contract type is required"),
  total_budget: z.coerce.number().min(0, "Must be a positive number"),
  location: z.string().optional(),
  attachments: z.array(z.string()).optional(),
});

interface OnboardingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OnboardingModal({ isOpen, onOpenChange }: OnboardingModalProps) {
  const { mutate: createProject, isPending } = useCreateProject();
  const [isUploading, setIsUploading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

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
      location: "",
      attachments: [],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadAllFiles = async (projectId: string) => {
    if (!selectedFiles.length) return [];
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of selectedFiles) {
      try {
        const url = await uploadFile(file, projectId);
        uploadedUrls.push(url);
      } catch (err) {
        console.error("Error uploading file:", file.name, err);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setIsUploading(false);
    return uploadedUrls;
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    const data = {
      name: values.name,
      description: values.description,
      number: values.number,
      start_date: values.start_date,
      end_date: values.end_date,
      fx_rate: values.fx_rate,
      retention_rate: values.retention_rate,
      vat_rate: values.vat_rate,
      contract_type: values.contract_type,
      total_budget: values.total_budget,
      location: values.location,
    }

    createProject({
      ...data,
    }, {
      onSuccess: async (data) => {
        if (selectedFiles.length > 0) {
          try {
            await uploadAllFiles(data.id);
            toast.success("Project and attachments created successfully!");
            console.log("Project created successfully!", data);
          } catch (error) {
            console.error("Attachment upload error:", error);
            toast.error("Project created but failed to upload attachments");
          }
        } else {
          toast.success("Project created successfully!");
        }

        onOpenChange(false);
        localStorage.setItem("selectedProjectId", data.id);
        setSelectedFiles([]);
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

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Location (e.g. New York, NY)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        type="file"
                        id="project-upload"
                        className="hidden"
                        onChange={handleFileChange}
                        multiple
                      />
                      <div
                        className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => document.getElementById("project-upload")?.click()}>
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your file here
                        </p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse
                        </p>
                      </div>

                      {/* Selected files */}
                      {selectedFiles.length > 0 && (
                        <div className="mt-2 flex flex-col gap-2">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center border p-2 rounded">
                              <span className="text-sm">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="text-red-500 text-xs hover:underline">
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
                      <Input type="number" step="0.01" {...field} />
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
                      <Input max={10} type="number" step="0.1" {...field} />
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
                      <Input max={25} type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isPending || isUploading}>
                {isPending || isUploading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
