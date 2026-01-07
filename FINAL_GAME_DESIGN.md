# Panama Reborn - Final Game Design Document
## Co-op Castle Defense Roguelite

**Version:** 1.0
**Date:** 2026-01-07
**Status:** CONFIRMED - Ready for Development

---

## 🎯 GAME CONCEPT

**Elevator Pitch:**
A 2-4 player co-op roguelite where you defend a castle from waves of enemies using auto-firing weapons (Vampire Survivors style) while building towers in real-time (Riftbreaker style), with RNG deck-building progression (Balatro style), inspired by the X Hero Siege castle defense format.

**Genre:** Action Roguelite / Tower Defense Hybrid / Co-op Multiplayer

**Platform:** PC (Desktop) - Windows/Mac/Linux via Steam/itch.io

**Target Price:** $10-15 USD

**Session Length:** 25 minutes per run

**Players:** 2-4 players (co-op)

---

## ⚡ CORE PILLARS

### 1. **Pure Auto-Combat (Vampire Survivors)**
- Weapons fire automatically at nearest enemy
- Player focuses 100% on positioning and dodging
- No manual aiming, no active abilities
- Skill is in movement and weapon selection

### 2. **Real-Time Building (Riftbreaker)**
- Place towers and walls DURING combat
- Risk/reward: stop dodging to build or keep moving?
- Towers supplement player firepower
- Resources drop from enemies

### 3. **RNG Deck Building (Balatro)**
- Build a "deck" of unlocked weapons/towers
- Shop appears every few waves
- Choose 1 of 3 random options from your deck
- Reroll system for gold
- Hunt for synergies and "Joker" modifiers

### 4. **Castle Defense (X Hero Siege)**
- Central castle must survive
- Enemies attack both players AND castle
- Shared objective creates teamwork
- Game over if castle dies

### 5. **Co-op Focused**
- 2-4 players required
- Shared castle HP
- Individual weapon loadouts
- Communication and positioning matter

---

## 🎮 GAMEPLAY MECHANICS

### **Player Character**

**Single Character Type:**
- Everyone plays the same character (no classes)
- Simple sprite: humanoid with weapon
- Isometric view (like original Panama)

**Movement:**
- WASD keys for 8-directional movement
- Speed: 200 pixels/second (base)
- Collision with walls/buildings
- Dash ability (Space key, 5-second cooldown)

**Stats:**
- Health: 100 (base)
- Movement Speed: 200 (base)
- No strength/agility/intelligence
- Stats increased through passive upgrades only

---

### **Weapon System (Auto-Fire)**

**Core Concept:**
```typescript
// Weapons fire automatically at nearest enemy
// Player switches weapons but doesn't aim
player.weapons = [
  { slot: 1, weapon: 'Minigun', active: true },
  { slot: 2, weapon: 'Railgun', active: false },
  { slot: 3, weapon: null, active: false },
  { slot: 4, weapon: null, active: false },
  { slot: 5, weapon: null, active: false },
  { slot: 6, weapon: null, active: false }
];
```

**Weapon Slots:**
- Start with 1 weapon slot (Minigun)
- Unlock up to 6 slots through upgrades
- Press 1-6 to switch active weapon
- Only active weapon fires

**Weapon Types (50+ total):**

**Basic Weapons:**
- **Minigun:** High fire rate, low damage, short range
- **Shotgun:** Spread pattern, close range, high damage
- **Railgun:** Pierces all enemies, high damage, slow fire rate
- **Flamethrower:** Cone AoE, burning DoT effect
- **Rocket Launcher:** AoE explosion, slow fire rate

**Advanced Weapons:**
- **Lightning Gun:** Chains to 3-5 enemies
- **Laser Beam:** Continuous damage beam
- **Boomerang:** Returns after hitting, pierce
- **Drone Swarm:** Orbiting projectiles
- **Black Hole Gun:** Sucks enemies in, explodes

**Legendary Weapons:**
- **The Annihilator:** Massive damage, screen-clear
- **Time Warp Gun:** Slows enemies in radius
- **Nuke Launcher:** Entire-screen AoE

