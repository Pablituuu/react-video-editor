import { Button } from "@/components/ui/button";
import { ADD_AUDIO, ADD_IMAGE, ADD_VIDEO, dispatch } from "@designcombo/events";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadIcon } from "lucide-react";
import { generateId } from "@designcombo/timeline";
import { useRef } from "react";
import useUploadsStore from "@/store/use-uploads-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { IUpload } from "@/interfaces/editor";

function getFileType(extension: string): string {
  // Normalize the extension by converting it to lowercase
  const normalizedExtension = extension.toLowerCase().trim();

  // Define an object mapping extensions to their file types
  const fileTypes: { [key: string]: string } = {
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    bmp: "image",
    webp: "image",
    mp3: "audio",
    wav: "audio",
    ogg: "audio",
    mp4: "video",
    avi: "video",
    mov: "video",
    wmv: "video"
  };

  // Return the corresponding file type or "unknown" if not found
  return fileTypes[normalizedExtension] || "unknown";
}

export const Uploads = () => {
  const { status, uploads } = useUploadsStore();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { createUpload } = useUploadsStore();

  const handleAddUpload = (upload: IUpload) => {
    const fileExtension = upload.originalName.split(".").pop() as string;
    const itemType = getFileType(fileExtension);
    if (itemType === "image") {
      dispatch(ADD_IMAGE, {
        payload: {
          id: generateId(),
          details: {
            src: upload.url
          },
          metadata: {
            resourceId: upload.id
          }
        }
      });
    } else if (itemType === "video") {
      dispatch(ADD_VIDEO, {
        payload: {
          id: generateId(),
          details: {
            src: upload.url,
            borderWidth: 0,
            borderColor: "#000000",
            boxShadow: {
              color: "#ffffff",
              x: 0,
              y: 0,
              blur: 0
            }
          },
          metadata: {
            resourceId: upload.id
          }
        }
      });
    } else if (itemType === "audio") {
      dispatch(ADD_AUDIO, {
        payload: {
          id: generateId(),
          details: {
            src: upload.url
          },
          metadata: {
            resourceId: upload.id
          }
        }
      });
    }
  };

  const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    createUpload(file);
  };
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-sm flex-none text-text-primary font-medium h-12  flex items-center px-4">
        Your media
      </div>
      <input
        onChange={onInputFileChange}
        ref={inputFileRef}
        type="file"
        className="hidden"
        accept="image/*,audio/*,video/*"
      />
      <div className="px-4 py-2">
        <div>
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="projects">Project</TabsTrigger>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
            </TabsList>
            <TabsContent value="projects">
              <Button
                onClick={() => {
                  inputFileRef.current?.click();
                }}
                className="flex gap-2 w-full"
                variant="secondary"
              >
                <UploadIcon size={16} /> Upload
              </Button>
              <div></div>
            </TabsContent>
            <TabsContent value="workspace">
              <Button
                onClick={() => {
                  inputFileRef.current?.click();
                }}
                className="flex gap-2 w-full"
                variant="secondary"
              >
                <UploadIcon size={16} /> Upload
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <ScrollArea>
        <div className="px-4 masonry-sm">
          {uploads.map((upload, index) => {
            return (
              <div
                onClick={() => handleAddUpload(upload)}
                key={index}
                className="flex flex-col w-full  bg-background pb-2 overflow-hidden cursor-pointer relative"
              >
                <img
                  src={upload.previewData || upload.previewUrl || upload.url}
                  className="w-full h-full object-cover rounded-md"
                  alt="image"
                />
                <div className="pt-1.5 text-xs text-muted-foreground truncate w-28">
                  {upload.originalName}
                </div>
                {upload.id === "temp" && status.loading ? (
                  <div className="w-full h-full backdrop-filter backdrop-blur-md absolute bg-primary-foreground/10 flex items-center px-0.5">
                    <Progress value={status.progress} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
