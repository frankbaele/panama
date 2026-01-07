# 🚨 CRITICAL DECISIONS NEEDED BEFORE STARTING

You must answer these 8 questions before we write any code.

---

## **DECISION 1: Visual Perspective** 🎨

**Question:** Top-down or Isometric view?

**Option A: Top-Down** ⭐ RECOMMENDED
- Simpler to implement
- Better for reading dense combat
- Like Vampire Survivors
- Faster development

**Option B: Isometric**
- More visually interesting
- Can reuse coordinate math from old code
- More complex implementation
- Like current Panama

**👉 YOUR CHOICE:** _____________

---

## **DECISION 2: Multiplayer Scope** 🌐

**Question:** Single-player first, or multiplayer from start?

**Option A: Single-Player Only (MVP)** ⭐ RECOMMENDED
- 6-8 weeks development
- Simpler architecture
- Can add multiplayer later

**Option B: Co-op Multiplayer (2-4 Players)**
- 8-11 weeks development
- More replayability
- Requires Colyseus setup
- Server hosting costs

**Option C: Competitive**
- Not recommended for this game type

**👉 YOUR CHOICE:** _____________

---

## **DECISION 3: Art Resolution** 🎨

**Question:** What pixel art resolution?

**Option A: 16-bit Pixel Art (32x32 sprites)** ⭐ RECOMMENDED
- Fast to produce
- Small file sizes
- Nostalgic aesthetic
- Like Vampire Survivors

**Option B: 32-bit Pixel Art (64x64 sprites)**
- More detailed
- Longer to produce
- Larger files

**Game Canvas Resolution:**
- 800x600 (retro)
- 1280x720 (recommended) ⭐
- 1920x1080 (modern)

**👉 YOUR CHOICE:**
- Sprite size: _____________
- Canvas resolution: _____________

---

## **DECISION 4: Session Length** ⏱️

**Question:** How long should each run be?

**Options:**
- 15 minutes (fast, arcade-style)
- 20 minutes (balanced, like Vampire Survivors) ⭐ RECOMMENDED
- 30 minutes (epic, more base building)

**👉 YOUR CHOICE:** _____________ minutes

---

## **DECISION 5: Meta Progression** 🎮

**Question:** What unlocks between runs?

**Options:**
- ✅ Unlock new weapons permanently
- ✅ Unlock new modifiers/Jokers
- ✅ Unlock starting bonuses
- ✅ Skill tree with permanent upgrades
- ✅ All of the above ⭐ RECOMMENDED

**👉 YOUR CHOICE:** _____________

---

## **DECISION 6: Monetization** 💰

**Question:** How will you distribute/monetize?

**Option A: Free Web Game** ⭐ RECOMMENDED for MVP
- Host on GitHub Pages or itch.io
- Maximum reach
- No payment processing

**Option B: Premium ($5-15)**
- Steam or itch.io
- Revenue from sales
- Requires more polish

**Option C: Free-to-Play with Cosmetics**
- Larger player base
- Ongoing revenue
- More development work

**👉 YOUR CHOICE:** _____________

---

## **DECISION 7: Collision System** 🔧

**Question:** Port RVO2 crowd simulation from old code?

**Option A: Phaser Arcade Physics** ⭐ RECOMMENDED
- Built-in, fast, simple
- Good enough for most games
- AABB collision

**Option B: Port RVO2 from Old Codebase**
- Advanced crowd avoidance
- Smoother enemy movement with 100+ enemies
- More work to integrate

**👉 YOUR CHOICE:** _____________

---

## **DECISION 8: Development Approach** 🚀

**Question:** What's your development commitment?

**Options:**
- Full-time (40 hrs/week) → 6-8 weeks for MVP
- Part-time (20 hrs/week) → 12-16 weeks for MVP
- Hobby (10 hrs/week) → 3-4 months for MVP

**Team:**
- Solo developer
- 2-person team (halves timeline)
- Hiring contractors for art/sound

**👉 YOUR CHOICE:**
- Time commitment: _____________
- Team size: _____________

---

## 📋 QUICK DECISION TEMPLATE

Copy this and fill it out:

```
DECISION 1 - Perspective: [Top-down / Isometric]
DECISION 2 - Multiplayer: [Single-player / Co-op / Later]
DECISION 3 - Art Resolution: [16-bit (32x32) / 32-bit (64x64)]
DECISION 3b - Canvas: [800x600 / 1280x720 / 1920x1080]
DECISION 4 - Session Length: [15 / 20 / 30] minutes
DECISION 5 - Meta Progression: [Unlocks / Skill tree / All]
DECISION 6 - Monetization: [Free / Premium / F2P]
DECISION 7 - Collision: [Phaser Physics / RVO2]
DECISION 8 - Commitment: [Full-time / Part-time / Hobby]
DECISION 8b - Team: [Solo / 2-person / Contractors]
```

---

## 🎯 MY RECOMMENDATION (Fastest MVP):

```
DECISION 1 - Perspective: Top-down
DECISION 2 - Multiplayer: Single-player (add co-op later)
DECISION 3 - Art Resolution: 16-bit (32x32 sprites)
DECISION 3b - Canvas: 1280x720
DECISION 4 - Session Length: 20 minutes
DECISION 5 - Meta Progression: All (unlocks + upgrades)
DECISION 6 - Monetization: Free on itch.io/GitHub Pages
DECISION 7 - Collision: Phaser Arcade Physics
DECISION 8 - Commitment: Part-time (20 hrs/week)
DECISION 8b - Team: Solo with asset packs
```

**With these choices: 12-16 weeks to MVP (playable, fun game)**

---

## ✅ Once You've Decided:

1. Fill out the template above
2. Share your decisions
3. I'll create the project structure
4. We start Phase 0: Project Setup

**No code will be written until you make these decisions.** 🚀
