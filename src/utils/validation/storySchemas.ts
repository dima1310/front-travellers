import * as Yup from "yup";

export const storyCreateSchema = Yup.object({
  title: Yup.string().min(3).max(120).required(),
  content: Yup.string().min(10).required(),
  country: Yup.string().required(),
  images: Yup.array(Yup.string().url()).max(10),
});
