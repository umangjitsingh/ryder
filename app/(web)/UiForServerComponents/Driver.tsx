"use client";

import {useRouter} from "next/navigation";
import CheckFillIcon from '@iconify-react/lets-icons/check-fill';
import PendingIcon from '@iconify-react/material-symbols/pending';
import TabCloseIcon from '@iconify-react/material-symbols/tab-close';
import CarIcon from '@iconify-react/mdi/car';
import FileDocIcon from '@iconify-react/mdi/file-document-outline';
import BankIcon from '@iconify-react/mdi/bank';
import PhoneIcon from '@iconify-react/mdi/phone';
import EmailIcon from '@iconify-react/mdi/email-outline';
import CalendarIcon from '@iconify-react/mdi/calendar-clock';
import {Typewriter} from "@/app/(web)/components/TypewriterText";
import Link from "next/link";

type DriverProps = {
		partner: any,
		bank: any,
		documents: any,
		vehicle: any
}

/* ── reusable status badge ── */
const StatusBadge = ({status}: { status: string }) => {
		if (status === "approved" || status === "verified" || status === "added") {
				return (
					<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
							<CheckFillIcon height="1em"/>
							{status.charAt(0).toUpperCase() + status.slice(1)}
					</span>
				);
		}
		if (status === "pending" || status === "not_added") {
				return (
					<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
							<PendingIcon height="1em"/>
							{status === "not_added" ? "Not Added" : "Pending"}
					</span>
				);
		}
		return (
			<span className=":inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
					<TabCloseIcon height="1em"/>
					{status.charAt(0).toUpperCase() + status.slice(1)}
			</span>
		);
};

/* ── info row ── */
const InfoRow = ({label, value}: { label: string; value: string | undefined | null; }) => (
	<div className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-b-0">
			<span className="text-white/40 text-sm">{label}</span>
			<span className="text-white/90 text-sm font-medium text-right">{value || "—"}</span>
	</div>
);
// --for docs row (image/pdf)--
const InfoRowDocs = ({label, url}: { label: string; url: any }) => {
			const isImage = url?.match(/\.(jpg|jpeg|png|webp)$/i);
			const isPdf = url?.endsWith(".pdf");
			return (<div className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-b-0">
					<span className="text-white/40 text-sm">{label}</span>
					<div>
							{!url && <span className="text-red-400/90 text-sm font-medium text-right">
								 <Typewriter text="* Image not Uploaded"/>
							</span>}
							{isImage && (
								<Link href={url} target="_blank" rel="noopener noreferrer">
										<img
											src={url}
											alt={label}
											className="w-24 h-24 object-center rounded-lg hover:h-26 hover:w-26 transition-all border-2 border-emerald-500/70 duration-400 cursor-pointer"
										/>
									<span className="text-xs text-white/80 font-medium -ml-1 ">Open Full Document</span>
								</Link>
							)}

							{isPdf && (
								<Link href={url} target="_blank" rel="noopener noreferrer">
										<iframe
											src={url}
											className="w-24 h-24 object-center rounded-lg hover:h-28 hover:w-28 transition-all border-2 border-emerald-500/70 duration-400 cursor-pointer"
										/>
								</Link>
							)}

					</div>

			</div>)
	}
;

/* ── section card wrapper ── */
const SectionCard = ({
		                     icon,
		                     title,
		                     status,
		                     children
                     }: {
		icon: React.ReactNode;
		title: string;
		status?: string;
		children: React.ReactNode;
}) => (
	<div className="bg-white/3 border border-white/6 rounded-2xl p-5 hover:bg-white/5 transition-colors duration-300">
			<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
							<div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/50">
									{icon}
							</div>
							<h3 className="text-white/80 font-semibold text-sm tracking-wide uppercase">{title}</h3>
					</div>
					{status && <StatusBadge status={status}/>}
			</div>
			{children}
	</div>
);

