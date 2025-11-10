import { useAppSelector } from "@/store";
import {
  selectIsAuth,
  selectUser,
  selectToken,
} from "@/store/selectors/authSelectors";

export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  return { isAuth, user, token };
};
