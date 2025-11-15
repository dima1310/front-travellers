'use client'

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './ConfirmModal.module.css';

interface ConfirmModalProps {
    title: string;
    text: string;
    confirmButtonText: string;
    cancelButtonText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ title, text, confirmButtonText, cancelButtonText, onConfirm, onCancel }: ConfirmModalProps) {
    // закриття по фону 
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
            onCancel();
        }
    };
    // закриття по escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };

        document.addEventListener("keydown", handleKeyDown);
        // заборона прокручування
        document.body.style.overflow = "hidden";  

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        }
    }, [onCancel]);

    return createPortal(
        <div className={css.confirmBackdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            <div className={css.confirmModal}>
                <button
                    className={css.confirmcloseButton}
                    onClick={onCancel}
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h2 className={css.confirmTitle}>{title}</h2>
                <p className={css.confirmText}>{text}</p>

                <div className={css.buttons}>
                    <button className={css.cancelBtn} onClick={onCancel}>
                        {cancelButtonText}
                    </button>
                    <button className={css.confirmBtn} onClick={onConfirm}>
                        {confirmButtonText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};