import type { JSX, LazyExoticComponent } from "react";

export interface AppRoute {
  path: string;
  element: LazyExoticComponent<() => JSX.Element>;
  layout?: LazyExoticComponent<
    React.ComponentType<{ children: React.ReactNode }>
  > | null;
  protected?: boolean;
}
