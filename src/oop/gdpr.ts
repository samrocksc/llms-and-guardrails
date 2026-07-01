import { rules, resolveField, Payload } from '../shared';

export class GDPREvaluator {
  private currentNode: any;
  private isResolved: boolean = false;
  private payload: Payload | null = null;
  private path: string[] = []; // ADDED STATE for Audit Trail

  constructor() {
    this.currentNode = rules;
  }

  public reset(payload: Payload): void {
    this.currentNode = rules;
    this.isResolved = false;
    this.payload = payload;
    this.path = []; // MUST remember to clear state
  }

  private step(): void {
    if (this.isResolved) return;

    const node = this.currentNode;
    this.path.push(node.condition_id); // Mutating state

    if (node.outcome) {
      this.isResolved = true;
      return;
    }

    const val = resolveField(node.field_to_evaluate, this.payload!);
    const evalType = node.evaluation_type;

    let isTrue = false;
    if (evalType === 'boolean_match') {
      isTrue = Boolean(val);
    } else if (evalType === 'matrix_lookup') {
      isTrue = (val === 'Controller');
    } else if (evalType === 'any_of') {
      isTrue = Array.isArray(val) && val.length > 0;
    } else if (evalType === 'threshold_check') {
      isTrue = (node.field_to_evaluate.includes('algorithm_bits')) 
               ? val > 128 
               : val > 1000;
    }

    this.currentNode = isTrue ? node.true_branch : node.false_branch;
  }

  public run() {
    while (!this.isResolved) {
      this.step();
    }
    return {
      outcome: this.currentNode.outcome,
      path: this.path,
    };
  }
}