const Driver = ({partner, bank, documents, vehicle}: DriverProps) => {
		const router = useRouter();

		console.log(documents)

		const partnerStatus = partner?.partnerStatus ?? "pending";
		const vehicleStatus = vehicle?.status ?? "pending";
		const docsStatus = documents?.status ?? "pending";
		const bankStatus = bank?.status ?? "not_added";

		return (
			<div className="text-white">
					{/* ─── Header ─── */}
					<div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-xl border-b border-white/6">
							<div className="relative flex items-center sm:gap-5 gap-2 px-2.5 sm:px-6 py-4">
									{/* Back */}
									<button
										onClick={() => router.back()}
										className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 shrink-0 group"
									>
											<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 48 48"
											     className="text-gray-400 group-hover:text-white transition-colors">
													<g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={4}>
															<path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/>
															<path strokeLinecap="round" d="m27 33l-9-9l9-9"/>
													</g>
											</svg>
									</button>

									{/* Avatar + Name */}
									<div className="flex items-center gap-4 flex-1 min-w-0">
											<div className="hidden w-12 h-12 rounded-full bg-linear-to-br from-amber-400 to-orange-500 sm:flex items-center justify-center text-gray-950 font-bold text-lg shrink-0 shadow-lg shadow-amber-500/20">
													{(partner?.name?.[0] ?? "U").toUpperCase()}
											</div>
											<div className="min-w-0">
													<h2 className="text-lg font-semibold capitalize truncate text-gray-300 rubik">
															{partner?.name || "Unknown Driver"}
													</h2>
													<div className="flex items-center gap-2 text-sm text-white/40 flex-wrap">
															{partner?.email && (
																<span className="inline-flex items-center gap-1 ">
																		<EmailIcon height="0.95em" className="text-gray-400 "/>
																		<span className="font-medium rubik tracking-tight text-xs text-gray-400">{partner.email}</span>
																</span>
															)}
															{partner?.mobileNumber && (
																<span className="inline-flex items-center gap-1">
																		<PhoneIcon height="0.95em" className="text-gray-400"/>
																		<span className="font-medium rubik tracking-tight  text-gray-400">{partner.mobileNumber}</span>

																</span>
															)}
													</div>
											</div>
									</div>

									{/* Overall status */}
									<span className="absolute top-2 right-4 sm:relative scale-85">
									<StatusBadge status={partnerStatus}/>
									</span>

							</div>
					</div>

					{/* ─── Body ─── */}
					<div className="p-6 space-y-5">

							{/* Quick Stats Row */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
									{[
											{label: "Vehicle", value: vehicle?.type ?? "N/A", color: "text-blue-400"},
											{label: "Model", value: vehicle?.vehicleModel ?? "N/A", color: "text-purple-400"},
											{label: "Plate", value: vehicle?.vehicleNumber ?? "N/A", color: "text-cyan-400"},
											{label: "Bank", value: bank?.status === "verified" ? "Verified" : bank?.status === "added" ? "Added" : "Not Added", color: "text-emerald-400"},
									].map((s) => (
										<div key={s.label}
										     className="bg-white/3 border border-white/6] rounded-xl px-4 py-3 text-center">
												<div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
												<div className="text-white/30 text-xs mt-0.5 uppercase tracking-wider">{s.label}</div>
										</div>
									))}
							</div>

							{/* Cards Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

									{/* ── Vehicle ── */}
									<SectionCard
										icon={<CarIcon height="1.2em"/>}
										title="Vehicle"
										status={vehicleStatus}
									>
											<InfoRow label="Type" value={vehicle?.type ? vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1) : null}/>
											<InfoRow label="Model" value={vehicle?.vehicleModel}/>
											<InfoRow label="Plate Number" value={vehicle?.vehicleNumber}/>
											<InfoRow label="Base Fare" value={vehicle?.baseFare != null ? `₹${vehicle.baseFare}` : null}/>
											<InfoRow label="Price / KM" value={vehicle?.pricePerKM != null ? `₹${vehicle.pricePerKM}` : null}/>
											<InfoRow label="Waiting Charge" value={vehicle?.waitingCharge != null ? `₹${vehicle.waitingCharge}` : null}/>
											<InfoRow label="Active" value={vehicle?.isActive ? "Yes" : "No"}/>
											{vehicle?.rejectionReason && (
												<div className="mt-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
														<strong>Rejection:</strong> {vehicle.rejectionReason}
												</div>
											)}
									</SectionCard>

									{/* ── Documents ── */}
									<SectionCard
										icon={<FileDocIcon height="1.2em"/>}
										title="Documents"
										status={docsStatus}
									>
											{documents ? (
												<>
														{documents.aadhaarUrl && (
															<InfoRowDocs label="Aadhaar" url={documents?.aadhaarUrl}/>
														)}
														{documents.rcUrl && (
															<InfoRowDocs label="RC" url={documents?.rcUrl}/>
														)}
														{documents.licenseUrl && (
															<InfoRowDocs label="License" url={documents?.licenseUrl}/>
														)}
														{documents.rejectionReason && (
															<div className="mt-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
																	<strong>Rejection:</strong> {documents.rejectionReason}
															</div>
														)}
												</>
											) : (
												<p className="text-white/30 text-sm text-center py-6">No documents submitted</p>
											)}
									</SectionCard>

									{/* ── Bank ── */}
									<SectionCard
										icon={<BankIcon height="1.2em"/>}
										title="Bank Details"
										status={bankStatus}
									>
											{bank ? (
												<>
														<InfoRow label="Account Holder" value={bank?.accountHolder}/>
														<InfoRow label="Account Number"
														         value={bank?.accountNumber ? `••••${bank.accountNumber.slice(-4)}` : null}/>
														<InfoRow label="IFSC" value={bank?.ifsc}/>
														<InfoRow label="UPI" value={bank?.upi}/>
												</>
											) : (
												<p className="text-white/30 text-sm text-center py-6">No bank details provided</p>
											)}
									</SectionCard>
							</div>

							{/* Partner Meta */}
							{partner?.createdAt && (
								<div className="flex items-center gap-2 text-white/20 text-xs px-1">
										<CalendarIcon height="1em"/>
										Registered {new Date(partner.createdAt).toLocaleDateString("en-IN", {
										year: "numeric",
										month: "long",
										day: "numeric"
								})}
								</div>
							)}
					</div>
			</div>
		);
};

export default Driver;
