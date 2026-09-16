export interface Machine {
  id: string;
  name: string;
  type: string;
  sequence: number | null;

  length: number | null;
  width: number | null;
  height: number | null;

  x?: number | null;
  z?: number | null;
  rotation: number;
  status: string;
  
}