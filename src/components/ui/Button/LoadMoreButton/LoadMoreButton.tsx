import css from "./LoadMoreButton.module.css";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export default function LoadMoreButton({ children, onClick, disabled, className }: Props) {
  return (
    <button
      type="button"
      className={`${css.loadMore}${className ? " " + className : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
