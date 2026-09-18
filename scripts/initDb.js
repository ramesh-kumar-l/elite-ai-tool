import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, '../elite-ai.db'));

const schema = `
-- User Profile & Vision
CREATE TABLE IF NOT EXISTS user_profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vision TEXT,
  currentPhase TEXT DEFAULT 'foundation',
  skills JSON DEFAULT '[]',
  goals JSON DEFAULT '[]',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME
);

-- Opportunity Intelligence Log
CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  sector TEXT,
  description TEXT,
  confidence REAL DEFAULT 0,
  stage TEXT DEFAULT 'identified',
  inflectionReadiness TEXT,
  skillAlignment REAL DEFAULT 0,
  marketTiming TEXT,
  sustainability TEXT,
  skills JSON DEFAULT '[]',
  metrics JSON DEFAULT '{}',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME,
  archivedAt DATETIME
);

-- Decision Architecture Log
CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  context TEXT,
  options JSON DEFAULT '[]',
  chosen TEXT,
  rationale TEXT,
  impacts JSON DEFAULT '{}',
  longTermScore REAL,
  reversibility REAL,
  optionalityCreated TEXT,
  outcome TEXT,
  learnings TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME
);

-- Learning Velocity Tracking
CREATE TABLE IF NOT EXISTS learning_log (
  id TEXT PRIMARY KEY,
  skill TEXT NOT NULL,
  domain TEXT,
  hoursInvested REAL DEFAULT 0,
  competenceLevel REAL DEFAULT 0,
  velocityScore REAL DEFAULT 0,
  practicalApplication TEXT,
  feedback TEXT,
  masterAt DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME
);

-- Quarterly Transformations
CREATE TABLE IF NOT EXISTS quarterly_reviews (
  id TEXT PRIMARY KEY,
  quarter INTEGER,
  year INTEGER,
  skillsAcquired JSON DEFAULT '[]',
  opportunitiesIdentified JSON DEFAULT '[]',
  decisionsLogged JSON DEFAULT '[]',
  marketPositionShifted TEXT,
  priorities JSON DEFAULT '[]',
  reflection TEXT,
  growthVelocity REAL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME
);

-- Domain Expertise Graph
CREATE TABLE IF NOT EXISTS domain_expertise (
  id TEXT PRIMARY KEY,
  domain TEXT NOT NULL,
  proficiencyLevel REAL DEFAULT 0,
  yearsOfExperience REAL DEFAULT 0,
  keyResources JSON DEFAULT '[]',
  achievements JSON DEFAULT '[]',
  connections TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME
);

-- Experiments & Tests
CREATE TABLE IF NOT EXISTS experiments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  hypothesis TEXT,
  duration INTEGER,
  status TEXT DEFAULT 'planned',
  reversible BOOLEAN DEFAULT 1,
  results TEXT,
  insights TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  completedAt DATETIME
);

-- Network & Connections
CREATE TABLE IF NOT EXISTS network (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT,
  relevance TEXT,
  connectionType TEXT,
  lastInteraction DATETIME,
  value TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Success Metrics Tracking
CREATE TABLE IF NOT EXISTS success_metrics (
  id TEXT PRIMARY KEY,
  year INTEGER,
  metricName TEXT,
  target REAL,
  current REAL,
  status TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_opportunities_sector ON opportunities(sector);
CREATE INDEX IF NOT EXISTS idx_decisions_created ON decisions(createdAt);
CREATE INDEX IF NOT EXISTS idx_learning_domain ON learning_log(domain);
CREATE INDEX IF NOT EXISTS idx_quarterly_year ON quarterly_reviews(year);
`;

db.serialize(() => {
  const statements = schema.split(';').filter(s => s.trim());
  statements.forEach(statement => {
    db.run(statement, (err) => {
      if (err) console.error('DB Error:', err);
    });
  });
  
  console.log('✅ Database initialized successfully');
  console.log('📊 Tables created:');
  console.log('  • user_profile');
  console.log('  • opportunities');
  console.log('  • decisions');
  console.log('  • learning_log');
  console.log('  • quarterly_reviews');
  console.log('  • domain_expertise');
  console.log('  • experiments');
  console.log('  • network');
  console.log('  • success_metrics');
  
  db.close();
});
