// ⚠️ ВРЕМЕННЫЕ МОК-ДАННЫЕ — УДАЛИТЬ, когда подключим бэкенд

// Цель: увидеть список путешественников на странице,
// пока нет подключения к бэкенду.
//
// Что делать позже:
// 1) Удалить этот массив travellers
// 2) Заменить на fetch('/api/travellers')

const travellers = [
  {
    id: "1",
    name: "Анастасія Олійник",
    bio: "Коротка біографія…",
    avatar: "/avatars/1.jpg"
  },
  {
    id: "2",
    name: "Назар Тищенко",
    bio: "Коротка біографія…",
    avatar: "/avatars/2.jpg"
  },
];

// ✅ ПОСЛЕ подключения API будет вот так:
// const travellers = await fetch('/api/travellers').then(res => res.json());

import TravellersList from "@/components/travellers/TravellersList/TravellersList";

export default function TravellersPage(){
    return <TravellersList items={travellers}/>
}