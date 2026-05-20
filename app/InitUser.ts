"use client"

import useMe from "@/app/customHooks/useMe";
import {useSession} from "next-auth/react";

const InitUser = () => {
		const session = useSession();
		const {status} = session;

		useMe(status)

		return null
}
export default InitUser