**Weapon Stats:**
```typescript
interface WeaponData {
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  fireRate: number;        // Shots per second
  damage: number;          // Damage per shot
  range: number;           // Auto-target range
  projectileSpeed: number; // Bullet speed
  pierce: number;          // Enemies pierced (0 = none, -1 = infinite)
  projectileCount: number; // Bullets per shot
  spread: number;          // Angle spread in degrees
  special?: WeaponSpecial; // AoE, Chain, Bounce, etc.
}
```

**Auto-Fire Logic:**
```typescript
update(time: number, delta: number) {
  if (time > this.nextFireTime) {
    const nearestEnemy = this.findNearestEnemy(this.weapon.range);
    if (nearestEnemy) {
      this.fireWeapon(nearestEnemy);
      this.nextFireTime = time + (1000 / this.weapon.fireRate);
    }
  }
}
```

---

### **Building System**

**Placement:**
- Press **B** to enter build mode
- Hover over grid, green = valid, red = invalid
- Click to place
- Costs gold (deducted immediately)
- Buildings appear instantly

**Building Types:**

**Towers (Auto-firing defenses):**
```typescript
towers = [
  {
    name: 'Gun Tower',
    cost: 150,
    damage: 10,
    fireRate: 2,
    range: 400,
    description: 'Basic auto-firing tower'
  },
  {
    name: 'Laser Tower',
    cost: 300,
    damage: 25,
    fireRate: 1,
    range: 500,
    pierces: true
  },
  {
    name: 'Flamer Tower',
    cost: 250,
    damage: 5,
    fireRate: 10,
    range: 200,
    aoe: true,
    dot: 3
  },
  {
    name: 'Artillery Tower',
    cost: 500,
    damage: 100,
    fireRate: 0.5,
    range: 700,
    aoe: 300
  }
];
```

**Walls (Blocking structures):**
```typescript
walls = [
  {
    name: 'Wooden Wall',
    cost: 50,
    health: 300,
    blocksPath: true
  },
  {
    name: 'Stone Wall',
    cost: 100,
    health: 800,
    blocksPath: true
  }
];
```

**Extractors (Resource generation):**
```typescript
extractors = [
  {
    name: 'Gold Mine',
    cost: 200,
    generates: 10, // gold per second
    placementRule: 'on resource node'
  }
];
```

**Grid System:**
- Isometric grid (32x32 tile size in world space)
- Grid size: 60x60 tiles
- Pathfinding updates when walls placed
- Towers placed anywhere
- Walls affect enemy pathfinding

---

### **Castle System**

**Central Objective:**
- Castle spawns in center of map
- Castle has HP: 5000 (shared by all players)
- Enemies that reach castle attack it (10-50 damage per hit)
- If castle HP reaches 0 = Game Over
- Castle HP bar displayed on screen

