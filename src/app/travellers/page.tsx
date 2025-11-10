'use client';
import { useEffect, useState } from "react";
import TravellersList from "@/components/travellers/TravellersList/TravellersList";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Traveller } from "@/types/traveller.types";
import css from "./page.module.css";
import LoadMoreButton from "@/components/ui/Button/LoadMoreButton/LoadMoreButton";

export default function TravellersPage() {
  // 👉 Поки немає бека — використовуємо заглушку (тимчасово!)
  const travellersStub: Traveller[] = [
    { id: "1", name: "Іван", bio: "Мандрівник", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: "2", name: "Олена", bio: "Любить гори", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: "3", name: "Максим", bio: "Подорожує автостопом",avatar:  "https://i.pravatar.cc/150?img=1" },
    { id: "4", name: "Аліна", bio: "Було вже понад 20 країн",avatar:  "https://i.pravatar.cc/150?img=4" },
    { id: "5", name: "Сергій", bio: "Фотограф і мандрівник", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: "6", name: "Марія", bio: "Цікавиться культурою Азії",avatar: "https://i.pravatar.cc/150?img=6"},
    { id: "7", name: "Дмитро", bio: "Мото-подорожі", avatar: "https://i.pravatar.cc/150?img=7" },
    { id: "8", name: "Ірина", bio: "Любить море і сонце", avatar: "https://i.pravatar.cc/150?img=8" },
    { id: "9", name: "Олексій", bio: "Подорожує з рюкзаком", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: "10", name: "Світлана", bio: "Тревел-тіктокер", avatar: "https://i.pravatar.cc/150?img=10" },
    { id: "11", name: "Арсен", bio: "Обожнює Карпати", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: "12", name: "Наталя", bio: "Подорожі з дітьми", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: "13", name: "Андрій", bio: "Любить море і сонце", avatar: "https://i.pravatar.cc/150?img=13" },
    { id: "14", name: "Назар", bio: "Подорожує з рюкзаком", avatar: "https://i.pravatar.cc/150?img=14" },
    { id: "15", name: "Олена", bio: "Тревел-тіктокер", avatar: "https://i.pravatar.cc/150?img=15" },
    { id: "16", name: "Захар", bio: "Обожнює Карпати", avatar: "https://i.pravatar.cc/150?img=16" },
    { id: "17", name: "Світлана", bio: "Подорожі з дітьми", avatar: "https://i.pravatar.cc/150?img=17" },
  ];

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const basePageSize = isDesktop ? 12 : 8;

  const [limit, setLimit] = useState(basePageSize);

  useEffect(() => {
    setLimit(basePageSize);
  }, [basePageSize]);

  const visible = travellersStub.slice(0, limit);
  const hasMore = limit < travellersStub.length;

  return (
    <section className={css.section}>
      <h1 className={css.title}>Мандрівники</h1>

      <TravellersList items={visible} />

      {hasMore && (
        <div className={css.loadMoreWrapper}>
          <LoadMoreButton onClick={() => setLimit(prev => prev + 4)}>
            Переглянути всі
          </LoadMoreButton>
        </div>
      )}
    </section>
  );
}
