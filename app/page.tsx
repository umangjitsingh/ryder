import PublicHome from "@/app/(web)/components/PublicHome";



export default function Home() {
		return (
					<main className="relative z-10 pt-18 flex-1">
							<div className="absolute top-1/4 left-1/4 w-40 h-40  rounded-full blur-2xl"></div>
							<PublicHome/>
					</main>
		);
}