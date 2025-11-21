// "use client";
//
// import styles from "./Popular.module.css";
// import { useStories } from "@/hooks/useStories";
// import { Loader } from "@/components/ui/Loader/Loader";
// import TravellersStoriesItem from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
// import type { Story } from "@/types/story.types";
//
// interface PopularProps {
//   limit?: number;
//   excludeId?: string;
// }
//
// export const Popular = ({ limit = 3, excludeId }: PopularProps) => {
//   const { data, isLoading, error } = useStories(1, limit);
//
//   if (isLoading) {
//     return <Loader />;
//   }
//
//   // якщо щось пішло не так або історій немає — нічого не рендеримо
//   if (
//     error ||
//     !data ||
//     !Array.isArray(data.items) ||
//     data.items.length === 0
//   ) {
//     return null;
//   }
//
//   // Виключаємо поточну історію зі списку
//   const filteredStories: Story[] = excludeId
//     ? data.items.filter((story) => story._id !== excludeId)
//     : data.items;
//
//   if (filteredStories.length === 0) {
//     return null;
//   }
//
//   return (
//     <section className={styles.section}>
//       <h2 className={styles.title}>Популярні історії</h2>
//       <div className={styles.grid}>
//         {filteredStories.slice(0, limit).map((story) => (
//           <TravellersStoriesItem key={story._id} story={story} />
//         ))}
//       </div>
//     </section>
//   );
// };
//
//
// /* fix for PR */