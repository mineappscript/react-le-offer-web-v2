import { AUTH_URL_V1, BASE_API_URL } from "@/config";
import { MyLocationFromIp } from "@/pages";
import { IncomingMessage } from "http";
export const getMyIP = async (req: IncomingMessage | undefined): Promise<string> => {
    if (!req) {
        return "45.127.46.85"; // Return default IP address if request is undefined
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    if (typeof ip === 'string') {
        if (ip === "::1") {
            return "45.127.46.85"; // Return default IP address if IP is localhost
        } else {
            const newIp = ip.split(",");
            if (newIp && newIp.length > 0) {
                return newIp[0].trim(); // Return first IP address if multiple addresses are present
            } else {
                return ip.trim() || "45.127.46.85"; // Return trimmed IP address or default if IP is null
            }
        }
    } else {
        return "45.127.46.85"; // Return default IP address if ip is not a string
    }
};
export const getLocationData = async (req: IncomingMessage | undefined): Promise<MyLocationFromIp> => {
    const ip = await getMyIP(req);
    return new Promise((res, rej) => {
        fetch((`${BASE_API_URL}${AUTH_URL_V1}/usersCurrentLocation/?ipAddress=${ip}`))
            .then((data) => data.json())
            .then((data) => {
                return res(data.data);
            })
            .catch((err) => {
                rej();
                console.error(err);
            });
    });
};
