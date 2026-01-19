"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RFIForm from "./forms/RFIForm";
import SIForm from "./forms/SIForm";
import VOForm from "./forms/VOForm";
import DCForm from "./forms/DCForm";
import GIForm from "./forms/GIForm";

export default function CreateRequestDialog({
  open,
  setOpen,
  selectedType,
}: any) {
  const renderForm = () => {
    if (!selectedType) return null;

    if (selectedType.startsWith("RFI")) return <RFIForm setOpen={setOpen} />;
    if (selectedType.startsWith("SI")) return <SIForm setOpen={setOpen} />;
    if (selectedType.startsWith("VO")) return <VOForm setOpen={setOpen} />;
    if (selectedType.startsWith("DC")) return <DCForm setOpen={setOpen} />;
    if (selectedType.startsWith("GI")) return <GIForm setOpen={setOpen} />;

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[700px] bg-white p-0 max-h-[calc(100vh-50px)] overflow-y-auto">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Create New {selectedType}</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-6">{renderForm()}</div>
      </DialogContent>
    </Dialog>
  );
}
