"use client";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUserData} from "@/app/redux/userSlice";

function useMe(status: "loading" | "authenticated" | "unauthenticated") {
		const dispatch = useDispatch();
		useEffect(() => {
				const getMe = async () => {
						if (status !== "authenticated") return;

						try {
								const url = new URL(
									"/api/auth/me",
									process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
								);

								const res = await fetch(url, {
										method: "GET",
										headers: {
												"Content-Type": "application/json",
										},
								});
								const data = await res.json()
								console.log("res from useMe ->", data);
								dispatch(setUserData(data))
						} catch (e) {
								console.log(e);
						}
				};

				getMe();
		}, [status]);
}

export default useMe;
