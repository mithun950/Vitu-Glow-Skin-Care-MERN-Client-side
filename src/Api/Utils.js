import axios from "axios";

export const imageUpload = async (image) => {

  const formData = new FormData();
  formData.append("image", image);

  try {
    const imgResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return imgResponse.data.data.url;
  } catch (error) {
    console.error("Image Upload Failed:", error);
    return null;
  }
};
