import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
        <Sparkles className="h-6 w-6" />
      </div>
      <h1 className="text-3xl font-extrabold text-[var(--foreground)]">Page Not Found</h1>
      <p className="text-sm text-[var(--muted-foreground)] max-w-sm">
        The celebration page you are looking for does not exist or has been relocated.
      </p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
