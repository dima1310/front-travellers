"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import styles from "./AddStoryForm.module.css";

const categories = [
  "Європа",
  "Азія",
  "Америка",
  "Африка",
  "Океанія",
  "Пригоди",
  "Культура",
  "Гастрономія",
  "Природа",
];

const StorySchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Заголовок повинен містити мінімум 10 символів")
    .max(100, "Заголовок не може перевищувати 100 символів")
    .required("Обов'язкове поле"),
  category: Yup.string().required("Оберіть категорію"),
  content: Yup.string()
    .min(100, "Текст історії повинен містити мінімум 100 символів")
    .required("Обов'язкове поле"),
  image: Yup.mixed().required("Завантажте обкладинку"),
});

interface AddStoryFormProps {
  initialData?: {
    title: string;
    category: string;
    content: string;
    image: string;
  };
  isEdit?: boolean;
  storyId?: string;
}

export default function AddStoryForm({
  initialData,
  isEdit = false,
  storyId,
}: AddStoryFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>(
    initialData?.image || ""
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append('title', values.title);
      // formData.append('category', values.category);
      // formData.append('content', values.content);
      // formData.append('image', values.image);

      // if (isEdit) {
      //   await axios.put(`/api/stories/${storyId}`, formData);
      // } else {
      //   await axios.post('/api/stories', formData);
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        isEdit ? "Історію успішно оновлено!" : "Історію успішно створено!"
      );

      // Redirect to the story page
      const newStoryId = storyId || "new-story-id";
      router.push(`/stories/${newStoryId}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Помилка при збереженні історії"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <Formik
        initialValues={{
          title: initialData?.title || "",
          category: initialData?.category || "",
          content: initialData?.content || "",
          image: initialData?.image || null,
        }}
        validationSchema={StorySchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, setFieldValue, values }) => (
          <Form className={styles.form}>
            {/* Image Upload */}
            <div className={styles.imageSection}>
              <div className={styles.imagePreview}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Обкладинка"
                    className={styles.previewImage}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 8L12 3L7 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 3V15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>Завантажте обкладинку</p>
                  </div>
                )}
              </div>
              <label htmlFor="image" className={styles.uploadBtn}>
                {imagePreview ? "Змінити зображення" : "Завантажити зображення"}
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className={styles.fileInput}
              />
              {errors.image && touched.image && (
                <div className={styles.error}>{errors.image as string}</div>
              )}
            </div>

            {/* Title */}
            <div className={styles.fieldGroup}>
              <label htmlFor="title" className={styles.label}>
                Заголовок історії
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className={`${styles.input} ${
                  errors.title && touched.title ? styles.inputError : ""
                }`}
                placeholder="Введіть назву вашої історії"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Category */}
            <div className={styles.fieldGroup}>
              <label htmlFor="category" className={styles.label}>
                Категорія
              </label>
              <Field
                as="select"
                name="category"
                id="category"
                className={`${styles.select} ${
                  errors.category && touched.category ? styles.inputError : ""
                }`}
              >
                <option value="">Оберіть категорію</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Content */}
            <div className={styles.fieldGroup}>
              <label htmlFor="content" className={styles.label}>
                Текст історії
              </label>
              <Field
                as="textarea"
                name="content"
                id="content"
                rows={12}
                className={`${styles.textarea} ${
                  errors.content && touched.content ? styles.inputError : ""
                }`}
                placeholder="Розкажіть свою історію подорожі..."
              />
              <ErrorMessage
                name="content"
                component="div"
                className={styles.error}
              />
            </div>

            {/* Buttons */}
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => router.back()}
              >
                Відмінити
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={
                  isSubmitting ||
                  !values.title ||
                  !values.category ||
                  !values.content ||
                  !values.image
                }
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className={styles.spinner}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        opacity="0.25"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                    Збереження...
                  </>
                ) : (
                  "Зберегти"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
