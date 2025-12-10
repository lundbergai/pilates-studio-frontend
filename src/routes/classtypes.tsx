import { createFileRoute } from "@tanstack/react-router";
import ClassTypes from "@/components/ClassTypes";

export const Route = createFileRoute("/classtypes")({
	component: ClassTypes
});
