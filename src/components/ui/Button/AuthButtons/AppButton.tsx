// import clsx from "clsx";
// import s from "./AppButton.module.css";
// import { Link } from "react-router-dom";

// const AppButton = ({
//   children,
//   size = "md",
//   fullWidth = false,
//   disabled = false,
//   variant = "blue",
//   type = "button",
//   href,
//   className,
//   onClick,
//   ...props
// }) => {
//   const commonProps = {
//     className: clsx(
//       s.button,
//       s[variant],
//       s[`button--${size}`],
//       fullWidth && s.fullWidth,
//       className
//     ),
//     ...props,
//   };

//   if (href && (href.startsWith("http") || href.startsWith("#"))) {
//     const isExternal = /^https?:\/\//.test(href);

//     return (
//       <a
//         href={disabled ? undefined : href}
//         target={isExternal ? "_blank" : undefined}
//         rel={isExternal ? "noopener noreferrer" : undefined}
//         aria-disabled={disabled}
//         role={disabled ? "button" : undefined}
//         onClick={(e) => {
//           if (disabled) {
//             e.preventDefault();
//             return;
//           }
//           onClick?.(e);
//         }}
//         {...commonProps}
//       >
//         {children}
//       </a>
//     );
//   }

//   if (href) {
//     return (
//       <Link
//         to={href}
//         aria-disabled={disabled}
//         onClick={(e) => {
//           if (disabled) {
//             e.preventDefault();
//             return;
//           }
//           onClick?.(e);
//         }}
//         {...commonProps}
//       >
//         {children}
//       </Link>
//     );
//   }

//   return (
//     <button
//       type={type}
//       disabled={disabled}
//       onClick={(e) => {
//         if (disabled) {
//           e.preventDefault();
//           return;
//         }
//         onClick?.(e);
//       }}
//       {...commonProps}
//     >
//       {children}
//     </button>
//   );
// };

// export default AppButton;
