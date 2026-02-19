import type { ReactNode } from "react";

interface SummaryCardProps {
    icon: ReactNode;
    text: string;
    number: number;
	color: string
}

const SummaryCard = ({icon, text, number, color}:SummaryCardProps) => {
    return (
        <div className="
        rounded
        flex
        bg-white
        ">
            <div className=
			{`text-3xl
            flex
            justify-center
            items-center
            bg-teal-600
            text-white
			${color}
            px-4`}
            >
                {icon}
            </div>
            <div className="
			pl-4
			py-1
			">
                <p className="text-lg font-semibold">{text}</p>
                <p className="text-xl font-bold">{number}</p>
            </div>
        </div>
    )
}

export default SummaryCard