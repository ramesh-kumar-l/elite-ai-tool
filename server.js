import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// SQLite Database Connection
const db = new sqlite3.Database(join(__dirname, 'elite-ai.db'));

// Helper to promisify db operations
const dbRun = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function(err) {
    if (err) reject(err);
    else resolve({ id: this.lastID, changes: this.changes });
  });
});

const dbGet = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) reject(err);
    else resolve(row);
  });
});

const dbAll = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) reject(err);
    else resolve(rows || []);
  });
});

// ==================== USER PROFILE ENDPOINTS ====================

app.get('/api/user-profile', async (req, res) => {
  try {
    const profile = await dbGet('SELECT * FROM user_profile LIMIT 1');
    res.json(profile || { vision: '', currentPhase: 'foundation', createdAt: new Date() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/user-profile', async (req, res) => {
  try {
    const { vision, currentPhase, skills, goals } = req.body;
    const existing = await dbGet('SELECT id FROM user_profile LIMIT 1');
    
    if (existing) {
      await dbRun(
        'UPDATE user_profile SET vision = ?, currentPhase = ?, skills = ?, goals = ?, updatedAt = ? WHERE id = ?',
        [vision, currentPhase, JSON.stringify(skills), JSON.stringify(goals), new Date().toISOString(), existing.id]
      );
    } else {
      await dbRun(
        'INSERT INTO user_profile (vision, currentPhase, skills, goals) VALUES (?, ?, ?, ?)',
        [vision, currentPhase, JSON.stringify(skills), JSON.stringify(goals)]
      );
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== OPPORTUNITIES ENDPOINTS ====================

app.get('/api/opportunities', async (req, res) => {
  try {
    const opportunities = await dbAll('SELECT * FROM opportunities ORDER BY createdAt DESC');
    const parsed = opportunities.map(opp => ({
      ...opp,
      skills: JSON.parse(opp.skills || '[]'),
      metrics: JSON.parse(opp.metrics || '{}')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/opportunities', async (req, res) => {
  try {
    const { title, sector, description, confidence, inflectionReadiness, skillAlignment, marketTiming, sustainability, skills, stage } = req.body;
    const id = uuidv4();
    const metrics = { confidence, inflectionReadiness, skillAlignment, marketTiming, sustainability };
    
    await dbRun(
      'INSERT INTO opportunities (id, title, sector, description, confidence, stage, skills, metrics, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, title, sector, description, confidence, stage || 'identified', JSON.stringify(skills), JSON.stringify(metrics), new Date().toISOString()]
    );
    res.json({ id, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/opportunities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, sector, description, confidence, inflectionReadiness, skillAlignment, marketTiming, sustainability, skills, stage } = req.body;
    const metrics = { confidence, inflectionReadiness, skillAlignment, marketTiming, sustainability };
    
    await dbRun(
      'UPDATE opportunities SET title = ?, sector = ?, description = ?, confidence = ?, stage = ?, skills = ?, metrics = ?, updatedAt = ? WHERE id = ?',
      [title, sector, description, confidence, stage, JSON.stringify(skills), JSON.stringify(metrics), new Date().toISOString(), id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/opportunities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await dbRun('DELETE FROM opportunities WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== DECISIONS ENDPOINTS ====================

app.get('/api/decisions', async (req, res) => {
  try {
    const decisions = await dbAll('SELECT * FROM decisions ORDER BY createdAt DESC');
    const parsed = decisions.map(dec => ({
      ...dec,
      impacts: JSON.parse(dec.impacts || '{}'),
      outcomes: JSON.parse(dec.outcomes || '{}')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/decisions', async (req, res) => {
  try {
    const { title, context, options, chosen, rationale, longTermScore, reversibility, optionalityCreated } = req.body;
    const id = uuidv4();
    const impacts = { longTermScore, reversibility, optionalityCreated };
    
    await dbRun(
      'INSERT INTO decisions (id, title, context, options, chosen, rationale, impacts, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, title, context, JSON.stringify(options), chosen, rationale, JSON.stringify(impacts), new Date().toISOString()]
    );
    res.json({ id, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== LEARNING VELOCITY ENDPOINTS ====================

app.get('/api/learning', async (req, res) => {
  try {
    const learning = await dbAll('SELECT * FROM learning_log ORDER BY createdAt DESC');
    const parsed = learning.map(log => ({
      ...log,
      progress: JSON.parse(log.progress || '{}')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/learning', async (req, res) => {
  try {
    const { skill, domain, hoursInvested, competenceLevel, practicalApplication, feedback } = req.body;
    const id = uuidv4();
    const velocityScore = hoursInvested > 0 ? (competenceLevel / hoursInvested * 100).toFixed(2) : 0;
    
    await dbRun(
      'INSERT INTO learning_log (id, skill, domain, hoursInvested, competenceLevel, velocityScore, practicalApplication, feedback, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, skill, domain, hoursInvested, competenceLevel, velocityScore, practicalApplication, feedback, new Date().toISOString()]
    );
    res.json({ id, velocityScore, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== QUARTERLY REVIEW ENDPOINTS ====================

app.get('/api/quarterly-reviews', async (req, res) => {
  try {
    const reviews = await dbAll('SELECT * FROM quarterly_reviews ORDER BY quarter DESC');
    const parsed = reviews.map(rev => ({
      ...rev,
      skillsAcquired: JSON.parse(rev.skillsAcquired || '[]'),
      opportunitiesIdentified: JSON.parse(rev.opportunitiesIdentified || '[]'),
      decisionsLogged: JSON.parse(rev.decisionsLogged || '[]'),
      priorities: JSON.parse(rev.priorities || '[]')
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/quarterly-reviews', async (req, res) => {
  try {
    const { quarter, year, skillsAcquired, opportunitiesIdentified, decisionsLogged, marketPositionShifted, priorities, reflection } = req.body;
    const id = uuidv4();
    
    await dbRun(
      'INSERT INTO quarterly_reviews (id, quarter, year, skillsAcquired, opportunitiesIdentified, decisionsLogged, marketPositionShifted, priorities, reflection, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, quarter, year, JSON.stringify(skillsAcquired), JSON.stringify(opportunitiesIdentified), JSON.stringify(decisionsLogged), marketPositionShifted, JSON.stringify(priorities), reflection, new Date().toISOString()]
    );
    res.json({ id, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== ANALYSIS ENDPOINTS ====================

app.post('/api/analyze', async (req, res) => {
  try {
    const { question, mode } = req.body; // mode: 'WHAT', 'HOW', 'WHERE', 'SYNTHESIS'
    
    // Get user context
    const profile = await dbGet('SELECT * FROM user_profile LIMIT 1');
    const opportunities = await dbAll('SELECT * FROM opportunities');
    const decisions = await dbAll('SELECT * FROM decisions');
    
    // Structure analysis based on mode
    const analysis = {
      mode,
      question,
      context: {
        userVision: profile?.vision || '',
        phase: profile?.currentPhase || 'foundation',
        opportunitiesCount: opportunities.length,
        decisionsLogged: decisions.length
      },
      framework: getAnalysisFramework(mode, question, profile, opportunities),
      timestamp: new Date().toISOString()
    };
    
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function getAnalysisFramework(mode, question, profile, opportunities) {
  const frameworks = {
    WHAT: {
      layer1: "What is the actual problem/opportunity beneath surface observations?",
      layer2: "What does the top 1% know that others don't?",
      layer3: "What are the non-obvious prerequisites to success here?",
      layer4: "What are the 80/20 leverage points?"
    },
    HOW: {
      capability: "How do I build capability systematically?",
      acceleration: "How do I reduce time-to-competence to 1/10th of normal?",
      avoidance: "How do I avoid the 90% failure patterns?",
      systems: "How do I create repeatable systems, not one-off wins?"
    },
    WHERE: {
      direction: "Where is the puck moving in the next 6-24 months?",
      inflection: "Where are the inflection points that create 10x opportunities?",
      positioning: "Where should I position myself now for 2029-2036 dominance?",
      asymmetry: "Where are asymmetric risk/reward ratios favoring the prepared?"
    },
    SYNTHESIS: {
      integration: "Integrating WHAT + HOW + WHERE perspectives",
      scenarios: "Multiple scenarios with decision trees",
      experiments: "Specific reversible experiments to run",
      alignment: "10-year vision alignment check"
    }
  };
  
  return frameworks[mode] || frameworks.WHAT;
}

// Serve root HTML for non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(join(__dirname, 'index.html'));
});

// ==================== SERVER START ====================

app.listen(PORT, () => {
  console.log(`\n🚀 ELITE.AI System running on http://localhost:${PORT}`);
  console.log('📊 Database: elite-ai.db');
  console.log('🎯 Ready for mastery-level operations\n');
});
