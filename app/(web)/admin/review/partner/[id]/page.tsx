import { cookies } from "next/headers";
import Driver from "@/app/(web)/UiForServerComponents/Driver";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
		const { id } = await params;

		const Url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

		const cookieStore = await cookies();
		const cookieHeader = cookieStore
			.getAll()
			.map(c => `${c.name}=${c.value}`)
			.join("; ");

		const res = await fetch(`${Url}/api/admin/review/partner/${id}`, {
				cache: "no-store",
				headers: {
						Cookie: cookieHeader
				}
		});

		const driverData = await res.json();
const{partner,bank,documents,vehicle}=driverData;

		return (
			<div className="min-h-screen w-full bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 flex items-start justify-center pt-24 pb-12 px-4">
					<div className="relative w-full max-w-6xl bg-white/3 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden">
							<Driver partner={partner} bank={bank} documents={documents} vehicle={vehicle}/>
					</div>
			</div>
		);
};

export default Page;



