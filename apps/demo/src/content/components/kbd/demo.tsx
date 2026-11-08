import { Kbd, KbdGroup } from "@nphuonha/ui-kit";

function KbdDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between rounded-control bg-surface px-3 py-2 text-sm text-muted-foreground">
        <span>Search</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between rounded-control bg-surface px-3 py-2 text-sm text-muted-foreground">
        <span>Command palette</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </div>
    </div>
  );
}

export const demo = KbdDemo;
export const examples = {};
