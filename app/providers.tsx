'use client';

import {Provider} from 'react-redux';
import {store} from "./redux/appStore"
import {SessionProvider} from "next-auth/react";
import InitUser from "./InitUser";

export function Providers({children}: { children: React.ReactNode }) {
		return <SessionProvider>
				<Provider store={store}>
						<div className="min-h-screen bg-[#121212] flex flex-col">
								{/* Background decorative elements */}
								<div className="fixed inset-0 overflow-hidden pointer-events-none">
										<div className="absolute -top-40 -right-40 w-80 h-80 bg-zinc-900/20 rounded-full blur-3xl"></div>
										<div className="absolute -top-10 right-8 w-80 h-80 bg-zinc-700/10 rounded-full blur-3xl"></div>

								</div>
								<InitUser/>
								{children}
						</div>

				</Provider>
		</SessionProvider>
}


//div is to provide background-colors to whole website