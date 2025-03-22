import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Save, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DynamicComponent from "./DynamicComponent";
import ConfigPanel from "./ConfigPanel";

// Define ContentType here instead of importing it
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

interface DynamicLayoutProps {
  initialComponents?: ComponentData[];
  onSave?: (components: ComponentData[]) => void;
  className?: string;
}

const SortableComponent = ({
  component,
  onEdit,
}: {
  component: ComponentData;
  onEdit: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!component.visible) return null;

  return (
    <div ref={setNodeRef} style={style} className="relative mb-4">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-10 cursor-move"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <DynamicComponent
        type={component.type}
        title={component.title}
        description={component.description}
        content={component.content}
        imageUrl={component.imageUrl}
        data={component.settings.data}
        onEdit={onEdit}
        onDelete={() => {}}
      />
    </div>
  );
};

const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  initialComponents = [
    {
      id: "1",
      type: "text" as ContentType,
      title: "Welcome",
      description: "Introduction section",
      content:
        "Welcome to our dynamic page builder. You can add, remove, and configure components as needed.",
      visible: true,
      settings: {},
    },
    {
      id: "2",
      type: "image" as ContentType,
      title: "Featured Image",
      description: "Main visual element",
      imageUrl:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      visible: true,
      settings: {},
    },
    {
      id: "3",
      type: "form" as ContentType,
      title: "Contact Form",
      description: "Get in touch with us",
      visible: true,
      settings: {},
    },
  ],
  onSave = () => console.log("Saving layout configuration"),
  className = "",
}) => {
  const [components, setComponents] =
    useState<ComponentData[]>(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("edit");
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);

        setHasChanges(true);
        return newItems;
      });
    }
  };

  const handleAddComponent = (type: string) => {
    const newComponent: ComponentData = {
      id: Math.random().toString(36).substring(2, 10),
      type: type as ContentType,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: `Description for ${type}`,
      visible: true,
      settings: {},
    };

    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent.id);
    setActiveTab("preview");
    setHasChanges(true);
  };

  const handleRemoveComponent = (id: string) => {
    setComponents(components.filter((component) => component.id !== id));
    setSelectedComponent(null);
    setHasChanges(true);
  };

  const handleUpdateComponent = (
    id: string,
    updates: Partial<ComponentData>,
  ) => {
    setComponents(
      components.map((component) => {
        if (component.id === id) {
          return { ...component, ...updates };
        }
        return component;
      }),
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(components);
    setHasChanges(false);
  };

  const handleReset = () => {
    setComponents(initialComponents);
    setSelectedComponent(null);
    setHasChanges(false);
  };

  return (
    <div className={`flex h-full w-full bg-background ${className}`}>
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Page Builder</h1>
            <div className="flex gap-2">
              {hasChanges && (
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <Undo className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              )}
              <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="edit">Edit Layout</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="mt-4">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">Layout Components</h2>
                  <Button size="sm" onClick={() => setActiveTab("preview")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Component
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="relative pl-10">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                  >
                    <SortableContext
                      items={components
                        .filter((c) => c.visible)
                        .map((c) => c.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {components
                        .filter((component) => component.visible)
                        .map((component) => (
                          <SortableComponent
                            key={component.id}
                            component={component}
                            onEdit={() => {
                              setSelectedComponent(component.id);
                              setActiveTab("preview");
                            }}
                          />
                        ))}
                    </SortableContext>
                  </DndContext>

                  {components.filter((c) => c.visible).length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-muted-foreground/50 p-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          No visible components
                        </p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setActiveTab("preview")}
                        >
                          Add your first component
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="flex h-[calc(100vh-220px)]">
                <div className="flex-1 overflow-auto rounded-l-lg border bg-card p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-medium">Preview</h2>
                  <Separator className="mb-6" />

                  <div className="space-y-6">
                    {components
                      .filter((component) => component.visible)
                      .map((component) => (
                        <DynamicComponent
                          key={component.id}
                          type={component.type}
                          title={component.title}
                          description={component.description}
                          content={component.content}
                          imageUrl={component.imageUrl}
                          data={component.settings.data}
                          className={
                            selectedComponent === component.id
                              ? "ring-2 ring-primary"
                              : ""
                          }
                          onEdit={() => setSelectedComponent(component.id)}
                          onDelete={() => handleRemoveComponent(component.id)}
                        />
                      ))}

                    {components.filter((c) => c.visible).length === 0 && (
                      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-muted-foreground/50 p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          No components to display
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <ConfigPanel
                  components={components.map((c) => ({
                    id: c.id,
                    type: c.type,
                    title: c.title,
                    visible: c.visible,
                    settings: c.settings,
                  }))}
                  onAddComponent={handleAddComponent}
                  onRemoveComponent={handleRemoveComponent}
                  onUpdateComponent={(id, updates) => {
                    handleUpdateComponent(
                      id,
                      updates as Partial<ComponentData>,
                    );
                  }}
                  onReorderComponents={(startIndex, endIndex) => {
                    const result = [...components];
                    const [removed] = result.splice(startIndex, 1);
                    result.splice(endIndex, 0, removed);
                    setComponents(result);
                    setHasChanges(true);
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DynamicLayout;
