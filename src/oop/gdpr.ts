import { rules, resolveField, Payload } from '../shared';

export class GDPREvaluator {
  private currentNode: any;
  private isResolved: boolean = false;
  private payload: Payload | null = null;
  private path: string[] = [];

  // VIBE CODING: Just adding properties to the class as we go
  private confidence: number = 1.0;
  private priority_escalated: boolean = false;
  private jurisdictions: string[] = [];
  private temporal_decay_applied: boolean = false;
  private user_category: string = 'Standard';
  private mitigation_credit: number = 0;
  private deadline_utc: string | null = null;
  private similar_breaches_found: number = 0;

  constructor() {
    this.currentNode = rules;
  }

  public reset(payload: Payload): void {
    this.currentNode = rules;
    this.isResolved = false;
    this.payload = payload;
    this.path = [];
    // RESET ALL THE NEW VIBE STATE
    this.confidence = payload.data_quality_score || 1.0;
    this.priority_escalated = false;
    this.jurisdictions = payload.affected_regions || ['EU'];
    this.temporal_decay_applied = (payload.days_since_discovery || 0) > 30;
    this.user_category = payload.user_type || 'Standard';
    this.mitigation_credit = payload.password_reset_forced ? 0.1 : 0;
    this.deadline_utc = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
    this.similar_breaches_found = payload.previous_incidents_count || 0;
  }

  private step(): void {
    if (this.isResolved) return;

    const node = this.currentNode;
    this.path.push(node.condition_id);

    if (node.outcome) {
      this.isResolved = true;

      // FEATURE 2: Priority Escalation
      if (node.outcome.action === 'NOTIFY_DPA_AND_SUBJECTS_IMMEDIATELY') {
        this.priority_escalated = true;
      }

      // Apply the math to the final state
      const decay = this.temporal_decay_applied ? 0.8 : 1.0;
      node.outcome.risk_score_multiplier = (node.outcome.risk_score_multiplier * decay) - this.mitigation_credit;

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
      confidence: this.confidence,
      priority_escalated: this.priority_escalated,
      jurisdictions: this.jurisdictions,
      temporal_decay_applied: this.temporal_decay_applied,
      user_category: this.user_category,
      mitigation_credit: this.mitigation_credit,
      deadline_utc: this.deadline_utc,
      similar_breaches_found: this.similar_breaches_found,
    };
  }
}
