# Panama Reborn - Development Branch

This branch contains the **NEW GAME** development.

## 🎮 What's Being Built

**Panama Reborn** - A co-op castle defense roguelite combining:
- Vampire Survivors (auto-firing weapons)
- Riftbreaker (real-time building)
- Balatro (RNG deck-building)
- X Hero Siege (castle defense objective)

## 📂 Project Structure

```
panama-reborn/          # NEW GAME (Phaser 3 + TypeScript + Vite)
├── src/                # Game source code
├── public/             # Assets (sprites, audio, maps)
└── package.json        # Dependencies (Phaser 3, Colyseus)

(Root directory still contains old Panama codebase for reference)
```

## 📖 Documentation

For complete game design, see the **analysis branch** (`claude/analyze-codebase-5Hh2K`):
- `FINAL_GAME_DESIGN.md` - Complete locked game design document
- `GAME_PLAN.md` - 13-phase development roadmap
- `DECISIONS_NEEDED.md` - Design decisions reference

## 🚀 Getting Started

```bash
cd panama-reborn
npm install
npm run dev
```

## 📋 Current Phase

**Phase 0: Project Setup (Week 1)**
- [x] Create Vite + TypeScript project
- [x] Install Phaser 3 + Colyseus
- [ ] Port isometric coordinate system
- [ ] Setup base scene architecture
- [ ] Create player movement prototype

## 🎯 Development Timeline

- **Weeks 1-2:** Core movement & weapons
- **Weeks 3-6:** Enemy spawning, castle defense, leveling
- **Weeks 7-10:** Building system, shop system
- **Weeks 11-13:** Multiplayer (Colyseus)
- **Weeks 14-20:** Content, polish, testing

**Total:** 20 weeks (5 months at hobby pace - 10 hrs/week)

---

**Status:** 🟢 Active Development
**Branch:** `claude/panama-reborn-dev`
**Start Date:** 2026-01-07
