export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-2">
      <h1 className="text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}
