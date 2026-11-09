import { BackToTop } from "@/components/docs/back-to-top";
import { DocsSidebar, MobileDocsNav } from "@/components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 md:px-6">
      <DocsSidebar />
      <div className="min-w-0 flex-1 pb-28 pt-8 md:pt-10 lg:pb-10">
        <MobileDocsNav />
        {children}
        <BackToTop />
      </div>
    </div>
  );
}
