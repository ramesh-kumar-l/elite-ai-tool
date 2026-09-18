# ELITE.AI QUICK REFERENCE CARD

## 🚀 GETTING STARTED (< 10 MINUTES)

### Step 1: Install Node.js
https://nodejs.org/ (Choose LTS version)

### Step 2: Download Files
Extract all ELITE.AI system files to a folder

### Step 3: Open Terminal in That Folder

**Windows**: Shift+Right-Click → "Open PowerShell here"  
**Mac**: Cmd+Space → "Terminal" → drag folder to window  
**Linux**: Right-click → "Open in Terminal"

### Step 4: Run Setup
```bash
npm install
npm run db:init
npm start
```

### Step 5: Open Browser
```
http://localhost:3001
```

**✨ Done! You're now using ELITE.AI**

---

## 📊 DASHBOARD TOUR

### Main Sections
```
SIDEBAR (Left)              MAIN CONTENT (Center+Right)
├─ Dashboard        ───┐   ├─ 📊 Metrics (Top)
├─ Opportunities    ───┼─→ ├─ 🎯 Opportunity Matrix
├─ Decisions        ───┤   ├─ ⚡ Recent Decisions
├─ Learning         ───┤   └─ 📈 Growth Trends
└─ Analysis         ───┘
```

---

## 📋 CORE WORKFLOWS

### Adding an Opportunity
1. Click **Opportunities** tab
2. Click **+ New Opportunity**
3. Fill in:
   - Title (e.g., "AI Product Startup")
   - Sector (e.g., "Technology")
   - Description (1-2 sentences)
   - Confidence (0-100%, use slider)
   - Market Timing (e.g., "6 months")
4. Click **Create Opportunity**

### Logging a Decision
1. Click **Decisions** tab
2. Click **+ New Decision**
3. Fill in:
   - Title (e.g., "Career Direction")
   - Context (situation you were in)
   - Chosen (what you decided)
   - Rationale (why you chose it)
4. Click **Log Decision**

### Tracking Learning
1. Click **Learning** tab
2. Click **+ Log Learning**
3. Fill in:
   - Skill (e.g., "Prompt Engineering")
   - Domain (AI, Business, Personal)
   - Hours Invested (e.g., 5)
   - Competence (0-100%, use slider)
   - Application (how you used it)
4. Click **Log Learning**

### Running Analysis
1. Click **Analysis** tab
2. Choose mode:
   - **WHAT** = Strategic clarity
   - **HOW** = Execution roadmap
   - **WHERE** = Opportunity sensing
   - **SYNTHESIS** = Integrated view
3. Type your question/challenge
4. Click **Run [MODE] Analysis**

---

## 🎯 THE ELITE.AI FRAMEWORK

### Three Dimensions (Use Regularly)

**WHAT** (Strategic Clarity)
- What is the real problem?
- What do top performers know?
- What are the 80/20 leverage points?
- What are non-obvious prerequisites?

**HOW** (Execution Excellence)
- How do I build capability systematically?
- How do I reduce time-to-competence?
- How do I avoid 90% failure patterns?
- How do I create repeatable systems?

**WHERE** (Opportunity Sensing)
- Where is the puck moving (6-24 months)?
- Where are inflection points?
- Where should I position myself now?
- Where are asymmetric risk/reward ratios?

### SYNTHESIS (Integrated Decision)
Combines WHAT + HOW + WHERE + 10-year vision alignment

---

## 📈 QUARTERLY RITUAL (Every 3 Months)

Schedule a **2-hour reflection session**:

1. **Review Skills Acquired**
   - What competencies did you build?
   - What's your velocity? (skills/quarter)

2. **Assess Opportunities**
   - Which opportunities matured?
   - What new ones emerged?
   - Update confidence scores

3. **Analyze Decisions**
   - Which decisions played out positively?
   - What would you do differently?
   - Learnings for next quarter?

4. **Set Q-Next Priorities**
   - Top 3 focus areas
   - Key milestones
   - Learning targets

5. **Update Dashboard**
   - Reflect on growth trajectory
   - Adjust phase if appropriate
   - Reset mindset for next quarter

---

## 🎓 KEY METRICS TO TRACK

### Personal Mastery Velocity
```
Learning Velocity = Competence Gained / Hours Invested
Target: 0.8+ per quarter (80% competence gain per 100 hours)
```

### Opportunity Quality
```
Opportunity Confidence = (Inflection Readiness + Skill Alignment + Timing) / 3
Target: 0.7+ (70%+ confidence on opportunities you pursue)
```

### Decision Impact
```
Long-Term Score = How much does this compound in 10 years?
Target: 8+ for major decisions (1-10 scale)
```

