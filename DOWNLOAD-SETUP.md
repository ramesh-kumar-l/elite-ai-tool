# ELITE.AI DOWNLOAD & SETUP GUIDE

## 📥 WHAT YOU'RE DOWNLOADING

A **production-grade, full-stack personal mastery system** built with:

- **Backend**: Node.js + Express.js
- **Frontend**: React 18 (via CDN)
- **Database**: SQLite3 (local, persistent)
- **Design**: Futuristic dark theme with neon accents
- **Features**: 20+ API endpoints, 9 database tables, complete UI

**File Size**: ~50MB (including node_modules after setup)  
**Memory Usage**: ~150MB running  
**Disk Usage**: ~10MB for database (grows with use)

---

## 🔽 DOWNLOAD INSTRUCTIONS

### Option A: Git Clone (Easiest)
```bash
git clone https://github.com/yourusername/elite-ai-system.git
cd elite-ai-system
```

### Option B: Manual Download (From Artifact)
1. Download all files from the artifact
2. Extract to a folder (e.g., `C:\Users\YourName\elite-ai-system`)
3. Keep the folder structure intact

### Files Included:
```
elite-ai-system/
├── package.json                 ← Install dependencies from this
├── server.js                    ← Main backend server
├── README.md                    ← Installation guide
├── ARCHITECTURE.md              ← System design docs
├── QUICK-REFERENCE.md           ← Usage guide
├── START-ELITE.bat              ← Windows startup
├── start-elite.sh               ← Mac/Linux startup
├── .gitignore                   ← Git ignore patterns
├── scripts/
│   └── initDb.js               ← Database initialization
└── public/
    └── index.html              ← Frontend React app
```

---

## 🔧 SYSTEM REQUIREMENTS

### Minimum
- **OS**: Windows 7+, macOS 10.12+, or Linux
- **RAM**: 2GB
- **Disk**: 500MB free space
- **Internet**: Required for initial npm install

### Recommended
- **OS**: Windows 10+, macOS 12+, or Linux (Ubuntu 20+)
- **RAM**: 4GB+
- **Disk**: 1GB free space
- **Node.js**: v18.0.0 or higher

---

## ⚡ QUICK START (5 Steps)

### Step 1: Install Node.js
Download from https://nodejs.org/ (Choose LTS)

Verify:
```bash
node --version
npm --version
```

### Step 2: Navigate to Project Folder
```bash
cd /path/to/elite-ai-system
```

### Step 3: Install Dependencies
```bash
npm install
```
*(Wait 2-3 minutes for dependencies to install)*

### Step 4: Initialize Database
```bash
npm run db:init
```

You should see:
```
✅ Database initialized successfully
📊 Tables created:
  • user_profile
  • opportunities
  • decisions
  • learning_log
  • quarterly_reviews
  • domain_expertise
  • experiments
  • network
  • success_metrics
```

### Step 5: Start Server
```bash
npm start
```

You should see:
```
🚀 ELITE.AI System running on http://localhost:3001
📊 Database: elite-ai.db
🎯 Ready for mastery-level operations
```

### Step 6: Open in Browser
```
http://localhost:3001
```

✨ **WELCOME TO ELITE.AI!**

---

## 🪟 WINDOWS-SPECIFIC SETUP

### Using Command Line (Recommended)
1. Open PowerShell
2. Navigate to folder: `cd C:\path\to\elite-ai-system`
3. Run: `npm install`
4. Run: `npm run db:init`
5. Run: `npm start`

### Using Batch File (Easiest)
1. Right-click `START-ELITE.bat`
2. Select "Run as administrator"
3. Script handles everything automatically
4. Browser opens automatically

### Installing Node.js on Windows
1. Download from https://nodejs.org/
2. Run installer
3. Choose "Add to PATH" during installation
4. Restart PowerShell after installation

---

## 🍎 macOS-SPECIFIC SETUP

### Using Terminal
```bash
# 1. Navigate to folder
cd ~/path/to/elite-ai-system

# 2. Make script executable
chmod +x start-elite.sh

# 3. Run script
./start-elite.sh
```

### Using Homebrew (Recommended for Node.js)
```bash
# Install Homebrew first
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Then follow Quick Start steps above
```

### Troubleshooting on macOS
- **"Command not found: node"**: Restart Terminal after installing Node.js
- **"Permission denied"**: Run `chmod +x start-elite.sh`
- **M1/M2 Mac issues**: Use: `arch -arm64 brew install node`

---

## 🐧 Linux-Specific SETUP

### Ubuntu/Debian
```bash
# Update package manager
sudo apt update
sudo apt upgrade

# Install Node.js (v18+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Navigate to project
cd ~/elite-ai-system
chmod +x start-elite.sh
./start-elite.sh
```

### Fedora/RHEL
```bash
sudo dnf install nodejs npm
cd ~/elite-ai-system
chmod +x start-elite.sh
./start-elite.sh
```

### Arch Linux
```bash
sudo pacman -S nodejs npm
cd ~/elite-ai-system
chmod +x start-elite.sh
./start-elite.sh
```

---

## ✅ FIRST LAUNCH CHECKLIST

After starting the server:

- [ ] Browser opened to http://localhost:3001
- [ ] Page shows "Dashboard" with ELITE.AI header
- [ ] Sidebar shows 5 navigation options
- [ ] Database initialized (no errors in terminal)
- [ ] Can click on different tabs without errors

If any checkbox fails:
1. Check **Troubleshooting** section below
2. Review browser console (F12 → Console tab)
3. Check terminal/PowerShell for error messages

