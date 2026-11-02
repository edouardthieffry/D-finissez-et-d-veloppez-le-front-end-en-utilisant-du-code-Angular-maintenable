import type { Stat } from './stat';

export interface PageHeader {
  readonly title: string;
  readonly stats: Stat[];
}