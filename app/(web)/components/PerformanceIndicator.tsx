import {ReactNode} from "react";

type PerformanceIndicatorProps = {
		label: string;
		value: number;
		icon: ReactNode;
		shadow:string;
};

const PerformanceIndicator = ({ label, value, icon, shadow }: PerformanceIndicatorProps) => {
		return (
			<div
				className={`group border border-white/10 bg-linear-to-bl from-white/5 to-white/10 rounded-xl ${shadow}`}
			>
      <span className="inline-block transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>

					<p className="text-lg pt-4 uppercase text-white/40 rubik tracking-tight">{label}</p>
					<p className="text-4xl text-white/80 font-extrabold rubik">{value}</p>
			</div>
		);
};


export default PerformanceIndicator;
