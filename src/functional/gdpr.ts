import { rules, resolveField, Payload } from '../shared';

export type Outcome = {
  readonly action: string;
  readonly risk_score_multiplier: number;
  readonly remediation_priority: string;
};

export type EvaluationResult = {
  readonly outcome: Outcome;
  readonly path: readonly string[];
  readonly confidence: number;
  readonly priority_escalated: boolean;
  readonly jurisdictions: readonly string[];
  readonly temporal_decay_applied: boolean;
  readonly user_category: string;
  readonly mitigation_credit: number;
  readonly deadline_utc: string | null;
  readonly similar_breaches_found: number;
};

export function evaluate(node: any, payload: Readonly<Payload>, path: readonly string[] = [], state: Readonly<any> = {}): EvaluationResult {
  const currentPath: readonly string[] = [...path, node.condition_id];
  
  const confidence = payload.data_quality_score || 1.0;
  const jurisdictions = payload.affected_regions || ['EU'];

  if (node.outcome) {
    const outcome = node.outcome;
    const priority_escalated = outcome.action === 'NOTIFY_DPA_AND_SUBJECTS_IMMEDIATELY';
    const daysSinceBreach = payload.days_since_discovery || 0;
    const temporal_decay_applied = daysSinceBreach > 30;
    const finalMultiplier = temporal_decay_applied ? outcome.risk_score_multiplier * 0.8 : outcome.risk_score_multiplier;
    const user_category = payload.user_type || 'Standard';
    const mitigation_credit = payload.password_reset_forced ? 0.1 : 0;
    const deadline_utc = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
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
