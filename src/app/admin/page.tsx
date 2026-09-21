import type { Metadata } from "next";
import { AdminWorkspace } from "@/components/admin-workspace";

export const metadata: Metadata = {
	title: "Catalogue manager",
	description: "Local demo workspace for managing resin catalogue assets.",
};

export default function AdminPage() {
	return <AdminWorkspace />;
}