### Portfolio Health
```
Active Opportunities = 5-10 (too many = scattered, too few = brittle)
Decisions Logged = 1-2 per quarter (major choices documented)
Learning Entries = 3-5 per month (consistent skill building)
```

---

## 🔄 WEEKLY HABIT LOOP

**Monday**: Review week ahead (0 min - just check priorities)  
**Daily**: Log any learning or quick insights (5 min)  
**Friday**: Quick reflection on week (10 min)  
**Monthly**: Deep review + opportunity assessment (30 min)

---

## 💡 ELITE.AI MINDSET PRINCIPLES

### 1. Optionality Over Optimization
- Don't put all chips on one path
- Create 3-5 parallel opportunity tracks
- Let the winner emerge with clarity

### 2. Reversibility as a Filter
- Prioritize reversible decisions
- If undoable, decide with 60% confidence
- If permanent, need 90%+ confidence

### 3. Compounding Over Heroics
- 1% improvement per week = 51x in 10 years
- 1% regression per week = 0.01x in 10 years
- Consistency > intensity

### 4. Leading Indicators > Lagging Indicators
- Don't track only outcomes
- Track behaviors: hours logged, decisions made, learning velocity
- Behaviors compound, outcomes follow

### 5. Asymmetric Risk-Taking
- Seek: Limited downside, unlimited upside
- Avoid: Unlimited downside, capped upside
- Example: Learn skills (low cost, high upside)

### 6. Signal Over Noise
- 99% of information is noise in AI era
- Intelligence = filtering signal
- Focus on WHAT/HOW/WHERE frameworks

---

## 🛠️ CUSTOMIZATION (Advanced)

### Change Accent Colors
Edit `public/index.html`, find CSS variables:
```css
--accent-cyan: #00d9ff       /* Primary color */
--accent-purple: #a855f7    /* Secondary color */
--accent-electric: #00ff88   /* Accent color */
```

### Change Server Port
Edit `server.js`:
```javascript
const PORT = 3001;  // Change this number
```

### Add Custom Database Fields
Edit `scripts/initDb.js` (add column to table)  
Restart: `npm run db:init` then `npm start`

---

## 🆘 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "Port 3001 already in use" | Change PORT in server.js to 3002 |
| "Cannot find module" | Run: `npm install` |
| "Database locked" | Close other instances, restart |
| "CORS error" | Verify frontend/backend on same server |
| "Blank page" | Check browser console (F12), reload |
| "Data not saving" | Check browser console for errors |

---

## 📱 MOBILE ACCESS (Advanced)

To access from phone on same network:

1. Get your computer's IP:
   - **Windows**: `ipconfig` (look for IPv4)
   - **Mac/Linux**: `ifconfig` (look for inet)
   
2. Replace `localhost`:
   ```
   http://[YOUR-IP]:3001
   ```

3. Phone must be on same WiFi

---

## 🎯 YEAR 1 MILESTONES

**Month 1: Foundation**
- [ ] Profile created with 10-year vision
- [ ] 5+ opportunities identified
- [ ] 10+ hours learning tracked

**Month 3: Acceleration**
- [ ] Q1 quarterly review complete
- [ ] 10+ decisions logged
- [ ] 30+ learning hours tracked

**Month 6: Momentum**
- [ ] Q2 quarterly review complete
- [ ] 1-2 opportunities in execution
- [ ] 60+ learning hours total

**Month 12: Mastery Foundation**
- [ ] Q3 + Q4 reviews complete
- [ ] Clear growth trajectory visible
- [ ] 100+ learning hours invested
- [ ] Top 1% path strategy refined

---

## 📞 GETTING HELP

1. **Check README.md** for installation guide
2. **Check ARCHITECTURE.md** for system details
3. **Browser console (F12)** for errors
4. **npm logs** for server issues

---

## 🚀 REMEMBER

This is a **tool for transformation**, not just data collection:

✅ **Do This**:
- Log consistently (even imperfect data beats no data)
- Review quarterly (compound understanding)
- Adjust based on patterns (continuous optimization)
- Trust the framework (WHAT/HOW/WHERE works)

❌ **Don't Do This**:
- Obsess over perfect data entry
- Skip the reflection process
- Chase every opportunity equally
- Ignore the quarterly synthesis

---

## 📊 ANNUAL CHECK-IN

**Every January 1st:**
1. Review 4 quarterly summaries
2. Assess 10-year vision progress
3. Update long-term roadmap
4. Set year-ahead focus
5. Reset with fresh energy

**Every January 2nd:**
Go back to work knowing you've got this.

---

**ELITE.AI v1.0**  
*For the AI-accelerated era (2026-2036)*  

**START TODAY. COMPOUND RELENTLESSLY. BECOME ELITE BY 2036.**
