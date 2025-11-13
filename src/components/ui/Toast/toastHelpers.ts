import { toast } from "react-hot-toast";

export const showSuccessToast = (message: string) =>
  toast.success(message, {
    duration: 4000,
  });

export const showErrorToast = (message: string) =>
  toast.error(message, {
    duration: 5000,
  });
