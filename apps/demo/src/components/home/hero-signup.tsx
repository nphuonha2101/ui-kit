"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  Input,
  Separator,
} from "@nphuonha/ui-kit";

export function HeroSignup() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" aria-hidden />
      <Card className="relative">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Start building with the kit in seconds.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Field label="Email">
            <Input placeholder="you@example.com" type="email" />
          </Field>
          <Field label="Password">
            <Input placeholder="••••••••" type="password" />
          </Field>
          <Button className="w-full">Continue</Button>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              or
            </span>
            <Separator className="flex-1" />
          </div>
          <Button variant="secondary" className="w-full">
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>
      <div className="absolute -right-3 -top-3 rotate-6">
        <Badge variant="solid">New</Badge>
      </div>
    </div>
  );
}
