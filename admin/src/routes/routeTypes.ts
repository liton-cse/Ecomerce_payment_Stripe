import type { LazyExoticComponent, FC } from "react";

export interface AppRoute {
  path: string;
  element: LazyExoticComponent<FC<any>>;
  layout?: LazyExoticComponent<
    React.ComponentType<{ children: React.ReactNode }>
  > | null;
  protected?: boolean;
}
