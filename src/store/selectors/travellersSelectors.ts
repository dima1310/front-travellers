import type {RootState} from "../index";

export const selectTravellers = (s: RootState) => s.travellers.items;
export const selectTravellersVisible = (s: RootState) => s.travellers.visible;
export const selectTravellersStatus = (s: RootState) => s.travellers.status;
