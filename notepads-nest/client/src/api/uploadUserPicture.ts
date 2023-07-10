import { api } from "./api";

type UploadUserPicture = {
  success: boolean;
  pictureUrl: string | null;
};

export async function uploadUserPicture(
  picture: File
): Promise<UploadUserPicture> {
  const formData = new FormData();
  formData.append("file", picture);
  const response = await api.post("/users/upload-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
