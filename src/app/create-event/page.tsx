import { Metadata } from "next";
import CreateEventForm from "@/components/events/CreateEventForm";

export const metadata: Metadata = {
  title: "Create Event | Togetherly",
  description:
    "Create and publish your event on Togetherly — add the details, pick a category, and rally your community around something meaningful.",
};

export default function CreateEventPage() {
  return <CreateEventForm />;
}
