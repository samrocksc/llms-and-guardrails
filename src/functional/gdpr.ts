import { rules, resolveField, Payload } from '../shared';

export type Outcome = {
  action: string;
  risk_score_multiplier: number;
  remediation_priority: string;
};

export type EvaluationResult = {
  outcome: Outcome;
  path: string[];
  confidence: number;
  priority_escalated: boolean;
  jurisdictions: string[];
  temporal_decay_applied: boolean;
  user_category: string;
  mitigation_credit: number;
  deadline_utc: string | null;
  similar_breaches_found: number;
};

export function evaluate(node: any, payload: Payload, path: string[] = [], state: any = {}): EvaluationResult {
  const currentPath = [...path, node.condition_id];
  
  // FEATURE 1: Confidence Scoring (Vibe Coding Addition)
  const confidence = payload.data_quality_score || 1.0;
  
  // FEATURE 3: Multi-Jurisdiction (Vibe Coding Addition)
  const jurisdictions = payload.affected_regions || ['EU'];

  if (node.outcome) {
    const outcome = node.outcome;
    
    // FEATURE 2: Priority Escalation
    const priority_escalated = outcome.action === 'NOTIFY_DPA_AND_SUBJECTS_IMMEDIATELY';

    // FEATURE 4: Temporal Decay
    const daysSinceBreach = payload.days_since_discovery || 0;
    const temporal_decay_applied = daysSinceBreach > 30;
    const finalMultiplier = temporal_decay_applied ? outcome.risk_score_multiplier * 0.8 : outcome.risk_score_multiplier;

    // FEATURE 5: User Category
    const user_category = payload.user_type || 'Standard';

    // FEATURE 6: Mitigation Credit
    const mitigation_credit = payload.password_reset_forced ? 0.1 : 0;

    // FEATURE 7: Deadline Calculator
    const deadline_utc = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

    // FEATURE 8: Cross-Reference Check
    const similar_breaches_found = payload.previous_incidents_count || 0;

    return {
      outcome: { ...outcome, risk_score_multiplier: finalMultiplier - mitigation_credit },
      path: currentPath,
      confidence,
      priority_escalated,
      jurisdictions,
      temporal_decay_applied,
      user_category,
      mitigation_credit,
      deadline_utc,
      similar_breaches_found,
    };
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

  return evaluate(isTrue ? node.true_branch : node.false_branch, payload, currentPath, state);
}
