import type { Participation } from './participation';

export interface Country {
  readonly id: number;
  readonly country: string;
  readonly participations: Participation[];
}