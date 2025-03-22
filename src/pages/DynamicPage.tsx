import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Save, Settings } from "lucide-react";
import DynamicLayout from "@/components/dynamic/DynamicLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type ContentType = "text" | "image" | "form" | "chart" | "custom";

interface ComponentData {
  id: string;
  type: ContentType;
  title: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  visible: boolean;
  settings: Record<string, any>;
}

const DynamicPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("builder");
  const [savedLayouts, setSavedLayouts] = useState<
    {
      id: string;
      name: string;
      components: ComponentData[];
      createdAt: string;
    }[]
  >([
    {
      id: "1",
      name: "Homepage Layout",
      components: [
        {
          id: "1",
          type: "text",
          title: "Welcome to Our Platform",
          description: "Introduction section",
          content:
            "Welcome to our dynamic page builder. You can add, remove, and configure components as needed.",
          visible: true,
          settings: {},
        },
        {
          id: "2",
          type: "image",
          title: "Featured Image",
          description: "Main visual element",
          imageUrl:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
          visible: true,
          settings: {},
        },
      ],
      createdAt: "2023-09-15",
    },
    {
      id: "2",
      name: "Product Page Layout",
      components: [
        {
          id: "1",
          type: "image",
          title: "Product Showcase",
          description: "Product gallery",
          imageUrl:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
          visible: true,
          settings: {},
        },
        {
          id: "2",
          type: "text",
          title: "Product Description",
          description: "Detailed information",
          content:
            "This is a premium product with high-quality materials and excellent craftsmanship.",
          visible: true,
          settings: {},
        },
        {
          id: "3",
          type: "form",
          title: "Purchase Form",
          description: "Order placement",
          visible: true,
          settings: {},
        },
      ],
      createdAt: "2023-09-20",
    },
  ]);

  const [currentLayout, setCurrentLayout] = useState<ComponentData[]>([]);
  const [layoutName, setLayoutName] = useState("New Layout");

  const handleSaveLayout = (components: ComponentData[]) => {
    const newLayout = {
      id: Math.random().toString(36).substring(2, 10),
      name: layoutName,
      components: components,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setSavedLayouts([...savedLayouts, newLayout]);
    alert(`Layout "${layoutName}" saved successfully!`);
  };

  const handleLoadLayout = (layoutId: string) => {
    const layout = savedLayouts.find((l) => l.id === layoutId);
    if (layout) {
      setCurrentLayout(layout.components);
      setLayoutName(layout.name);
      setActiveTab("builder");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Dynamic Page Builder
          </h1>
          <p className="mt-2 text-muted-foreground">
            Create and manage dynamic page layouts with customizable components.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="builder">Page Builder</TabsTrigger>
              <TabsTrigger value="templates">Saved Templates</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
                placeholder="Layout name"
              />
              <Button
                size="sm"
                onClick={() => handleSaveLayout(currentLayout)}
                disabled={currentLayout.length === 0}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Template
              </Button>
            </div>
          </div>

          <TabsContent value="builder" className="mt-0">
            <DynamicLayout
              initialComponents={currentLayout}
              onSave={handleSaveLayout}
              className="min-h-[800px] border rounded-lg shadow-sm"
            />
          </TabsContent>

          <TabsContent value="templates" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedLayouts.map((layout) => (
                <Card key={layout.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>{layout.name}</CardTitle>
                    <CardDescription>
                      Created on {layout.createdAt} • {layout.components.length}{" "}
                      components
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-40 bg-muted/30 p-4 overflow-hidden">
                      <div className="flex flex-col gap-2 scale-[0.6] origin-top-left">
                        {layout.components.slice(0, 2).map((component) => (
                          <div
                            key={component.id}
                            className="p-2 border rounded-md bg-card shadow-sm"
                          >
                            <div className="text-xs font-medium">
                              {component.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {component.type}
                            </div>
                          </div>
                        ))}
                        {layout.components.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{layout.components.length - 2} more components
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4 pt-2 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLoadLayout(layout.id)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Load Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="overflow-hidden border-dashed">
                <CardContent className="p-0">
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Create New Template</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start with a blank canvas and build your custom layout
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentLayout([]);
                        setLayoutName("New Layout");
                        setActiveTab("builder");
                      }}
                    >
                      Start Building
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
              <div className="p-4 bg-muted/30 border-b flex items-center justify-between">
                <h2 className="font-medium">Live Preview: {layoutName}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("builder")}
                >
                  Edit Layout
                </Button>
              </div>
              <div className="p-6">
                {currentLayout.length > 0 ? (
                  <div className="space-y-6">
                    {currentLayout
                      .filter((c) => c.visible)
                      .map((component) => (
                        <div
                          key={component.id}
                          className="border rounded-md p-4"
                        >
                          <h3 className="text-lg font-medium mb-2">
                            {component.title}
                          </h3>
                          {component.description && (
                            <p className="text-muted-foreground mb-4">
                              {component.description}
                            </p>
                          )}
                          {component.type === "text" && (
                            <p>{component.content}</p>
                          )}
                          {component.type === "image" && (
                            <img
                              src={
                                component.imageUrl ||
                                "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                              }
                              alt={component.title}
                              className="w-full h-auto rounded-md"
                            />
                          )}
                          {component.type === "form" && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  className="w-full p-2 border rounded-md"
                                  placeholder="Enter name"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="w-full p-2 border rounded-md"
                                  placeholder="Enter email"
                                />
                              </div>
                              <Button className="w-full">Submit</Button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No components to display. Go to the Page Builder to add
                      components.
                    </p>
                    <Button
                      variant="link"
                      onClick={() => setActiveTab("builder")}
                      className="mt-2"
                    >
                      Go to Page Builder
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DynamicPage;
