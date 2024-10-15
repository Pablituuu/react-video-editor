import supabase from "@/utils/supabase";
import { createUploadsDetails } from "@/utils/upload";
import { create } from "zustand";
import axios from "axios";
import { IUpload } from "@/interfaces/editor";

interface IUploadStatus {
  id: string;
  loading: boolean;
  progress: number;
  error?: string;
  file?: File;
}

interface UploadsStore {
  status: IUploadStatus;
  uploads: IUpload[];
  setUploads: (uploads: IUpload[]) => void;
  addUpload: (upload: IUpload) => void;
  removeUpload: (id: string) => void;
  getUploads: () => void;
  createUpload: (file: File) => Promise<void>;
}

const useUploadsStore = create<UploadsStore>((set) => ({
  status: {
    id: "",
    loading: false,
    progress: 0,
    error: undefined,
    file: undefined,
    previewData: undefined
  },
  uploads: [],
  setUploads: (uploads) => set({ uploads }),
  addUpload: async (upload) =>
    set((state) => ({ uploads: [...state.uploads, upload] })),
  removeUpload: (id) =>
    set((state) => ({
      uploads: state.uploads.filter((upload) => upload.id !== id)
    })),

  createUpload: async (file: File) => {
    const uploadDetails = await createUploadsDetails(file.name);
    const updatedFile = new File([file], uploadDetails.name, {
      type: file.type
    });
    const fileType = file.type.split("/")[0];

    let previewUrl = "";
    let previewData = "";
    if (fileType === "video") {
      const thumbnailBase64 = await generateThumbnail(file);
      const thumbnailBlob = base64ToBlob(thumbnailBase64, "image/jpeg"); // Convert base64 to blob
      previewData = thumbnailBase64;

      set(({ uploads }) => {
        return {
          uploads: [
            {
              previewUrl: previewData,
              previewData,
              id: "temp"
            } as IUpload,
            ...uploads
          ],
          status: {
            id: uploadDetails.id,
            loading: true,
            progress: 0,
            error: undefined,
            file: file
          }
        };
      });

      const thumbnailUploadDetails = await createUploadsDetails(
        uploadDetails.id + ".png"
      );

      // Upload thumbnail using axios with progress tracking
      await axios.put(thumbnailUploadDetails.uploadUrl, thumbnailBlob, {
        headers: {
          "Content-Type": thumbnailBlob.type
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Thumbnail upload progress: ${percentCompleted}%`);
          } else {
            console.log(
              `Thumbnail upload progress: ${progressEvent.loaded} bytes loaded`
            );
          }
        }
      });

      previewUrl = thumbnailUploadDetails.url;
    }

    if (!previewUrl) {
      previewData = URL.createObjectURL(updatedFile);
      set(({ uploads }) => {
        return {
          uploads: [
            {
              previewUrl: previewData,
              previewData,
              id: "temp"
            } as IUpload,
            ...uploads
          ],
          status: {
            id: uploadDetails.id,
            loading: true,
            progress: 0,
            error: undefined,
            file: file
          }
        };
      });
    }

    // Upload file using axios with progress tracking
    await axios.put(uploadDetails.uploadUrl, updatedFile, {
      headers: {
        "Content-Type": updatedFile.type
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          set({
            status: {
              id: uploadDetails.id,
              loading: true,
              progress: percentCompleted,
              error: undefined,
              file: file
            }
          });
        } else {
          console.log(
            `File upload progress: ${progressEvent.loaded} bytes loaded`
          );
        }
      }
    });

    const user = await supabase.auth.getUser();

    const uploadInfo: Partial<IUpload> = {
      name: uploadDetails.name,
      originalName: file.name,
      url: uploadDetails.url,
      previewUrl: previewUrl ?? uploadDetails.url,
      fileId: uploadDetails.id,
      userId: user.data.user?.id
    };

    const { error, data } = await supabase
      .from("uploads")
      .insert({
        ...uploadInfo
      })
      .select();

    if (!error) {
      set(({ uploads }) => {
        const updatedUploads = uploads.map((upload) => {
          if (upload.id === "temp") {
            return { ...uploadInfo, id: data[0].id };
          }
          return upload;
        }) as IUpload[];
        return {
          uploads: updatedUploads,
          status: {
            id: "",
            loading: false,
            progress: 0,
            error: undefined,
            file: undefined
          }
        };
      });
    }
  },
  getUploads: async () => {
    // Get the authenticated user's ID
    const userId = await (await supabase.auth.getUser()).data.user?.id;

    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }
    // Query the uploads table for files associated with the userId
    const { data: userUploads, error } = await supabase
      .from("uploads")
      .select("*")
      .eq("userId", userId);
    if (error) {
      console.log(error);
    }
    if (!error) {
      set({ uploads: userUploads });
    }
  }
}));

export default useUploadsStore;

// Convert base64 string to Blob
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteString = atob(base64.split(",")[1]); // Decode base64 string
  const arrayBuffer = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeType });
};

// Function to generate a thumbnail at the 2-second mark with max height of 300px
const generateThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      reject("Canvas context not available");
      return;
    }

    const url = URL.createObjectURL(file);
    video.src = url;
    video.currentTime = 2; // Set the time to 2 seconds

    video.onloadeddata = () => {
      video.currentTime = 2; // Ensure we are at the 2-second mark
    };

    video.onseeked = () => {
      const aspectRatio = video.videoWidth / video.videoHeight;
      const maxHeight = 300;
      const targetHeight = Math.min(maxHeight, video.videoHeight);
      const targetWidth = targetHeight * aspectRatio;

      // Set canvas size to match target dimensions
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw the video frame on the canvas
      context.drawImage(video, 0, 0, targetWidth, targetHeight);

      // Convert canvas to a base64 image
      const thumbnailBase64 = canvas.toDataURL("image/jpeg");
      URL.revokeObjectURL(url); // Clean up the object URL
      resolve(thumbnailBase64);
    };

    video.onerror = (error: any) => {
      reject(`Video error: ${error.message}`);
    };
  });
};
