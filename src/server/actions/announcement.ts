import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/utils";
import { AnnouncementParams } from "@/types/server";

const getOverview = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await api.get(APIURLS.GET_ANNOUNCEMENTS);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const broadcastAnnouncement = async (
	data: AnnouncementParams
): Promise<AxiosResponse["data"]> => {
	const payload = data;

	try {
		const response = await api.post(`${APIURLS.POST_ANNOUNCEMENT}`, payload);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const announcementApi = {
	getOverview,
	broadcastAnnouncement,
};
