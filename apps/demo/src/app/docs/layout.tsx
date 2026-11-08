import { DocsSidebar, MobileDocsNav } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 md:px-6">
      <DocsSidebar />
      <div className="min-w-0 flex-1 py-8 md:py-10">
        <MobileDocsNav />
        {children}
      </div>
    </div>
  );
}
