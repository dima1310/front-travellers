import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";

interface TravellerPageProps {
  params: { id: string };
}

export default function TravellerPage({ params }: TravellerPageProps) {
  return <TravellerInfo id={params.id} />;
}
