import css from "./LoadMoreButton.module.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  width?: number; // безопасный кастомный параметр ширины
};

export default function LoadMoreButton({
  children,
  onClick,
  disabled,
  className,
  width,
}: Props) {
  return (
    <button
      type="button"
      className={`${css.loadMore}${className ? " " + className : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={width ? { width: `${width}px` } : undefined} // если width есть — применим
    >
      {children}
    </button>
  );
}
