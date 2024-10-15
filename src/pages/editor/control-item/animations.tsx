import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Animations = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-md flex-none text-text-primary font-medium h-12  flex items-center px-4">
        Animations
      </div>
      <div className="px-4">
        <Tabs defaultValue="in" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="in">In</TabsTrigger>
            <TabsTrigger value="out">Out</TabsTrigger>
          </TabsList>
          <TabsContent value="in"></TabsContent>
          <TabsContent value="out"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Animations;
