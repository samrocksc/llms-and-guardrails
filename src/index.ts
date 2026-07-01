import express from 'express';
import { evaluate } from './functional/gdpr';
import { GDPREvaluator } from './oop/gdpr';
import { rules } from './shared';

const app = express();
app.use(express.json());

app.post('/functional', (req, res) => {
  const result = evaluate(rules, req.body);
  res.json({ mode: 'functional-lite', decision: result });
});

app.post('/oop', (req, res) => {
  const evaluator = new GDPREvaluator();
  evaluator.reset(req.body);
  const result = evaluator.run();
  res.json({ mode: 'oop-stateful', decision: result });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Guardrail API running on port ${PORT}`);
});