**Castle Zones:**
- Safe zone around castle (enemies can't spawn there)
- Recommended building area (walls form perimeter)

---

### **Enemy System**

**Enemy Behavior:**
- Spawn at edges of map
- Pathfind toward castle OR nearest player
- 70% attack castle, 30% attack nearest player
- Use A* pathfinding (updated when walls built)
- Navigate around obstacles

**Enemy Types (20+ total):**

**Basic Enemies:**
```typescript
enemies = [
  {
    name: 'Zombie',
    health: 50,
    speed: 60,
    damage: 10,
    goldDrop: 5,
    xpDrop: 10
  },
  {
    name: 'Fast Runner',
    health: 30,
    speed: 120,
    damage: 5,
    goldDrop: 3,
    xpDrop: 8
  },
  {
    name: 'Tank',
    health: 300,
    speed: 40,
    damage: 30,
    goldDrop: 20,
    xpDrop: 50
  }
];
```

**Special Enemies:**
- **Flyer:** Ignores walls, flies over
- **Teleporter:** Blinks forward every 3 seconds
- **Splitter:** Splits into 2 smaller enemies on death
- **Shielded:** Takes 50% reduced damage from front
- **Healer:** Heals nearby enemies

**Boss Enemies (every 5 waves):**
- **Giant:** 10,000 HP, spawns minions
- **Dragon:** 8,000 HP, breathes fire AoE
- **Necromancer:** 6,000 HP, resurrects dead enemies

---

### **Wave System**

**Wave Structure:**
```typescript
waves = [
  {
    wave: 1,
    enemyCount: 50,
    types: ['Zombie'],
    duration: 120,
    healthMultiplier: 1.0
  },
  {
    wave: 2,
    enemyCount: 75,
    types: ['Zombie', 'Fast Runner'],
    duration: 120,
    healthMultiplier: 1.1
  },
  {
    wave: 5,
    enemyCount: 150,
    types: ['Zombie', 'Fast Runner', 'Tank', 'BOSS: Giant'],
    duration: 180,
    healthMultiplier: 1.5
  }
  // ... up to wave 20
];
```

**Difficulty Scaling:**
- Enemy count increases: +25 per wave
- Enemy health multiplier: +10% per wave
- Enemy speed: +5% per 5 waves
- Boss every 5 waves (5, 10, 15, 20)
- Wave 20 = final boss + victory

**Between Waves:**
- 30 second break between waves
- Shop appears every 5 waves (5, 10, 15)
- Players can build freely
- Castle HP regenerates 10% during break

---

### **XP & Leveling System**

**Experience:**
- Enemies drop XP gems (small: 5, medium: 10, large: 25)
- Gems attracted to player when within 50 pixels
- All players share XP (picking up 1 gem = everyone gets XP)

**Level-Up:**
- Level 1 → 2: 100 XP
- XP required scales: `100 * (1.5 ^ level)`
- Max level per run: ~30

**Level-Up Screen:**
- Game pauses
- Choose 1 of 3 random upgrades
- Upgrades are passive (no active abilities)

**Passive Upgrades (50+ total):**
```typescript
upgrades = [
  // Weapon upgrades
  { name: '+15% Fire Rate', effect: 'fireRate *= 1.15' },
  { name: '+20% Damage', effect: 'damage *= 1.20' },
  { name: '+1 Projectile', effect: 'projectileCount += 1' },
  { name: '+50% Range', effect: 'range *= 1.5' },
  { name: 'Pierce +1', effect: 'pierce += 1' },

  // Movement upgrades
  { name: '+10% Movement Speed', effect: 'speed *= 1.10' },
  { name: 'Dash Cooldown -1s', effect: 'dashCD -= 1' },

  // Survival upgrades
  { name: '+50 Max Health', effect: 'maxHealth += 50' },
  { name: 'Heal 50 HP', effect: 'health += 50' },
  { name: '+20% XP Gain', effect: 'xpMultiplier *= 1.20' },

  // Building upgrades
  { name: 'Towers 20% Cheaper', effect: 'towerCost *= 0.8' },
  { name: 'Towers +25% Damage', effect: 'towerDamage *= 1.25' },

  // Utility
  { name: 'Unlock Weapon Slot', effect: 'weaponSlots += 1' },
  { name: '+50% Gold Drops', effect: 'goldMultiplier *= 1.5' },
];
```

**Upgrade Rarity:**
- 70% Common
- 25% Uncommon
- 5% Rare

---

### **Shop System (Balatro-Style)**

**Shop Triggers:**
- Opens after waves 5, 10, 15
- Lasts 60 seconds (countdown timer)
- Game pauses, UI overlay appears

**Shop Mechanics:**
```typescript
shop = {
  options: 3, // Show 3 items at a time
  rerollCost: 100, // Gold cost to reroll
  rerollIncrease: 1.5, // Cost multiplies each reroll

  generateOptions() {
    // Select 3 random items from player's unlocked deck
    const pool = this.playerDeck.getAllUnlocked();
    return this.weightedRandom(pool, 3);
  },

  reroll() {
    if (this.player.gold >= this.rerollCost) {
      this.player.gold -= this.rerollCost;
      this.rerollCost = Math.floor(this.rerollCost * 1.5);
      this.generateOptions();
    }
  }
};
```

**Shop Items:**
- **Weapons:** Add new weapon to inventory
- **Towers:** Unlock new tower type
- **Joker Modifiers:** Rare game-changers
- **Consumables:** Instant heal, gold boosts

**Pricing:**
- Common weapons: 100-200g
- Uncommon weapons: 300-500g
- Rare weapons: 600-1000g
- Towers: 200-400g
- Joker modifiers: 1000-2000g

---

### **Joker Modifier System (Balatro Core)**

**What are Jokers?**
- Rare passive modifiers that fundamentally change gameplay
- Only 1-3 Jokers active per run
- Permanent for the run once acquired
- Stack with each other (can create broken combos)

**Joker Examples (15+ total):**
```typescript
jokers = [
  {
    name: 'Double Shot',
    rarity: 'legendary',
    effect: 'All weapons fire 2 projectiles instead of 1',
    cost: 1500
  },
  {
    name: 'Chain Lightning',
    rarity: 'legendary',
    effect: 'Every 10th shot chains to 5 enemies',
    cost: 1200
  },
  {
    name: 'Overkill',
    rarity: 'rare',
    effect: 'Excess damage spreads to nearby enemies (50%)',
    cost: 1000
  },
  {
    name: 'Midas Touch',
    rarity: 'rare',
    effect: 'Enemies drop 2x gold',
    cost: 800
  },
  {
    name: 'Rapid Fire',
    rarity: 'legendary',
    effect: '+100% fire rate for all weapons',
    cost: 1500
  },
  {
    name: 'Berserker',
    rarity: 'rare',
    effect: 'Damage increases 10% per 100 HP lost',
    cost: 900
  },
  {
    name: 'Fortress Builder',
    rarity: 'uncommon',
    effect: 'Towers cost 50% less, +50% tower range',
    cost: 600
  },
  {
    name: 'XP Magnet',
    rarity: 'uncommon',
    effect: 'XP gems attracted from 3x distance',
    cost: 500
  },
  {
    name: 'Homing Bullets',
    rarity: 'rare',
    effect: 'All projectiles home toward enemies',
    cost: 1100
  }
];
```

**Joker Acquisition:**
- Appears in shop (5% chance to appear)
- Dropped by bosses (guaranteed 1 per boss)
- Random event (rare)

**Joker Synergies:**
- "Double Shot" + "Rapid Fire" = 4x projectiles per second!
- "Overkill" + "Chain Lightning" = Cascading damage
- "Midas Touch" + "Fortress Builder" = Economy engine

---

### **Deck System**

**What is the Deck?**
- Collection of ALL unlocked weapons, towers, and Jokers
- Shop pulls from YOUR deck only
- Deck grows through meta progression
- Start with ~10 items, grow to 100+

**Starting Deck:**
```typescript
starterDeck = {
  weapons: ['Minigun', 'Shotgun', 'Railgun'],
  towers: ['Gun Tower', 'Wall'],
  jokers: [] // Unlocked later
};
```

**Expanded Deck (after 50 runs):**
```typescript
expandedDeck = {
  weapons: [50+ weapons unlocked],
  towers: [15+ tower types],
  jokers: [10+ Jokers]
};
```

**Deck Building Strategy:**
- Unlock weapons that synergize
- Avoid diluting deck with weak items
- Some items are "must-unlocks" for combos

---

### **Meta Progression**

**Between-Run Currency:**
- **Rift Crystals:** Earned from completed runs
- Amount based on: waves cleared, enemies killed, castle HP remaining

**Rift Crystal Rewards:**
```typescript
runRewards = {
  wavesClearedBonus: wavesCleared * 50,
  enemiesKilledBonus: enemiesKilled * 2,
  castleHPBonus: (castleHP / maxCastleHP) * 500,
  victoryBonus: victory ? 1000 : 0,
  total: sum(all bonuses)
};
```

**Meta Unlocks (Permanent):**
```typescript
unlocks = [
  // Weapons (add to deck)
  { name: 'Laser Gun', cost: 200, type: 'weapon' },
  { name: 'Lightning Gun', cost: 500, type: 'weapon' },
  { name: 'Black Hole Gun', cost: 1000, type: 'weapon' },

  // Towers
  { name: 'Laser Tower', cost: 300, type: 'tower' },
  { name: 'Artillery Tower', cost: 600, type: 'tower' },

  // Jokers
  { name: 'Joker: Double Shot', cost: 1500, type: 'joker' },
  { name: 'Joker: Chain Lightning', cost: 1200, type: 'joker' },

  // Starting bonuses
  { name: 'Start with +100 Gold', cost: 500, type: 'meta' },
  { name: 'Start with +20% Damage', cost: 800, type: 'meta' },
  { name: 'Unlock 2nd Weapon Slot', cost: 1000, type: 'meta' }
];
```

**Progression Curve:**
- First unlock: 200 crystals (1 failed run)
- Mid-game unlocks: 500-1000 crystals (2-3 runs)
- Late unlocks: 1500+ crystals (5-10 runs)
- All unlocks: ~100 runs

---

## 🌐 MULTIPLAYER ARCHITECTURE

### **Colyseus Server**

**Tech Stack:**
- Colyseus 0.15+ (Node.js multiplayer framework)
- WebSocket communication
- Authoritative server (server validates all actions)

**Room Structure:**
```typescript
class GameRoom extends Room<GameState> {
  maxClients = 4;

  onCreate() {
    this.setState(new GameState());
    this.setSimulationInterval(dt => this.update(dt), 1000 / 60); // 60 FPS
  }

  onJoin(client: Client) {
    const player = new Player(client.sessionId);
    this.state.players.set(client.sessionId, player);
  }

  onMessage(client: Client, message: any) {
    switch(message.type) {
      case 'move':
        this.handlePlayerMove(client.sessionId, message.data);
        break;
      case 'build':
        this.handleBuildPlacement(client.sessionId, message.data);
        break;
      case 'shop':
        this.handleShopPurchase(client.sessionId, message.data);
        break;
    }
  }
}
```

**State Schema:**
```typescript
class Player extends Schema {
  @type('number') x: number;
  @type('number') y: number;
  @type('number') health: number;
  @type('number') gold: number;
  @type('number') xp: number;
  @type('number') level: number;
  @type(['string']) weapons: ArraySchema<string>;
}

class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type({ map: Enemy }) enemies = new MapSchema<Enemy>();
  @type({ map: Building }) buildings = new MapSchema<Building>();
  @type('number') castleHP: number;
  @type('number') currentWave: number;
}
```

**Client Prediction:**
- Player movement predicted locally (instant feel)
- Server reconciles position every tick
- Interpolation for other players (smooth)

**Latency Handling:**
- Client-side prediction for own player
- Server authority for combat/spawning
- Lag compensation for hit detection

---

## 🎨 ART & VISUAL STYLE

### **Art Style**

**Pixel Art (32-bit):**
- Sprite size: 64x64 for characters, 32x32 for projectiles
- Color palette: Dark fantasy (greys, reds, purples)
- Animation: 4-8 frames per action

**Perspective:**
- Isometric (45° rotation)
- Grid-based (32x32 world tiles)
- Camera follows player group center

### **Resolution & UI**

**Canvas:**
- 1920x1080 (Full HD)
- Locked aspect ratio
- Scalable for different monitors

**UI Elements:**
- Health bar (top-left)
- Gold counter (top-right)
- Wave counter (top-center)
- Castle HP bar (bottom-center)
- Weapon slots (bottom-left)
- Active Jokers (bottom-right)
- Minimap (top-right corner)

### **Visual Effects**

**Particles:**
- Muzzle flashes (weapon fire)
- Hit sparks (damage dealt)
- XP gem sparkles
- Explosion effects (AoE)
- Level-up burst

**Screen Effects:**
- Screen shake on explosions
- Slow-motion on boss death (0.3x for 0.5s)
- Flash on player hit (red tint)
- Freeze frame on victory

---

## 🎵 AUDIO DESIGN

### **Sound Effects**

**Weapon Sounds:**
- Each weapon has unique fire sound
- Impact sounds vary by enemy type
- Metallic clinks for projectiles

**Enemy Sounds:**
- Growls/roars on spawn
- Death sounds
- Boss-specific audio cues

**UI Sounds:**
- XP gem pickup (satisfying "ding")
- Level-up fanfare
- Shop open/close
- Purchase confirmation
- Reroll button click

**Ambient:**
- Wind howling
- Castle creaking
- Distant thunder

### **Music**

**Tracks:**
- Main menu theme (epic orchestral)
- Early waves (tense but manageable)
- Mid waves (intensity increases)
- Boss waves (full orchestral assault)
- Victory theme (triumphant)
- Defeat theme (somber)

**Dynamic Music:**
- Layers add as wave progresses
- Boss music overrides normal track
- Smooth transitions between intensity levels

---

## 🕹️ CONTROLS

### **Keyboard**

```
WASD - Move character (8 directions)
Space - Dash (5s cooldown)

1-6 - Switch active weapon
B - Enter build mode (place tower)
V - Enter build mode (place wall)

Mouse - Aim build placement (in build mode)
Left Click - Confirm building placement

ESC - Pause menu
Tab - Show stats screen
```

### **Gamepad (Optional)**

```
Left Stick - Move
Right Stick - Build placement cursor
A Button - Dash
B Button - Cancel/Back
X Button - Place tower
Y Button - Place wall
D-Pad - Switch weapons
Start - Pause
```

---

## 📊 TECHNICAL SPECIFICATIONS

### **Development Stack**

**Frontend:**
- Phaser 3.80+
- TypeScript 5.3+
- Vite 5+ (build tool)
- Modern ES6+ JavaScript

**Backend:**
- Node.js 18+
- Colyseus 0.15+
- Express 4.18+
- TypeScript 5.3+

**Deployment:**
- Frontend: Vercel / Netlify / GitHub Pages
- Backend: DigitalOcean / AWS / Heroku
- Database: MongoDB (for leaderboards/saves)

### **Performance Targets**

**Client:**
- 60 FPS constant (1920x1080)
- Support 500+ enemies on screen
- Support 1000+ projectiles active
- < 100ms input lag
- < 50MB bundle size

**Server:**
- Support 4 players per room
- 60 tick rate
- < 50ms server-side processing per tick
- Handle 100+ concurrent rooms (400 players)

### **File Structure**

```
panama-reborn/
├── client/                    # Phaser 3 frontend
│   ├── public/
│   │   └── assets/
│   │       ├── sprites/
│   │       ├── audio/
│   │       └── maps/
│   ├── src/
│   │   ├── main.ts
│   │   ├── config.ts
│   │   ├── scenes/
│   │   │   ├── BootScene.ts
│   │   │   ├── PreloadScene.ts
│   │   │   ├── MenuScene.ts
│   │   │   ├── LobbyScene.ts
│   │   │   ├── GameScene.ts
│   │   │   ├── LevelUpScene.ts
│   │   │   ├── ShopScene.ts
│   │   │   └── GameOverScene.ts
│   │   ├── gameobjects/
│   │   │   ├── Player.ts
│   │   │   ├── Enemy.ts
│   │   │   ├── Projectile.ts
│   │   │   ├── Tower.ts
│   │   │   ├── Wall.ts
│   │   │   └── Castle.ts
│   │   ├── components/
│   │   │   ├── HealthComponent.ts
│   │   │   ├── WeaponComponent.ts
│   │   │   └── MovementComponent.ts
│   │   ├── systems/
│   │   │   ├── WeaponSystem.ts
│   │   │   ├── WaveSpawner.ts
│   │   │   ├── PathfindingSystem.ts
│   │   │   ├── BuildingSystem.ts
│   │   │   ├── ShopSystem.ts
│   │   │   ├── DeckSystem.ts
│   │   │   └── ResourceSystem.ts
│   │   ├── multiplayer/
│   │   │   ├── ColyseusClient.ts
│   │   │   └── NetworkSync.ts
│   │   ├── data/
│   │   │   ├── weapons.ts
│   │   │   ├── enemies.ts
│   │   │   ├── towers.ts
│   │   │   ├── upgrades.ts
│   │   │   └── jokers.ts
│   │   └── utils/
│   │       ├── coordinates.ts      # Ported from old codebase
│   │       ├── pathfinding.ts
│   │       └── collision.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                    # Colyseus backend
│   ├── src/
│   │   ├── index.ts
│   │   ├── rooms/
│   │   │   └── GameRoom.ts
│   │   ├── schema/
│   │   │   └── GameState.ts
│   │   └── logic/
│   │       ├── CombatLogic.ts
│   │       ├── WaveLogic.ts
│   │       └── ShopLogic.ts
│   ├── package.json
│   └── tsconfig.json
├── shared/                    # Shared types/constants
│   └── types.ts
└── README.md
```

---

## 📈 DEVELOPMENT ROADMAP

### **Phase 0: Setup (Week 1)**
- Create Phaser 3 + Vite + TypeScript project
- Setup Colyseus server
- Port isometric coordinate system
- Create base scene structure
- Setup git workflow

### **Phase 1: Core Movement (Week 2)**
- Player character with WASD movement
- Isometric rendering
- Camera follow
- Basic collision
- Dash ability

### **Phase 2: Auto-Weapons (Week 3)**
- Weapon system architecture
- 3 basic weapons (Minigun, Shotgun, Railgun)
- Auto-fire logic
- Projectile pooling
- Weapon switching

### **Phase 3: Enemy Spawning (Week 4)**
- Basic enemy (Zombie)
- Pathfinding toward castle
- Wave spawner
- Enemy pooling
- Enemy death + XP drops

### **Phase 4: Castle Defense (Week 5)**
- Castle object in center
- Castle HP system
- Enemies attack castle
- Game over on castle death

### **Phase 5: XP & Leveling (Week 6)**
- XP gem collection
- Level-up system
- Passive upgrade pool (10 upgrades)
- Level-up UI overlay

### **Phase 6: Building System (Week 7-8)**
- Grid-based placement
- Tower placement (Gun Tower)
- Wall placement
- Resource cost system
- Pathfinding updates with walls

### **Phase 7: Shop System (Week 9-10)**
- Shop UI overlay
- RNG item generation from deck
- Purchase logic
- Reroll system
- Gold economy balancing

### **Phase 8: Multiplayer (Week 11-13)**
- Colyseus room setup
- Player state sync
- Movement sync with prediction
- Enemy sync
- Building sync
- Shop sync

### **Phase 9: Content Expansion (Week 14-15)**
- Expand to 20 weapons
- Expand to 10 enemy types
- Expand to 5 tower types
- Add 10 Joker modifiers
- Add 30 passive upgrades

### **Phase 10: Boss Waves (Week 16)**
- 3 boss types
- Boss abilities
- Boss HP bars
- Victory condition (wave 20)

### **Phase 11: Meta Progression (Week 17)**
- Rift Crystal currency
- Unlock system
- Meta upgrade tree
- Save/load system

### **Phase 12: Polish (Week 18-19)**
- Particle effects
- Sound design
- Music integration
- UI polish
- Screen shake/effects
- Damage numbers

### **Phase 13: Testing & Balancing (Week 20)**
- Performance testing (500+ enemies)
- Multiplayer latency testing
- Weapon balance
- Economy balance
- Bug fixing

**Total Timeline: 20 weeks (5 months at hobby pace - 10 hrs/week)**

---

## 🎯 SUCCESS METRICS

### **MVP Criteria (Phase 0-8):**
- ✅ 2-4 players can connect via Colyseus
- ✅ Players can move and dash
- ✅ 3 weapons auto-fire
- ✅ Enemies spawn and attack castle
- ✅ Can place towers and walls
- ✅ XP drops and leveling works
- ✅ 10 waves complete with victory
- ✅ 60 FPS with 200+ enemies

### **Full Release Criteria:**
- ✅ 20+ weapons
- ✅ 10+ enemy types
- ✅ 15+ tower/building types
- ✅ 10+ Joker modifiers
- ✅ 30+ passive upgrades
- ✅ 20 waves with 3+ bosses
- ✅ Meta progression (50+ unlocks)
- ✅ Stable multiplayer (< 100ms lag)
- ✅ Steam release ready

### **Post-Launch Goals:**
- 1000+ copies sold (first month)
- Positive Steam reviews (80%+)
- Active community (Discord)
- DLC/expansions (new heroes, weapons, modes)

---

## 💰 MONETIZATION STRATEGY

### **Launch Price:**
- **$10-15 USD** on Steam
- **$8-12 USD** on itch.io

### **Sales Strategy:**
- Launch discount: 20% off first week
- Seasonal sales: 30-50% off
- Bundle with similar games

### **DLC Plans (Post-Launch):**
- **Cosmetic Pack:** $5 (character skins, weapon skins)
- **New Hero Pack:** $8 (3 new hero classes)
- **Expansion Pack:** $10 (new maps, 20 weapons, 5 bosses)

### **Revenue Projections:**
- Conservative: 1,000 copies × $12 = $12,000
- Moderate: 5,000 copies × $12 = $60,000
- Optimistic: 10,000+ copies × $12 = $120,000+

---

## 🎮 COMPETITIVE ANALYSIS

### **Similar Games:**

**Vampire Survivors:**
- Price: $5
- What we do better: Multiplayer, building system, deck-building
- What they do better: Content volume (hundreds of unlocks)

**Brotato:**
- Price: $5
- What we do better: Multiplayer, castle defense objective
- What they do better: More heroes, simpler controls

**Orcs Must Die! 3:**
- Price: $30
- What we do better: Roguelite progression, lower price
- What they do better: AAA polish, more content

**Deep Rock Galactic: Survivor (unreleased):**
- Price: TBD
- What we do better: Simpler gameplay, deck-building
- What they do better: IP recognition, AAA budget

### **Market Position:**
- **Target audience:** Fans of Vampire Survivors + tower defense
- **Unique hook:** Co-op + building + Balatro-style RNG
- **Price point:** Mid-tier indie ($10-15)

---

## 🚨 RISKS & MITIGATION

### **Risk 1: Multiplayer Complexity**
- **Mitigation:** Build single-player prototype first, add multiplayer after
- **Fallback:** Launch single-player only, add co-op in update

### **Risk 2: Isometric Performance**
- **Mitigation:** Profile early, optimize rendering, object pooling
- **Fallback:** Switch to top-down if performance fails

### **Risk 3: Balancing Nightmare**
- **Mitigation:** Spreadsheet all weapon/enemy stats, DPS calculations
- **Fallback:** Automated balance testing, playtester feedback

### **Risk 4: Scope Creep**
- **Mitigation:** Strict phase system, MVP first, content later
- **Fallback:** Cut features to hit timeline

### **Risk 5: Market Saturation**
- **Mitigation:** Unique hybrid positioning, strong marketing
- **Fallback:** Lower price, free demo, streamer outreach

---

## ✅ FINAL CHECKLIST BEFORE DEVELOPMENT

- [x] Game concept confirmed
- [x] Core mechanics defined
- [x] Technical stack chosen (Phaser + Colyseus)
- [x] Art style decided (isometric pixel art)
- [x] Monetization strategy set ($10-15)
- [x] Timeline estimated (20 weeks)
- [x] Development phases planned
- [x] Risk mitigation strategies defined

---

## 🚀 READY TO BUILD

**This design document is LOCKED and approved for development.**

**Next Steps:**
1. Create project structure
2. Setup development environment
3. Port isometric coordinate system
4. Begin Phase 0: Project Setup

**Let's build this game!** 🎮

---

**Document Version:** 1.0
**Last Updated:** 2026-01-07
**Status:** ✅ APPROVED - READY FOR DEVELOPMENT
