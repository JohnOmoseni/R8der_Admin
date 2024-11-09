import { announcementApi } from "@/server/actions/announcement";
import { AnnouncementParams, AnnouncementType } from "@/types/server";
import { toTitleCase } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

// ANNOUNCEMENTS ----------------------------------------------------------------
// GET ALL ANNOUNCEMENTS

export const useGetAllAnnouncements = () => {
	return useQuery({
		queryKey: ["getAllAnnouncements"],
		queryFn: () => announcementApi.getOverview(),

		select: (data) => {
			const response = data.data;

			const annoucementData = response?.map(
				(announcement: AnnouncementType) => ({
					id: announcement.id,
					subject: announcement.subject,
					content: announcement.content,
					targetAudience: toTitleCase(announcement.targetAudience),
					subTargetAudience: toTitleCase(announcement.subTargetAudience),
					publishDate: announcement.publishDate
						? dayjs(announcement.publishDate).format("DD-MM-YYYY h:mmA")
						: null,
					channel: toTitleCase(announcement.channel),
				})
			);

			return annoucementData;
		},
	});
};

export const useBroadcastAnnouncement = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Omit<AnnouncementParams, "id">) =>
			announcementApi.broadcastAnnouncement(data),
		onError: (error) => console.error("Broadcast Announcement Error]", error),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllAnnouncements"] });
		},
	});
};