---

## 🐛 TROUBLESHOOTING

### "node: command not found"
**Cause**: Node.js not in system PATH  
**Solution**:
1. Reinstall Node.js from https://nodejs.org/
2. During installation, ensure "Add to PATH" is checked
3. Restart terminal/PowerShell

### "npm: command not found"
**Solution**: npm comes with Node.js. Reinstall Node.js.

### "Module not found: sqlite3"
**Cause**: Dependencies not installed  
**Solution**:
```bash
npm install
npm install sqlite3
```

### "Port 3001 already in use"
**Cause**: Another process using the port  
**Solution** (Windows):
```bash
# Find process using port 3001
netstat -ano | findstr :3001
# Kill it (replace XXXX with PID)
taskkill /PID XXXX /F
```

**Solution** (Mac/Linux):
```bash
lsof -ti:3001 | xargs kill -9
```

Or change the port in `server.js`:
```javascript
const PORT = 3002;  // Use 3002, 3003, etc.
```

### "Database locked" or "SQLITE_LOCKED"
**Cause**: Database file being accessed elsewhere  
**Solution**:
1. Close all ELITE.AI instances
2. Wait 5 seconds
3. Restart: `npm start`
4. Delete `elite-ai.db-wal` and `elite-ai.db-shm` if they exist

### Browser shows blank page
**Solution**:
1. Refresh (Cmd+R or Ctrl+R)
2. Open console (F12)
3. Check for red errors
4. Try Chrome/Edge instead of Safari

### "Cannot GET /"
**Cause**: Server running but frontend not found  
**Solution**:
1. Verify `public/index.html` exists
2. Check server.js has: `app.use(express.static(join(__dirname, 'public')))`
3. Restart server

### "CORS error" or "blocked by CORS policy"
**Cause**: Frontend and backend on different origins  
**Solution**:
1. Ensure both running on `http://localhost:3001`
2. Frontend should NOT be on different port
3. If needed, edit server.js CORS settings

### Server crashes immediately
**Check**:
1. Are you in the right directory?
2. Does `package.json` exist there?
3. Run `npm install` again
4. Check for syntax errors in `.js` files

---

## 🔄 DAILY WORKFLOW

### Start Session
```bash
# Navigate to folder and run:
npm start

# Or on Windows, double-click START-ELITE.bat
```

### Use ELITE.AI
1. Open http://localhost:3001
2. Navigate to Dashboard
3. Work through your tabs (Opportunities, Decisions, etc.)
4. Log activities
5. Run analysis when needed

### End Session
1. Simply close terminal/PowerShell (or browser)
2. Data automatically saved to SQLite database
3. Next session, data persists

### Stop the Server
- Press **Ctrl+C** in terminal/PowerShell
- Or close the terminal window

---

## 💾 BACKUP YOUR DATA

### Daily Backup (Recommended)
```bash
# Simple copy to OneDrive/Google Drive/Dropbox
cp elite-ai.db ~/OneDrive/Backups/

# Or Mac/Linux
cp elite-ai.db ~/Google\ Drive/elite-ai-backup/
```

### Backup Entire System
```bash
# Create backup zip
zip -r elite-ai-backup-2026-01.zip ./

# Move to cloud storage
mv elite-ai-backup-2026-01.zip ~/Google\ Drive/Backups/
```

### Restore from Backup
```bash
# Replace database with backup
cp ~/Backups/elite-ai.db.backup ./elite-ai.db
npm start
```

---

## 🔐 DATA PRIVACY

✅ **Your data is completely private**:
- Database stays on your PC
- No cloud uploads
- No tracking
- No external APIs required
- No authentication/login system

⚠️ **Important**:
- Backup regularly (external drive, cloud)
- Database file is unencrypted (OK for local use)
- If hosting on internet, add authentication first

---

## 📊 NEXT STEPS AFTER INSTALLATION

1. **First 15 minutes**: Set up your profile
   - Click "Dashboard"
   - Define your 10-year vision
   - Set current phase

2. **First hour**: Populate initial data
   - Add 3-5 opportunities
   - Log current skills
   - Document 1-2 past major decisions

3. **First week**: Establish rhythm
   - Log learning 3-5 times
   - Run 1-2 analyses
   - Feel the system's flow

4. **First month**: Build consistency
   - Daily: Log learning/insights (5 min)
   - Weekly: Review/update (15 min)
   - Monthly: Deep reflection (30 min)

---

## 🎯 SUCCESS CRITERIA

You'll know it's working when:

- ✅ Data persists between sessions
- ✅ You use it at least 3x per week
- ✅ Opportunities and decisions accumulate
- ✅ You can see learning velocity trends
- ✅ Quarterly reviews show compound growth

---

## 📞 GETTING MORE HELP

1. **README.md** - Full installation guide
2. **ARCHITECTURE.md** - Technical details  
3. **QUICK-REFERENCE.md** - Usage patterns
4. **Browser Console** (F12) - Error messages
5. **Terminal Output** - Server logs

---

## 🚀 YOU'RE READY!

Everything you need is included. No hidden dependencies, no cloud requirements, no subscriptions.

This is your system for the next 10 years of growth.

**Use it consistently. Compound relentlessly. Become elite by 2036.**

---

**ELITE.AI v1.0**  
*Personal Mastery System for the AI Era*

Questions? Run `npm start` and start using it.  
The best documentation is using the tool itself.

**👉 Next Step: Run the Quick Start above, then go to http://localhost:3001**
