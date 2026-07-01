import { rules, resolveField, Payload } from '../shared';

export type Outcome = {
  action: string;
  risk_score_multiplier: number;
  remediation_priority: string;
};

export function evaluate(node: any, payload: Payload): Outcome {
  if (node.outcome) {
    return node.outcome;
  }

  const val = resolveField(node.field_to_evaluate, payload);
  const evalType = node.evaluation_type;

  const isTrue = (() => {
    if (evalType === 'boolean_match') return Boolean(val);
    if (evalType === 'matrix_lookup') return val === 'Controller';
    if (evalType === 'any_of') return Array.isArray(val) && val.length > 0;
    if (evalType === 'threshold_check') {
      return node.field_to_evaluate.includes('algorithm_bits') 
        ? val > 128 
        : val > 1000;
    }
    return false;
  })();

  return evaluate(isTrue ? node.true_branch : node.false_branch, payload);
}
