"use client";

import React, { useState } from "react";
import { Formik, Form, FormikHelpers, useField } from "formik";
import type { AnyObjectSchema } from "yup";

import styles from "./AuthForm.module.css";

export type FieldConfig = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

type AuthFormProps<TValues extends Record<string, unknown>> = {
  isLogin?: boolean;
  fields: FieldConfig[];
  initialValues: TValues;
  /** Yup-схема валідації */
  validationSchema: AnyObjectSchema;
  submitText: string;
  onSubmitAction: (
    values: TValues,
    actions: FormikHelpers<TValues>
  ) => Promise<void>;
};

type FormikTextInputProps = {
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
};

const FormikTextInput: React.FC<FormikTextInputProps> = ({
  name,
  type = "text",
  placeholder,
  autoComplete,
}) => {
  const [field, meta] = useField<string>(name);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = meta.touched && Boolean(meta.error);

  const isPassword = type === "password";
  const actualType = isPassword && showPassword ? "text" : type;

  return (
    <div className={styles.fieldGroup}>
      {/* обёртка нужна, чтобы кнопка была внутри инпута справа */}
      <div className={isPassword ? styles.passwordWrapper : undefined}>
        <input
          {...field}
          id={name}
          type={actualType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${styles.input} ${hasError ? styles.inputError : ""}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Сховати пароль" : "Показати пароль"}
          >
            {showPassword ? "👁️‍🗨️" : "👁️"}
            {/* сюда можно поставить свою SVG-иконку */}
          </button>
        )}
      </div>

      {hasError && (
        <span id={`${name}-error`} className={styles.error}>
          {meta.error}
        </span>
      )}
    </div>
  );
};

function AuthFormInner<TValues extends Record<string, unknown>>({
  isLogin,
  fields,
  initialValues,
  validationSchema,
  submitText,
  onSubmitAction,
}: AuthFormProps<TValues>) {
  const handleSubmit = async (
    values: TValues,
    actions: FormikHelpers<TValues>
  ) => {
    const cleanValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    ) as TValues;

    await onSubmitAction(cleanValues, actions);
  };

  return (
    <Formik<TValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.fieldsWrapper}>
            {fields.map(
              ({ name, label, type, placeholder, autoComplete, required }) => (
                <div key={name} className={styles.fieldBlock}>
                  <label htmlFor={name} className={styles.label}>
                    {label}
                    {required && "*"}
                  </label>
                  <FormikTextInput
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                  />
                </div>
              )
            )}

            {isLogin && null}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {submitText}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AuthFormInner;
