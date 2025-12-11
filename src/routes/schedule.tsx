import { createFileRoute } from "@tanstack/react-router";
import { Schedule } from "@/components/Schedule";

export const Route = createFileRoute("/schedule")({
	component: Schedule
});
