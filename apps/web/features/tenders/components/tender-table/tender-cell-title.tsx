import { useRouter } from "next/navigation"

interface CellTitleProps {
    title: string,
    id: string
}

export default function TenderCellTitle({title, id}: CellTitleProps) {
    const router = useRouter();
    return <button className="text-[#6366f1] cursor-pointer" onClick={() => router.push(`/tenders/${id}`)}>{title}</button>
}