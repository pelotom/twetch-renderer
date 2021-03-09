declare module "bpu" {
    interface ParseInputs {
      tx: { r: {} };
      split: { token: { s: string } }[];
    }
  
    // i: positional index for whichever item it's attached to. applies to both tape and cell.
    // ii: global positional index. only applies to cell. For example, a cell can have a local index i of 0, but global index ii of 3.
    // b: base64 representation of a push data.
    // s: UTF8 representation of a push data.
    // op: a Bitcoin opcode number. only applies to push data items which are opcodes. (not buffer type push data)
    // ops: a Bitcoin opcode string. only applies to push data items which are opcodes. (not buffer type push data)
  
    export interface BOB {
      tx: { h: string };
      in: In[];
      out: Out[];
      lock: number;
    }
  
    export interface Indexed {
      i: number;
    }
  
    export interface In extends Indexed {
      tape: Cells[];
      e: E;
      seq: number;
    }
  
    export interface Out extends Indexed {
      tape: Cells[];
      e: E;
    }
  
    export interface E extends Indexed {
      v: number;
      a: string;
    }
  
    export interface Cells extends Indexed {
      cell: Cell[];
    }
  
    export interface Cell {
      ii: number;
      op?: number;
      ops?: string;
      b?: string;
      s?: string;
    }
  
    const BPU: {
      parse: (inputs: ParseInputs) => Promise<BOB>;
    };
  
    export default BPU;
  }
  