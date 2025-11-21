"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Image from "next/image";

import styles from "./AddStoryForm.module.css";
import {createStory, updateStory} from "@/services/api/storiesApi";
import type {CreatedStoryResponse} from "@/types/story.types";

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

export interface StoryFormValues {
    title: string;
    category: string;
    content: string;
    image: File | null;
}

export interface AddStoryFormProps {
    initialData?: {
        title: string;
        category: string;
        content: string;
        imageUrl?: string;
    };
    isEdit?: boolean;
    storyId?: string;
}

const getStorySchema = (isEdit?: boolean) =>
    Yup.object().shape({
        title: Yup.string()
            .min(10, "Заголовок повинен містити мінімум 10 символів")
            .max(100, "Заголовок не може перевищувати 100 символів")
            .required("Обов'язкове поле"),
        category: Yup.string().required("Оберіть категорію"),
        content: Yup.string()
            .min(100, "Текст історії повинен містити мінімум 100 символів")
            .required("Обов'язкове поле"),
        image: isEdit
            ? Yup.mixed().nullable()
            : Yup.mixed().required("Завантажте обкладинку").nullable(),
    });

export default function AddStoryForm({
                                         initialData,
                                         isEdit,
                                         storyId,
                                     }: AddStoryFormProps) {
    const router = useRouter();

    const [imagePreview, setImagePreview] = useState<string>(
        initialData?.imageUrl ?? ""
    );

    useEffect(() => {
        if (initialData?.imageUrl) {
            setImagePreview(initialData.imageUrl);
        }
    }, [initialData?.imageUrl]);

    const initialValues: StoryFormValues = {
        title: initialData?.title ?? "",
        category: initialData?.category ?? "",
        content: initialData?.content ?? "",
        image: null,
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: unknown) => void
    ) => {
        const file = e.target.files?.[0] ?? null;
        setFieldValue("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (
        values: StoryFormValues,
        {setSubmitting}: FormikHelpers<StoryFormValues>
    ) => {
        try {
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("description", values.content);
            formData.append("category", values.category);

            if (values.image) {
                formData.append("storyImage", values.image);
            }

            const response = (await (isEdit && storyId
                ? updateStory(storyId, formData)
                : createStory(formData))) as CreatedStoryResponse;

            toast.success(
                isEdit ? "Історію успішно оновлено!" : "Історію успішно створено!"
            );

            router.push(`/stories/${response.data._id}`);
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(
                error.response?.data?.message ||
                (isEdit ? "Помилка оновлення історії" : "Помилка створення історії")
            );
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = getStorySchema(isEdit);

    return (
        <div className={styles.formWrapper}>
            <Formik<StoryFormValues>
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={!!initialData}
            >
                {({isSubmitting, setFieldValue, errors, touched, values}) => {
                    const isDisabled =
                        isSubmitting ||
                        !values.title ||
                        !values.category ||
                        !values.content ||
                        (!values.image && !initialData?.imageUrl);

                    const Actions = () => (
                        <div className={styles.actionButtons}>
                            <button
                                type="submit"
                                disabled={isDisabled}
                                className={styles.saveBtn}
                            >
                                {isSubmitting
                                    ? "Збереження..."
                                    : isEdit
                                        ? "Оновити"
                                        : "Зберегти"}
                            </button>

                            <button
                                type="button"
                                className={styles.cancelBtn}
                                onClick={() => router.back()}
                            >
                                Відмінити
                            </button>
                        </div>
                    );

                    return (
                        <Form className={styles.form}>
                            <section className={styles.coverSection}>
                                <div className={styles.coverContainer}>
                                    <p className={styles.coverLabel}>Обкладинка статті</p>

                                    <div className={styles.coverPreview}>
                                        {imagePreview ? (
                                            <Image
                                                src={imagePreview}
                                                alt="cover preview"
                                                fill
                                                className={styles.coverImage}
                                            />
                                        ) : (
                                            <div className={styles.placeholder}/>
                                        )}
                                    </div>

                                    <label htmlFor="image" className={styles.uploadBtn}>
                                        {imagePreview ? "Змінити фото" : "Завантажити фото"}
                                    </label>

                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className={styles.fileInput}
                                        onChange={(e) => handleImageChange(e, setFieldValue)}
                                    />

                                    <ErrorMessage
                                        name="image"
                                        component="div"
                                        className={styles.error}
                                    />
                                </div>

                                <aside className={styles.actionsDesktop}>
                                    <Actions/>
                                </aside>
                            </section>
                            <div className={styles.fieldsContainer}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Заголовок</label>
                                    <Field
                                        name="title"
                                        type="text"
                                        placeholder="Введіть заголовок історії"
                                        className={`${styles.input} ${
                                            errors.title && touched.title ? styles.inputError : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className={styles.error}
                                    />
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Категорія</label>
                                    <Field
                                        as="select"
                                        name="category"
                                        className={`${styles.select} ${
                                            errors.category && touched.category
                                                ? styles.inputError
                                                : ""
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

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Текст історії</label>
                                    <Field
                                        as="textarea"
                                        name="content"
                                        placeholder="Ваша історія тут"
                                        rows={10}
                                        className={`${styles.textarea} ${
                                            errors.content && touched.content ? styles.inputError : ""
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="content"
                                        component="div"
                                        className={styles.error}
                                    />
                                </div>
                            </div>

                            <div className={styles.actionsMobile}>
                                <Actions/>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}
