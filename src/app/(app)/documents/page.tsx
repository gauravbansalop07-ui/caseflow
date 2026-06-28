"use client";

import { useState } from "react";
import {
  FileText,
  Upload,
  Eye,
  Download,
  Trash2,
  MoreHorizontal,
  CheckCircle2,
  Loader2,
  XCircle,
  File,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animated-container";

interface MockDocument {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  status: "completed" | "processing" | "failed";
}

const MOCK_DOCUMENTS: MockDocument[] = [
  {
    id: "1",
    name: "Kesavananda_Bharati_v_State_of_Kerala.pdf",
    uploadDate: "2026-06-18",
    size: "4.2 MB",
    status: "completed",
  },
  {
    id: "2",
    name: "Maneka_Gandhi_v_Union_of_India.pdf",
    uploadDate: "2026-06-17",
    size: "2.8 MB",
    status: "completed",
  },
  {
    id: "3",
    name: "Vishaka_v_State_of_Rajasthan.pdf",
    uploadDate: "2026-06-17",
    size: "1.5 MB",
    status: "completed",
  },
  {
    id: "4",
    name: "Navtej_Singh_Johar_v_Union_of_India.pdf",
    uploadDate: "2026-06-16",
    size: "6.1 MB",
    status: "processing",
  },
  {
    id: "5",
    name: "KS_Puttaswamy_v_Union_of_India.pdf",
    uploadDate: "2026-06-15",
    size: "8.3 MB",
    status: "completed",
  },
  {
    id: "6",
    name: "ADM_Jabalpur_v_Shivkant_Shukla.pdf",
    uploadDate: "2026-06-14",
    size: "3.7 MB",
    status: "completed",
  },
  {
    id: "7",
    name: "MC_Mehta_v_Union_of_India.pdf",
    uploadDate: "2026-06-13",
    size: "2.1 MB",
    status: "failed",
  },
  {
    id: "8",
    name: "Indira_Gandhi_v_Raj_Narain.pdf",
    uploadDate: "2026-06-12",
    size: "5.4 MB",
    status: "completed",
  },
];

const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-emerald/10 text-emerald border-0",
  },
  processing: {
    label: "Processing",
    icon: Loader2,
    className: "bg-gold/10 text-gold border-0",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-0",
  },
} as const;

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    toast.success("Document deleted");
  };

  const handleDownload = (name: string) => {
    toast.success(`Downloading ${name}`);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">
      <FadeIn>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-bold text-text-primary">
              Documents
            </h1>
            <Badge variant="secondary" className="bg-white/5 text-text-secondary border-0">
              {documents.length}
            </Badge>
          </div>
          <Button
            className="gap-2 bg-gold text-navy-deep hover:bg-gold-light font-semibold"
            onClick={() => toast.info("Upload dialog would open here")}
          >
            <Upload size={16} />
            Upload
          </Button>
        </div>
      </FadeIn>

      {/* Documents table */}
      <FadeIn delay={0.1}>
        <div className="glass rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_120px_80px_100px_48px] gap-4 px-6 py-3 border-b border-glass-border text-xs font-medium text-text-muted uppercase tracking-wider">
            <span>Name</span>
            <span>Date</span>
            <span>Size</span>
            <span>Status</span>
            <span></span>
          </div>

          {/* Table rows */}
          <StaggerContainer>
            {documents.map((doc) => {
              const status = STATUS_CONFIG[doc.status];
              const StatusIcon = status.icon;
              return (
                <StaggerItem key={doc.id}>
                  <div className="grid grid-cols-[1fr_120px_80px_100px_48px] gap-4 px-6 py-4 items-center border-b border-glass-border/50 hover:bg-white/[0.02] transition-colors group">
                    {/* Name */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center">
                        <File size={16} className="text-gold" />
                      </div>
                      <span className="text-sm text-text-primary truncate">
                        {doc.name}
                      </span>
                    </div>

                    {/* Date */}
                    <span className="text-sm text-text-secondary">
                      {new Date(doc.uploadDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>

                    {/* Size */}
                    <span className="text-sm text-text-secondary">{doc.size}</span>

                    {/* Status */}
                    <Badge variant="secondary" className={cn("text-[10px]", status.className)}>
                      <StatusIcon
                        size={12}
                        className={cn(
                          doc.status === "processing" && "animate-spin"
                        )}
                      />
                      {status.label}
                    </Badge>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal size={16} className="text-text-secondary" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" sideOffset={4}>
                        <DropdownMenuItem
                          onSelect={() => toast.info("Opening document viewer...")}
                        >
                          <Eye size={14} />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => handleDownload(doc.name)}
                        >
                          <Download size={14} />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => handleDelete(doc.id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Empty state */}
          {documents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-text-secondary">
              <FileText size={48} className="text-text-muted mb-4" />
              <p className="text-lg font-medium">No documents yet</p>
              <p className="text-sm text-text-muted mt-1">
                Upload a judgment PDF to get started
              </p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
