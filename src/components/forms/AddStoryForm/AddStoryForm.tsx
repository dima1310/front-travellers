'use client';

import { useState } from 'react';
import styles from './AddStoryForm.module.css';
import { createStory } from '../../../services/api/storiesApi';
import { AxiosError } from 'axios';

interface FormData {
    title: string;
    category: string;
    description: string;
    text: string;
    cover: File | null;
}

export default function AddStoryForm() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        category: '',
        description: '',
        text: '',
        cover: null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, cover: file }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.category || !formData.text) {
            alert('Будь ласка, заповніть усі обов’язкові поля.');
            return;
        }

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('description', formData.description);
            data.append('text', formData.text);
            if (formData.cover) data.append('cover', formData.cover);

            const result = await createStory(data);
            console.log('✅ Історію створено:', result);
            alert('Історію успішно створено!');
        } catch (error: unknown) {
            const err = error as AxiosError;
            console.error('❌ Помилка:', err.response?.data || err.message);
            alert('Не вдалося створити історію. Перевір дані або авторизацію.');
        }
    };

    const handleCancel = () => {
        setFormData({ title: '', category: '', description: '', text: '', cover: null });
    };

    const descLeft = 61 - formData.description.length;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Обкладинка статті</label>

            <div className={styles.coverPreview}>
                {formData.cover ? (
                    <img src={URL.createObjectURL(formData.cover)} alt="cover preview" />
                ) : (
                    <div className={styles.placeholder} />
                )}
            </div>

            <input
                id="cover"
                type="file"
                onChange={handleFileChange}
                className={styles.fileInput}
                accept="image/*"
            />
            <label htmlFor="cover" className={styles.uploadBtn}>
                Завантажити фото
            </label>

            <label className={styles.label}>Заголовок</label>
            <input
                type="text"
                name="title"
                placeholder="Введіть заголовок історії"
                value={formData.title}
                onChange={handleChange}
                className={styles.input}
            />

            <label className={styles.label}>Категорія</label>
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
            >
                <option value="">Категорія</option>
                <option value="Європа">Європа</option>
                <option value="Азія">Азія</option>
                <option value="Америка">Америка</option>
            </select>

            <label className={styles.label}>Короткий опис</label>
            <textarea
                name="description"
                maxLength={61}
                placeholder="Введіть короткий опис історії"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
            />
            <div className={styles.hint}>Лімітовано символів: {descLeft}</div>

            <label className={styles.label}>Текст історії</label>
            <textarea
                name="text"
                placeholder="Ваша історія тут"
                value={formData.text}
                onChange={handleChange}
                className={styles.textarea}
            />

            <div className={styles.buttons}>
                <button
                    type="submit"
                    disabled={!formData.title || !formData.category || !formData.text}
                    className={styles.saveBtn}
                >
                    Зберегти
                </button>
                <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                    Відмінити
                </button>
            </div>
        </form>
    );
}