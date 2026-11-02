export interface Statistics {
  readonly stats  : Stat[];
}
export interface Stat {
  readonly title: string;
  readonly value: number;
}