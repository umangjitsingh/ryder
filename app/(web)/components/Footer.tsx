"use client"
import React, { useEffect, useState } from "react";

const Footer = () => {
		const [time, setTime] = useState("");
		const [location, setLocation] = useState("Loading...");

		// Update time every second
		useEffect(() => {
				const updateTime = () => {
						const now = new Date();
						const formatted = now.toLocaleTimeString([], {
hour12:false
						});
						setTime(formatted);
				};

				updateTime();
				const interval = setInterval(updateTime, 1000);
				return () => clearInterval(interval);
		}, []);

		// Get user location (city + country)
		useEffect(() => {
			let isMounted = true;
		
			const getLocation = async () => {
				if (!navigator.geolocation) {
					if (isMounted) setLocation("Unknown Location");
					return;
				}
		
				try {
					navigator.geolocation.getCurrentPosition(async (pos) => {
						const { latitude, longitude } = pos.coords;
		
						// Reverse geocoding using OpenStreetMap (free)
						const res = await fetch(
							`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
						);
						const data = await res.json();
		
						const city = data.address.city || data.address.town || data.address.village;
						const country = data.address.country;
		
						if (isMounted) setLocation(`${city}, ${country}`);
					});
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
				} catch (error) {
					if (isMounted) setLocation("Unknown Location");
				}
			};
		
			getLocation();
		
			return () => {
				isMounted = false;
			};
		}, []);

		return (
			<div className="absolute bottom-0 text-white h-12 w-full">
					<div className="flex items-center justify-end uppercase gap-4 pr-20 font-extralight text-sm text-white/70 tracking-wider">
							<span>{location}</span>
							<span>{time}</span>
					</div>
			</div>
		);
};

export default Footer;

