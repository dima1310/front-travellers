"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import styles from "./AddStoryForm.module.css";

import { createStory } from "@/services/api/storiesApi";
import type { CreatedStoryResponse } from "@/types/story.types"

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

interface StoryFormValues {
  title: string;
  category: string;
  content: string;
  image: File | null;
}

const StorySchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Заголовок повинен містити мінімум 10 символів")
    .max(100, "Заголовок не може перевищувати 100 символів")
    .required("Обов'язкове поле"),

  category: Yup.string().required("Оберіть категорію"),

  content: Yup.string()
    .min(100, "Текст історії повинен містити мінімум 100 символів")
    .required("Обов'язкове поле"),

  image: Yup.mixed<File>()
    .required("Завантажте обкладинку")
    .nullable(),
});

export default function AddStoryForm() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>("");

  /** Зміна фото */
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown) => void
  ) => {
    const file = e.target.files?.[0];
    setFieldValue("image", file || null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  /** Відправлення форми */
  const handleSubmit = async (
    values: StoryFormValues,
    { setSubmitting }: FormikHelpers<StoryFormValues>
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("text", values.content);
      formData.append("description", values.content.slice(0, 60));
      if (values.image) formData.append("cover", values.image);

      const newStory: CreatedStoryResponse = await createStory(formData);

      toast.success("Історію успішно створено!");
      router.push(`/stories/${newStory.data._id}`);

    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Помилка створення історії");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <Formik<StoryFormValues>
        initialValues={{
          title: "",
          category: "",
          content: "",
          image: null,
        }}
        validationSchema={StorySchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, errors, touched, values }) => (
          <Form className={styles.form}>
            {/* ---- ЗОБРАЖЕННЯ ---- */}
            <div className={styles.imageSection}>
              <div className={styles.imagePreview}>
                {imagePreview ? (
                  <img src={imagePreview} alt="cover preview" />
                ) : (
                  <div className={styles.placeholder}></div>
                )}
              </div>

              <label htmlFor="image" className={styles.uploadBtn}>
                {imagePreview ? "Змінити зображення" : "Завантажити фото"}
              </label>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />

              <ErrorMessage name="image" component="div" className={styles.error} />
            </div>

            {/* ---- ЗАГОЛОВОК ---- */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Заголовок</label>
              <Field
                name="title"
                type="text"
                placeholder="Введіть заголовок історії"
                className={`${styles.input} ${errors.title && touched.title ? styles.inputError : ""
                  }`}
              />
              <ErrorMessage name="title" component="div" className={styles.error} />
            </div>

            {/* ---- КАТЕГОРІЯ ---- */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Категорія</label>
              <Field
                as="select"
                name="category"
                className={`${styles.select} ${errors.category && touched.category ? styles.inputError : ""
                  }`}
              >
                <option value="">Оберіть категорію</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className={styles.error} />
            </div>

            {/* ---- ТЕКСТ ---- */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Текст історії</label>
              <Field
                as="textarea"
                name="content"
                placeholder="Ваша історія..."
                rows={10}
                className={`${styles.textarea} ${errors.content && touched.content ? styles.inputError : ""
                  }`}
              />
              <ErrorMessage name="content" component="div" className={styles.error} />
            </div>

            {/* ---- КНОПКИ ---- */}
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
                disabled={
                  isSubmitting ||
                  !values.title ||
                  !values.category ||
                  !values.content ||
                  !values.image
                }
                className={styles.submitBtn}
              >
                {isSubmitting ? "Збереження..." : "Зберегти"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
