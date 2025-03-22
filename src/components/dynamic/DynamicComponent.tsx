import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Image,
  Text,
  BarChart,
  FileText,
  FormInput,
  Table,
  ExternalLink,
} from "lucide-react";

export type ContentType =
  | "text"
  | "image"
  | "chart"
  | "form"
  | "table"
  | "custom";

export interface DynamicComponentProps {
  type?: ContentType;
  title?: string;
  description?: string;
  content?: string | React.ReactNode;
  imageUrl?: string;
  data?: any;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  customComponent?: React.ReactNode;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  type = "text",
  title = "Component Title",
  description = "This is a dynamic component that can be configured",
  content = "This is the default content for this component. You can customize it through the config panel.",
  imageUrl,
  data = [],
  className,
  onEdit = () => console.log("Edit clicked"),
  onDelete = () => console.log("Delete clicked"),
  customComponent,
}) => {
  const renderIcon = () => {
    switch (type) {
      case "text":
        return <Text className="h-5 w-5 text-muted-foreground" />;
      case "image":
        return <Image className="h-5 w-5 text-muted-foreground" />;
      case "chart":
        return <BarChart className="h-5 w-5 text-muted-foreground" />;
      case "form":
        return <FormInput className="h-5 w-5 text-muted-foreground" />;
      case "table":
        return <Table className="h-5 w-5 text-muted-foreground" />;
      case "custom":
        return <FileText className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Text className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const renderContent = () => {
    switch (type) {
      case "text":
        return <div className="text-sm">{content}</div>;
      case "image":
        return (
          <div className="overflow-hidden rounded-md">
            <img
              src={
                imageUrl ||
                "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80"
              }
              alt={title}
              className="w-full h-auto object-cover transition-all hover:scale-105"
            />
          </div>
        );
      case "chart":
        return (
          <div className="h-48 flex items-center justify-center bg-muted/20 rounded-md">
            <div className="flex flex-col items-center gap-2">
              <BarChart className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Chart visualization would appear here
              </p>
            </div>
          </div>
        );
      case "form":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter email"
              />
            </div>
            <Button className="w-full">Submit</Button>
          </div>
        );
      case "table":
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Item 1</td>
                  <td className="p-2">Active</td>
                  <td className="p-2">2023-09-01</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Item 2</td>
                  <td className="p-2">Pending</td>
                  <td className="p-2">2023-09-02</td>
                </tr>
                <tr>
                  <td className="p-2">Item 3</td>
                  <td className="p-2">Completed</td>
                  <td className="p-2">2023-09-03</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "custom":
        return (
          customComponent || (
            <div className="flex items-center justify-center h-32 bg-muted/20 rounded-md">
              <div className="flex flex-col items-center gap-2">
                <ExternalLink className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Custom component would render here
                </p>
              </div>
            </div>
          )
        );
      default:
        return <div>{content}</div>;
    }
  };

  return (
    <Card className={cn("w-full bg-white", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          {renderIcon()}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <div>Component Type: {type}</div>
        <div>ID: {Math.random().toString(36).substring(2, 10)}</div>
      </CardFooter>
    </Card>
  );
};

export default DynamicComponent;
