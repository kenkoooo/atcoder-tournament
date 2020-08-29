export interface BracketNode {
  name: string;
  children: BracketNode[];
  rating?: number;
  rank?: number;
}
