"use client"
import useApiFetcher from "@/app/(web)/hook/useApiFetcher";
import PerformanceIndicator from "@/app/(web)/components/PerformanceIndicator";
import UsersOutlineIcon from '@iconify-react/flowbite/users-outline';
import ValidationApprovalIcon from '@iconify-react/hugeicons/validation-approval';
import VmPendingIcon from '@iconify-react/codicon/vm-pending';
import CloseIcon from '@iconify-react/simple-line-icons/close';
import TabButton from "@/app/(web)/components/TabButton";
import CameraVideoIcon from '@iconify-react/streamline/camera-video';
import CarSportOutlineIcon from '@iconify-react/ion/car-sport-outline';
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import ReviewCards from "@/app/(web)/components/ReviewCards";

type PendingPartner = {
		_id: string;
		name: string;
		email: string;
		vehicleType: string;
};

type AdminDashboardResponse = {
		stats: {
				totalPartners: number;
				approved: number;
				pending: number;
				rejected: number;
		};
		pending_partner: PendingPartner[];
};
type Tab = "partner" | "kyc" | "vehicle";

const AdminDashboard = () => {
		const data = useApiFetcher<AdminDashboardResponse>("/api/admin/dashboard");
		const [activeTab, setActiveTab] = useState<Tab>("partner");
		const [pendingPartnerFileReviews, setPendingPartnerFileReviews] = useState<PendingPartner[]>([])
		const [pendingPartnerKycReviews, setPendingPartnerKycReviews] = useState([4,7])
		const [pendingPartnerVehicleReviews, setPendingPartnerVehicleReviews] = useState([])

		// console.log("d->",data)
		useEffect(() => {
				if (data?.pending_partner) {
						setPendingPartnerFileReviews(data.pending_partner);
				}
		}, [data]);

		return (
			<div className="min-h-screen w-full text-white pt-10">
					<main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
							{data && <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                 <PerformanceIndicator label="Total Drivers" value={data?.stats?.totalPartners} shadow={"hover:shadow-[#b691ff] shadow-sm p-6 transition-all duration-200"} icon={
										 <UsersOutlineIcon height="1.4em" color="#b691FF"/>}/>
                 <PerformanceIndicator label="Approved " value={data?.stats?.approved} shadow={"hover:shadow-[#baff91] shadow-sm p-6 transition-all duration-200"} icon={
										 <ValidationApprovalIcon height="1.4em" color="#baff91"/>}/>
                 <PerformanceIndicator label="Pending" value={data?.stats?.pending} shadow={"hover:shadow-[#86edff] shadow-sm p-6 transition-all duration-200"} icon={
										 <VmPendingIcon height="1.4em" color="#86edff"/>}/>
                 <PerformanceIndicator label="Rejected" value={data?.stats?.rejected} shadow={"hover:shadow-[#ed7878] shadow-sm p-6 transition-all duration-200"} icon={
										 <CloseIcon height="1.4em" color="#ed7878"/>}/>
              </div>}

							<div className="border border-white/10 bg-linear-to-bl from-white/5 to-white/10 rounded-xl ">
									<div className="flex flex-wrap gap-2 pl-6 py-4">
											<TabButton active={activeTab === "partner"} count={pendingPartnerFileReviews?.length ?? 0} icon={
													<UsersOutlineIcon height="1.4em"/>} onClick={() => setActiveTab("partner")}>Partner Review</TabButton>
											<TabButton active={activeTab === "kyc"} count={pendingPartnerKycReviews?.length ?? 0} icon={
													<CameraVideoIcon height="1.4em"/>} onClick={() => setActiveTab("kyc")}> Video Kyc</TabButton>
											<TabButton active={activeTab === "vehicle"} count={pendingPartnerVehicleReviews?.length ?? 0} icon={
													<CarSportOutlineIcon height="1.4em"/>} onClick={() => setActiveTab("vehicle")}> Vehicle Review</TabButton>
									</div>
							</div>

							<AnimatePresence mode="wait">
									<motion.div key={activeTab}
										          initial={{opacity: 0, y: 16}}
									            animate={{opacity: 1, y: 0}}
									            exit={{opacity: 0, y: -8}}
									            transition={{duration: 0.2, ease: "easeOut"}}
									            className="space-y-4">
											{activeTab == "partner" && <ReviewCards data={pendingPartnerFileReviews ?? []} type={"partner"} /> }
											{activeTab == "kyc" && <ReviewCards data={pendingPartnerKycReviews ?? []} type={"kyc"} /> }
											{activeTab == "vehicle" && <ReviewCards data={pendingPartnerVehicleReviews ?? []} type={"vehicle"} /> }
									</motion.div>
							</AnimatePresence>

					</main>
			</div>
		)
}
export default AdminDashboard;

