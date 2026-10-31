import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | Togetherly",
  description:
    "Create your Togetherly account to discover events, join your community, and start creating meaningful experiences.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
