import {Connection} from "mongoose"

declare global {
	var	mongooseBox : {
				successfulConnection: Connection | null,
				pendingConnection: Promise<Connection> | null
		}
}

export {}