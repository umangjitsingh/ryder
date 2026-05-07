import PublicHome from "@/app/(web)/components/PublicHome";
import Footer from "@/app/(web)/components/Footer";
import Header from "@/app/(web)/components/Header";

export default function Home() {
		return (
			<div className="min-h-screen bg-[#121212]">
					{/* Background decorative elements */}
					<div className="fixed inset-0 overflow-hidden pointer-events-none">
							<div className="absolute -top-40 -right-40 w-80 h-80 bg-zinc-900/10 rounded-full blur-3xl"></div>
							<div className="absolute -top-10 right-8 w-80 h-80 bg-zinc-200/10 rounded-full blur-3xl"></div>
							<div className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl"></div>
					</div>

					<Header/>

					<main className="relative z-10 pt-20 max-h-screen overflow-hidden">
							<div className="absolute top-1/4 left-1/4 w-40 h-40 bg-zinc-950/90 rounded-full blur-2xl"></div>
							<PublicHome/>
					</main>

					<Footer/>
			</div>
		);
}