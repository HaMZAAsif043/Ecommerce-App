import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Settings,
  Move,
  Eye,
  EyeOff,
  Layout,
  Type,
  Image,
  FileText,
  FormInput,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ComponentConfig {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  settings: Record<string, any>;
}

interface ConfigPanelProps {
  components?: ComponentConfig[];
  onAddComponent?: (type: string) => void;
  onRemoveComponent?: (id: string) => void;
  onUpdateComponent?: (id: string, config: Partial<ComponentConfig>) => void;
  onReorderComponents?: (startIndex: number, endIndex: number) => void;
}

const ConfigPanel = ({
  components = [
    {
      id: "1",
      type: "text",
      title: "Text Block",
      visible: true,
      settings: { content: "Sample text content" },
    },
    {
      id: "2",
      type: "image",
      title: "Image Block",
      visible: true,
      settings: {
        src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
        alt: "Sample image",
      },
    },
    {
      id: "3",
      type: "form",
      title: "Contact Form",
      visible: false,
      settings: { fields: ["name", "email", "message"] },
    },
  ],
  onAddComponent = () => {},
  onRemoveComponent = () => {},
  onUpdateComponent = () => {},
  onReorderComponents = () => {},
}: ConfigPanelProps) => {
  const [activeTab, setActiveTab] = useState("components");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null,
  );

  const getComponentIcon = (type: string) => {
    switch (type) {
      case "text":
        return <Type className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "form":
        return <FormInput className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <Layout className="h-4 w-4" />;
    }
  };

  const handleComponentSelect = (id: string) => {
    setSelectedComponent(id === selectedComponent ? null : id);
    setActiveTab("settings");
  };

  const handleToggleVisibility = (id: string, currentVisibility: boolean) => {
    onUpdateComponent(id, { visible: !currentVisibility });
  };

  const handleTitleChange = (id: string, newTitle: string) => {
    onUpdateComponent(id, { title: newTitle });
  };

  const selectedComponentData = selectedComponent
    ? components.find((comp) => comp.id === selectedComponent)
    : null;

  return (
    <div className="h-full w-full max-w-[300px] border-l border-border bg-background p-4 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Configuration</h2>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 overflow-hidden flex flex-col"
      >
        <TabsList className="w-full">
          <TabsTrigger value="components" className="flex-1">
            Components
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex-1"
            disabled={!selectedComponent}
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Available Components</h3>
              <Select onValueChange={onAddComponent}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Add component" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Block</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="form">Form</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              {components.map((component, index) => (
                <Card
                  key={component.id}
                  className={`cursor-pointer transition-all ${selectedComponent === component.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handleComponentSelect(component.id)}
                >
                  <CardHeader className="p-3 flex flex-row items-center space-y-0 gap-2">
                    <div className="flex items-center space-x-2 flex-1">
                      {getComponentIcon(component.type)}
                      <CardTitle className="text-sm">
                        {component.title}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleVisibility(component.id, component.visible);
                      }}
                    >
                      {component.visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 overflow-y-auto">
          {selectedComponentData && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Component Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={selectedComponentData.title}
                      onChange={(e) =>
                        handleTitleChange(
                          selectedComponentData.id,
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <div className="flex items-center space-x-2 px-3 py-2 border rounded-md bg-muted/50">
                      {getComponentIcon(selectedComponentData.type)}
                      <span className="text-sm capitalize">
                        {selectedComponentData.type}
                      </span>
                    </div>
                  </div>

                  {selectedComponentData.type === "text" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content</label>
                      <textarea
                        className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        value={selectedComponentData.settings.content || ""}
                        onChange={(e) =>
                          onUpdateComponent(selectedComponentData.id, {
                            settings: {
                              ...selectedComponentData.settings,
                              content: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  )}

                  {selectedComponentData.type === "image" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Image URL</label>
                        <Input
                          value={selectedComponentData.settings.src || ""}
                          onChange={(e) =>
                            onUpdateComponent(selectedComponentData.id, {
                              settings: {
                                ...selectedComponentData.settings,
                                src: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Alt Text</label>
                        <Input
                          value={selectedComponentData.settings.alt || ""}
                          onChange={(e) =>
                            onUpdateComponent(selectedComponentData.id, {
                              settings: {
                                ...selectedComponentData.settings,
                                alt: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="justify-between border-t p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedComponent(null);
                      setActiveTab("components");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      onRemoveComponent(selectedComponentData.id);
                      setSelectedComponent(null);
                      setActiveTab("components");
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigPanel;
