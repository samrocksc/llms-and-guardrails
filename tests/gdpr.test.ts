import { describe, it, expect } from 'vitest';
import { evaluate } from '../src/functional/gdpr';
import { GDPREvaluator } from '../src/oop/gdpr';
import { rules } from '../src/shared';

describe('GDPR Audit Trail Gauntlet', () => {
  const testPayloads = [
    {
      has_personal_data: true,
      organization_role: 'Controller',
      data_categories_exposed: ['health'],
      is_encrypted: false,
    },
    {
      has_personal_data: false,
      is_proprietary_intellectual_property: true,
    },
    {
      has_personal_data: true,
      organization_role: 'Processor',
      has_notified_controller_contractually: false,
    },
    {
      has_personal_data: true,
      organization_role: 'Controller',
      data_categories_exposed: [],
      record_count: 5000,
      is_targeted_exploit: true,
    }
  ];

  testPayloads.forEach((payload, idx) => {
    it(`Scenario ${idx}: Functional and OOP audit trails must be identical`, () => {
      const functionalResult = evaluate(rules, payload);
      
      const evaluator = new GDPREvaluator();
      evaluator.reset(payload);
      const oopResult = evaluator.run();

      expect(functionalResult.outcome).toEqual(oopResult.outcome);
      expect(functionalResult.path).toEqual(oopResult.path);
    });
  });
});
