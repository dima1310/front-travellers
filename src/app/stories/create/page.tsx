import React from 'react';
import AddStoryForm from '../../../components/forms/AddStoryForm/AddStoryForm';
import styles from './page.module.css';

export default function AddStoryPage() {
    return (
        <main className={styles.container}>
            <div className={styles.headerWrapper}>
                <h1 className={styles.title}>Створити нову історію</h1>
            </div>
            <AddStoryForm />
        </main>
    );
}