# Panama Reborn - Game Development Plan
## Vampire Survivors × Riftbreaker × Balatro Hybrid

---

## 🎯 EXECUTIVE SUMMARY

**Game Concept:** Top-down/Isometric action roguelite where YOU control a character with auto-firing weapons, build defensive structures in real-time, and collect randomized upgrades through Balatro-style RNG systems.

**Target Platform:** Web (HTML5) with potential multiplayer
**Engine:** Phaser 3 + TypeScript + Vite
**Timeline:** 6-8 weeks for MVP
**Team Size:** Solo/Small team

---

## ⚠️ CRITICAL DECISIONS YOU MUST MAKE

### **DECISION 1: Visual Perspective** 🎨
**Must decide before starting art production**

**Option A: Top-Down (Recommended)**
```
Pros:
✅ Simpler to implement
✅ Easier to read gameplay (like Vampire Survivors)
✅ Better for dense bullet hell
✅ Camera control is straightforward
✅ Collision detection simpler

Cons:
❌ Less visual depth
❌ Less unique visually
```

**Option B: Isometric (Current Panama style)**
```
Pros:
✅ More visually interesting
✅ Can reuse existing coordinate transformation code
✅ Better for base building visualization
✅ More unique aesthetic

Cons:
❌ More complex to implement
❌ Harder to read dense combat
❌ Sorting layers required (z-index)
❌ Camera control more complex
❌ Collision hitboxes don't match visuals
```

**🔴 YOU MUST CHOOSE:** Top-Down or Isometric?

---

### **DECISION 2: Multiplayer Scope** 🌐
**Must decide before architecture finalization**

**Option A: Single-Player Only (Recommended for MVP)**
```
✅ Faster development (4-6 weeks)
✅ Simpler architecture
✅ No server costs
✅ Can add multiplayer later
```

**Option B: Co-op Multiplayer (2-4 Players)**
```
✅ More replayability
✅ Social engagement
⚠️ Requires:
   - Colyseus server setup
   - State synchronization
   - Network testing
   - Server hosting costs
❌ Adds 2-3 weeks to development
```

**Option C: Competitive Multiplayer**
```
❌ Not recommended for this game concept
❌ Requires authoritative server
❌ Complex balancing
```

**🔴 YOU MUST CHOOSE:** Single-player first, or multiplayer from start?

---

### **DECISION 3: Art Style & Resolution** 🎨
**Must decide before creating sprites**

**Option A: 16-bit Pixel Art (Recommended)**
```
Pros:
✅ Fast to produce
✅ Small file sizes
✅ Nostalgic appeal
✅ Easier to animate
Example: Vampire Survivors, Enter the Gungeon

Grid Size: 32x32 for characters, 16x16 for projectiles
Canvas Resolution: 800x600 or 1280x720
```

**Option B: 32-bit Pixel Art (Higher Detail)**
```
Pros:
✅ More detailed
✅ Smoother animations
Cons:
❌ Longer to produce
❌ Larger file sizes
❌ More frames needed

Grid Size: 64x64 for characters, 32x32 for projectiles
Canvas Resolution: 1280x720 or 1920x1080
```

**Option C: Vector/Hand-drawn**
```
❌ Not recommended (too slow to produce)
```

**🔴 YOU MUST CHOOSE:** 16-bit or 32-bit pixel art? What resolution?

---

### **DECISION 4: Session Length & Meta Progression** ⏱️
**Must decide before designing wave system**

**Session Length:**
- 15 minutes (fast, arcade-style)
- 20 minutes (balanced, like Vampire Survivors)
- 30 minutes (epic, more base building focus)

**Meta Progression Type:**
- **Option A:** Unlock new weapons/towers permanently (Vampire Survivors style)
- **Option B:** Unlock new starting modifiers (Balatro style)
- **Option C:** Skill tree with permanent upgrades (Riftbreaker style)
- **Option D:** All of the above (complex but highly replayable)

**🔴 YOU MUST CHOOSE:** How long are runs? What unlocks between runs?

---

### **DECISION 5: Monetization & Distribution** 💰
**Must decide before launch planning**

**Option A: Free Web Game**
```
✅ Maximum reach
✅ No payment processing
✅ Host on GitHub Pages
❌ No revenue (unless ads)
```

**Option B: Premium ($5-15)**
```
✅ Revenue from sales
✅ Can use Steam/itch.io
⚠️ Requires more polish
⚠️ Marketing needed
```

**Option C: Free-to-Play with Cosmetics**
```
✅ Larger player base
✅ Ongoing revenue potential
❌ Requires more content
❌ Payment system needed
```

**🔴 YOU MUST CHOOSE:** Monetization model?

---

### **DECISION 6: What to Salvage from Old Codebase** ♻️
**Must decide before starting new project**

**Definitely Port:**
- ✅ Coordinate transformation math (standardLibrary.js → utils/coordinates.ts)
- ✅ Pathfinding approach (update library version)
- ✅ Sprite assets (PNG files)
- ✅ Tiled map format (Phaser supports natively)

**Consider Porting:**
- ⚠️ RVO2 collision avoidance (Phaser has built-in, but RVO2 is more advanced)
- ⚠️ Sprite sheet parsing logic (Phaser has built-in atlas support)

**Do NOT Port:**
- ❌ RequireJS modules → Use ES6 modules
- ❌ Mediator.js → Use Phaser Events
- ❌ Actor hierarchy → Use Phaser GameObjects + Components
- ❌ Grunt build → Use Vite
- ❌ Bower dependencies → Use npm
- ❌ jQuery/Lodash → Use vanilla JS/Phaser utilities

**🔴 YOU MUST CHOOSE:** Port RVO2 collision system or use Phaser Arcade Physics?

---

## 📋 IMPLEMENTATION PLAN

### **PHASE 0: Project Setup (2-3 days)**

#### Tasks:
1. **Create new Phaser 3 + Vite + TypeScript project**
   ```bash
   npm create vite@latest panama-reborn -- --template vanilla-ts
   cd panama-reborn
   npm install phaser
   npm install --save-dev @types/node
   ```

2. **Setup project structure (The Phaser Way)**
   ```
   panama-reborn/
   ├── public/
   │   └── assets/
   │       ├── sprites/
   │       ├── audio/
   │       └── maps/
   ├── src/
   │   ├── main.ts
   │   ├── config.ts
   │   ├── scenes/
   │   ├── gameobjects/
   │   ├── components/
   │   ├── systems/
   │   ├── data/
   │   └── utils/
   ├── package.json
   ├── tsconfig.json
   └── vite.config.ts
   ```

3. **Port coordinate transformation utilities**
   - Convert standardLibrary.js → utils/coordinates.ts
   - Add TypeScript types
   - Write unit tests

4. **Setup basic Phaser config**
   - Scene manager
   - Physics config (Arcade)
   - Input handling
   - Asset paths

5. **Create base Scenes**
   - BootScene (initial load)
   - PreloadScene (asset loading)
   - MenuScene (main menu)
   - GameScene (gameplay stub)

**Deliverable:** Empty Phaser project that boots and shows a menu

---

### **PHASE 1: Core Character & Movement (3-5 days)**

#### Tasks:
1. **Create Player GameObject**
   ```typescript
   class Player extends Phaser.Physics.Arcade.Sprite {
     - WASD movement with physics velocity
     - Dash ability (cooldown-based)
     - Health system with Data Component
     - Sprite animation (idle, walk, dash)
   }
   ```

2. **Camera System**
   - Follow player smoothly
   - Zoom controls (optional)
   - Screen bounds

3. **Input Handling**
   - Keyboard (WASD + Space for dash)
   - Gamepad support (optional)
   - Mouse tracking for weapon aim direction

4. **Basic Enemy**
   ```typescript
   class Enemy extends Phaser.Physics.Arcade.Sprite {
     - Simple pathfinding toward player
     - Health system
     - Contact damage
   }
   ```

5. **Enemy Spawner**
   - Spawn enemies at edges of screen
   - Use Phaser Groups with object pooling
   - Basic wave timing

**Deliverable:** Playable character that moves, enemies spawn and chase player

---

### **PHASE 2: Weapons & Auto-Combat (4-6 days)**

#### Tasks:
1. **Weapon System Architecture**
   ```typescript
   interface WeaponData {
     id: string;
     name: string;
     rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
     fireRate: number;  // shots per second
     damage: number;
     projectileSpeed: number;
     pierce: number;  // enemies pierced
     projectileCount: number;  // bullets per shot
     spread: number;  // angle spread in degrees
     range: number;
     special?: WeaponSpecial;  // chain, bounce, explode, etc.
   }
   ```

2. **Projectile System**
   ```typescript
   class Projectile extends Phaser.Physics.Arcade.Sprite {
     - Auto-movement via physics
     - Hit detection
     - Pierce logic
     - Visual trail effects
   }

   // Use Phaser Groups with pooling (maxSize: 1000)
   this.projectiles = this.physics.add.group({
     classType: Projectile,
     maxSize: 1000,
     runChildUpdate: true
   });
   ```

3. **Auto-Fire Logic**
   ```typescript
   class WeaponComponent {
     update(time: number) {
       if (time > this.nextFireTime) {
         const target = this.findNearestEnemy();
         if (target && this.inRange(target)) {
           this.fire(target);
           this.nextFireTime = time + (1000 / this.fireRate);
         }
       }
     }
   }
   ```

4. **Implement 5 Basic Weapons**
   - Minigun (high fire rate, low damage)
   - Shotgun (spread, close range)
   - Railgun (pierce, high damage, slow)
   - Flamethrower (cone AoE, DoT)
   - Rocket Launcher (AoE explosion)

5. **Weapon Slots & Switching**
   - Player can equip 6 weapons (3 primary, 3 secondary)
   - Number keys 1-6 to switch active weapon
   - UI showing equipped weapons

6. **Collision System**
   ```typescript
   // THE PHASER WAY - one-liners!
   this.physics.add.overlap(
     this.projectiles,
     this.enemies,
     this.hitEnemy,
     undefined,
     this
   );
   ```

**Deliverable:** Player with 5 auto-firing weapons, enemies take damage and die

---

### **PHASE 3: XP, Leveling & Loot (3-4 days)**

#### Tasks:
1. **XP Gem System**
   ```typescript
   class XPGem extends Phaser.Physics.Arcade.Sprite {
     - Drops from dead enemies
     - Attracted to player when nearby (tween)
     - Different values (small, medium, large)
     - Visual sparkle effect
   }
   ```

2. **Experience System**
   ```typescript
   class ExperienceManager {
     xp: number = 0;
     level: number = 1;
     xpToNextLevel: number = 100;

     addXP(amount: number) {
       this.xp += amount;
       if (this.xp >= this.xpToNextLevel) {
         this.levelUp();
       }
     }

     levelUp() {
       this.level++;
       this.xpToNextLevel = Math.floor(100 * Math.pow(1.5, this.level));
       this.scene.events.emit('level-up');
     }
   }
   ```

3. **Level-Up Scene (Overlay)**
   ```typescript
   class LevelUpScene extends Phaser.Scene {
     create() {
       // Pause GameScene
       this.scene.pause('GameScene');

       // Show 3 random upgrade choices
       const upgrades = this.generateRandomUpgrades(3);
       this.displayUpgradeCards(upgrades);
     }

     selectUpgrade(upgrade: Upgrade) {
       this.applyUpgrade(upgrade);
       this.scene.resume('GameScene');
       this.scene.stop();
     }
   }
   ```

4. **Upgrade Pool System**
   ```typescript
   interface Upgrade {
     id: string;
     name: string;
     description: string;
     rarity: 'common' | 'uncommon' | 'rare';
     effect: (player: Player) => void;
   }

   // Example upgrades:
   - +15% Fire Rate
   - +20% Movement Speed
   - +25% Damage
   - +1 Projectile Count
   - +50% XP Gain
   - Unlock new weapon slot
   ```

5. **Resource Drops**
   ```typescript
   enum ResourceType {
     Scrap = 'scrap',      // Common - build basic towers
     Crystal = 'crystal',   // Uncommon - upgrade weapons
     Essence = 'essence'    // Rare - unlock Joker mods
   }
   ```

**Deliverable:** Enemies drop XP gems, player levels up, choose 1 of 3 upgrades

---

### **PHASE 4: Base Building System (4-6 days)**

#### Tasks:
1. **Grid-Based Placement System**
   ```typescript
   class BuildingPlacement {
     gridSize: number = 32;  // or 64 for isometric

     showGhost(x: number, y: number, buildingType: string) {
       // Show semi-transparent preview
       // Green if valid placement, red if invalid
     }

     placeBuilding(gridX: number, gridY: number, type: string) {
       // Check resources
       // Check valid placement
       // Create building
       // Deduct resources
     }
   }
   ```

2. **Building Types**
   ```typescript
   class Tower extends Phaser.GameObjects.Sprite {
     // Auto-fire at enemies (like player weapons but stationary)
     weapon: WeaponData;
     range: number;
     powerCost: number;
   }

   class Wall extends Phaser.GameObjects.Sprite {
     // Block enemy pathfinding
     health: number;
   }

   class Extractor extends Phaser.GameObjects.Sprite {
     // Place on resource nodes
     // Auto-collect resources over time
     resourceType: ResourceType;
     gatherRate: number;
   }

   class Generator extends Phaser.GameObjects.Sprite {
     // Powers towers in radius
     powerOutput: number;
   }
   ```

3. **Building UI**
   - Radial menu or hotbar
   - Show building costs
   - Show current resources
   - Keyboard shortcuts (Q, E, R, F keys)

4. **Pathfinding Integration**
   - Update pathfinding grid when walls placed
   - Enemies navigate around buildings
   - Use existing pathfinding library (updated version)

5. **Power System**
   ```typescript
   class PowerManager {
     // Towers need power to function
     // Generators provide power in radius
     // Visual feedback for unpowered towers
   }
   ```

**Deliverable:** Can place towers, walls, extractors in real-time during combat

---

### **PHASE 5: Wave System & Difficulty (3-4 days)**

#### Tasks:
1. **Wave Manager**
   ```typescript
   class WaveSpawner {
     currentWave: number = 1;
     waveConfig: WaveConfig;

     startWave() {
       const config = this.getWaveConfig(this.currentWave);
       this.spawnEnemies(config);
     }

     update(time: number, delta: number) {
       // Check if wave complete
       if (this.enemies.countActive() === 0) {
         this.currentWave++;
         this.showWaveCompleteUI();
       }
     }
   }
   ```

2. **Enemy Types**
   ```typescript
   // Create 5-10 enemy variants
   class BasicEnemy { health: 50, speed: 60, damage: 10 }
   class FastEnemy { health: 30, speed: 120, damage: 5 }
   class TankEnemy { health: 200, speed: 40, damage: 20 }
   class RangedEnemy { health: 60, speed: 50, shoots projectiles }
   class BossEnemy { health: 1000, speed: 30, special abilities }
   ```

3. **Difficulty Scaling**
   ```typescript
   interface WaveConfig {
     wave: number;
     enemyCount: number;
     enemyTypes: string[];
     healthMultiplier: number;
     speedMultiplier: number;
     spawnRate: number;
   }

   // Example: Wave 10 has 3x enemy health, 1.5x speed
   ```

4. **Boss Waves**
   - Every 5 waves, spawn a boss
   - Unique boss abilities (summon minions, AoE attacks, etc.)
   - Boss health bar UI

5. **Victory Condition**
   - Survive 10 waves (or reach time limit)
   - Final boss at wave 10
   - Victory screen with stats

**Deliverable:** Progressive wave spawning, difficulty increases, bosses appear

---

### **PHASE 6: RNG Shop System (Balatro-style) (3-4 days)**

#### Tasks:
1. **Shop Scene (Overlay)**
   ```typescript
   class ShopScene extends Phaser.Scene {
     create() {
       this.scene.pause('GameScene');

       // Generate 3-5 random items
       const items = this.weaponPool.getRandom(3, this.scene.get('GameScene').level);

       this.displayShopItems(items);
       this.showRerollButton();
     }
   }
   ```

2. **Weapon Pool System**
   ```typescript
   class WeaponPool {
     weapons: WeaponData[] = []; // 50+ weapons

     getRandom(count: number, playerLevel: number): WeaponData[] {
       // Weight by rarity
       // Common: 70%, Uncommon: 25%, Rare: 4%, Legendary: 1%

       // Higher level → higher chance of rare weapons
       const rarityWeights = this.calculateRarityWeights(playerLevel);

       return this.weightedRandomSelection(count, rarityWeights);
     }
   }
   ```

3. **Reroll Mechanic**
   ```typescript
   rerollShop(cost: number) {
     if (this.gold >= cost) {
       this.gold -= cost;
       this.rerollCost *= 1.5;  // Increases each reroll
       this.refreshShopItems();
     }
   }
   ```

4. **Shop Trigger**
   - Appears every 3-5 waves
   - Or every 5 minutes
   - Or from special drop (shop ticket)

5. **Weapon Replacement UI**
   - If all 6 slots full, choose which weapon to replace
   - Compare stats side-by-side

**Deliverable:** Shop appears periodically, buy weapons with gold, reroll for more options

---

### **PHASE 7: Joker Modifiers (Balatro RNG) (3-4 days)**

#### Tasks:
1. **Modifier System**
   ```typescript
   interface JokerModifier {
     id: string;
     name: string;
     description: string;
     rarity: 'rare' | 'legendary';
     icon: string;
     effect: ModifierEffect;
   }

   interface ModifierEffect {
     type: 'multiply_damage' | 'add_projectile' | 'chain_lightning' | etc;
     value: number;
     condition?: string;  // "when enemy dies", "every 10 shots", etc.
   }
   ```

2. **15 Joker Modifiers (Examples)**
   ```typescript
   const jokers: JokerModifier[] = [
     {
       name: "Double Trouble",
       description: "All weapons fire twice",
       effect: { type: 'multiply_shots', value: 2 }
     },
     {
       name: "Chain Reaction",
       description: "Projectiles chain to 3 nearby enemies",
       effect: { type: 'chain_lightning', value: 3 }
     },
     {
       name: "Overkill",
       description: "Excess damage spreads to nearby enemies",
       effect: { type: 'damage_spread', value: 0.5 }
     },
     {
       name: "Midas Touch",
       description: "Enemies drop 2x gold",
       effect: { type: 'multiply_gold', value: 2 }
     },
     {
       name: "Rapid Fire",
       description: "+100% fire rate for all weapons",
       effect: { type: 'multiply_fire_rate', value: 2 }
     },
     // ... 10 more
   ];
   ```

3. **Joker Acquisition**
   - Rare drop from enemies (1% chance)
   - Shop (expensive, 1000+ gold)
   - Level-up reward (5% chance)
   - Boss kill reward

4. **Joker UI**
   - Show active Jokers as icons
   - Tooltip on hover
   - Max 5 active Jokers

5. **Synergy System**
   ```typescript
   class SynergyDetector {
     checkSynergies(jokers: JokerModifier[], weapons: WeaponData[]): Synergy[] {
       // Example: "Explosives Expert" - 3+ explosive weapons = +100% AoE
       // Example: "Elemental Master" - Fire + Ice weapon = Thermal Shock
     }
   }
   ```

**Deliverable:** Rare Joker modifiers that dramatically change gameplay

---

### **PHASE 8: Meta Progression (2-3 days)**

#### Tasks:
1. **Unlock System**
   ```typescript
   class UnlockManager {
     unlockedWeapons: Set<string> = new Set(['minigun', 'shotgun']);
     unlockedModifiers: Set<string> = new Set();

     unlockWeapon(weaponId: string) {
       this.unlockedWeapons.add(weaponId);
       this.saveToLocalStorage();
     }
   }
   ```

2. **Persistent Upgrades**
   ```typescript
   interface MetaUpgrade {
     id: string;
     name: string;
     cost: number;  // Currency from completed runs
     effect: string;
   }

   const metaUpgrades: MetaUpgrade[] = [
     { name: "Strong Start", cost: 100, effect: "+10% damage from start" },
     { name: "Wealthy", cost: 150, effect: "Start with +100 gold" },
     { name: "Experienced", cost: 200, effect: "+20% XP gain" },
   ];
   ```

3. **Currency System**
   - "Rift Crystals" earned from completed runs
   - Amount based on: waves cleared, enemies killed, time survived
   - Spend in Meta Upgrade screen

4. **Save System**
   ```typescript
   class SaveManager {
     saveRun(stats: RunStats) {
       const save = {
         unlockedWeapons: [...this.unlockedWeapons],
         metaUpgrades: [...this.metaUpgrades],
         totalRuns: this.totalRuns,
         bestRun: this.bestRun,
         riftCrystals: this.riftCrystals
       };
       localStorage.setItem('panama-save', JSON.stringify(save));
     }
   }
   ```

**Deliverable:** Permanent unlocks, meta progression, save/load system

---

### **PHASE 9: Polish & Juice (3-5 days)**

#### Tasks:
1. **Particle Effects**
   - Phaser Particle Emitters for:
     - Muzzle flashes
     - Hit sparks
     - Explosion effects
     - XP gem sparkles
     - Level-up burst

2. **Screen Shake**
   ```typescript
   this.cameras.main.shake(100, 0.005);  // Duration, intensity
   ```

3. **Hit Pause / Time Slow**
   ```typescript
   // On boss death
   this.time.timeScale = 0.3;  // Slow motion
   this.time.delayedCall(500, () => {
     this.time.timeScale = 1.0;
   });
   ```

4. **UI Polish**
   - Health bars
   - Resource counters
   - Wave announcements
   - Damage numbers (floating text)
   - Minimap (optional)

5. **Sound Design**
   - Weapon fire sounds (unique per weapon)
   - Enemy hit/death sounds
   - XP pickup sound
   - Level-up fanfare
   - Background music (intensity increases with waves)

6. **Animations**
   - Character walk cycle (8 directions)
   - Enemy movement animations
   - Building construction animation
   - Weapon recoil

**Deliverable:** Game feels satisfying to play, visual/audio feedback

---

### **PHASE 10: Content Expansion (1-2 weeks)**

#### Tasks:
1. **Expand Weapons to 50+**
   - Create weapon data in JSON
   - Test balance
   - Create unique sprites/effects

2. **Expand Enemy Types to 20+**
   - Flying enemies
   - Burrowing enemies
   - Shield enemies
   - Teleporting enemies

3. **Multiple Maps**
   - 3-5 different biomes
   - Different enemy compositions per biome
   - Different resources per biome

4. **More Joker Modifiers (25+)**

5. **Achievement System**
   - "Kill 1000 enemies"
   - "Survive 30 minutes"
   - "Win with only 1 weapon"

**Deliverable:** Deep content pool for replayability

---

### **PHASE 11: Multiplayer (Optional, +2-3 weeks)**

#### Tasks:
1. **Setup Colyseus Server**
   ```bash
   npm init colyseus-app ./server
   cd server
   npm install
   ```

2. **Define Shared State Schema**
   ```typescript
   class Player extends Schema {
     @type('number') x: number;
     @type('number') y: number;
     @type('number') health: number;
     @type(['string']) weapons: ArraySchema<string>;
   }

   class GameState extends Schema {
     @type({ map: Player }) players = new MapSchema<Player>();
     @type({ map: Enemy }) enemies = new MapSchema<Enemy>();
   }
   ```

3. **Server-Side Game Logic**
   - Run Phaser headless on server (authoritative)
   - Or manual game loop for simple games

4. **Client Prediction & Interpolation**
   - Predict player movement locally
   - Interpolate other players' positions
   - Server reconciliation

5. **Lobby System**
   - Create/join rooms
   - 2-4 players per room
   - Ready-up mechanic

6. **Co-op Specific Features**
   - Shared resources vs individual resources?
   - Friendly fire on/off?
   - Revive system?

**Deliverable:** 2-4 player co-op working smoothly

---

### **PHASE 12: Testing & Balancing (1-2 weeks)**

#### Tasks:
1. **Balance Testing**
   - Weapon DPS calculations
   - Enemy health scaling curves
   - Resource economy
   - Meta progression pacing

2. **Performance Testing**
   - 500+ enemies on screen
   - 1000+ projectiles
   - Maintain 60 FPS
   - Memory leak detection

3. **Browser Compatibility**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (optional)

4. **Bug Fixing**
   - Collision edge cases
   - UI glitches
   - Save/load issues

5. **Playtesting**
   - Watch others play
   - Gather feedback
   - Iterate on design

**Deliverable:** Stable, balanced, fun game

---

### **PHASE 13: Deployment (2-3 days)**

#### Tasks:
1. **Build for Production**
   ```bash
   npm run build
   # Creates dist/ folder with optimized bundle
   ```

2. **Deploy Options**
   - **GitHub Pages:** Free, easy
     ```bash
     npm run build
     cd dist
     git init
     git add .
     git commit -m "Deploy"
     git push origin gh-pages
     ```

   - **Itch.io:** Great for indie games
     - Upload dist/ folder as HTML5 game

   - **Steam:** Requires Steamworks SDK wrapper
     - Use Electron or Greenworks

3. **Domain Setup**
   - Custom domain (optional)
   - HTTPS required for web games

4. **Analytics (Optional)**
   - Google Analytics
   - Track: play time, death rate, popular weapons

**Deliverable:** Playable game online

---

## 📊 TIMELINE ESTIMATES

### **Minimum Viable Product (MVP):**
- **Solo Developer:** 6-8 weeks (full-time)
- **Part-time (10 hrs/week):** 3-4 months
- **Team of 2:** 4-6 weeks

### **Full Release (with content):**
- **Solo Developer:** 3-4 months
- **Part-time:** 6-8 months
- **Team of 2:** 2-3 months

### **With Multiplayer:**
- Add 2-3 weeks to any estimate

---

## 🎨 ASSET REQUIREMENTS

### **Art Assets Needed:**

**Characters:**
- Player sprite: 32x32 or 64x64
- Animations: idle (1 frame), walk (4-8 frames × 8 directions), dash (2 frames)
- Estimated: 50-100 frames total

**Enemies:**
- 10+ enemy types
- Animations: idle, move, attack, death
- Estimated: 200-300 frames total

**Weapons (Projectiles):**
- 50+ weapon projectile sprites
- Particle effects
- Estimated: 50-100 sprites

**Buildings:**
- Towers (5 types) × 3 upgrade levels = 15 sprites
- Walls, Generators, Extractors = 10 sprites
- Estimated: 25 sprites

**UI:**
- Health bars, resource icons, buttons
- Shop cards, upgrade cards
- Estimated: 50 UI elements

**Environment:**
- Tileset for ground (16x16 or 32x32 tiles)
- 3-5 biomes = 50-100 tiles

**Effects:**
- Explosions, muzzle flashes, hit sparks
- Estimated: 20-30 effect sprites

### **Audio Assets Needed:**

**SFX:**
- 20+ weapon fire sounds
- 10+ enemy sounds
- UI sounds (click, level-up, purchase)
- Estimated: 50 sound effects

**Music:**
- Main menu theme
- 2-3 gameplay tracks (intensity layers)
- Boss theme
- Estimated: 5 music tracks

---

## 🔧 TECHNICAL REQUIREMENTS

### **Development Environment:**
- Node.js 18+
- VS Code (recommended) with TypeScript extension
- Git for version control

### **Browser Requirements:**
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- WebGL support
- 2GB RAM minimum

### **Server Requirements (if multiplayer):**
- Node.js server (AWS, DigitalOcean, Heroku)
- 1GB RAM minimum
- WebSocket support

---

## ♻️ REUSING OLD PANAMA CODE

### **Files to Convert:**

**✅ DEFINITELY PORT:**

1. **src/application/standardLibrary.js → src/utils/coordinates.ts**
   ```typescript
   // Keep these functions:
   - twoDToIso(x, y)
   - isoToTwoD(x, y)
   - worldPosToGridPos(x, y)
   - gridPosToWorldPos(x, y)

   // Add TypeScript types:
   interface Point2D { x: number; y: number; }
   export function twoDToIso(point: Point2D): Point2D { ... }
   ```

2. **Art Assets**
   - Copy `src/art/` → `public/assets/sprites/`
   - Keep existing PNG sprites
   - Convert atlas JSON to Phaser format if needed

3. **Tiled Maps**
   - Copy `src/maps/` → `public/assets/maps/`
   - Phaser supports Tiled JSON natively
   - May need to adjust layer names

**⚠️ CONSIDER PORTING:**

1. **RVO2 Collision System**
   - Only if you need advanced crowd simulation
   - Phaser Arcade Physics is simpler and faster
   - Decision: Port if you want 100+ enemies smoothly avoiding each other

**❌ DO NOT PORT:**

1. All RequireJS/AMD modules → Use ES6 modules
2. Mediator.js → Use Phaser Events
3. jQuery code → Use Phaser or vanilla JS
4. Lodash utilities → Use native JS array methods
5. Grunt tasks → Vite handles everything
6. Polymer components → Use Phaser Scenes
7. Actor hierarchy → Rewrite with Phaser GameObjects

---

## 🎮 SUCCESS METRICS

### **MVP Success Criteria:**
- ✅ Player can move and dash
- ✅ 3 weapons auto-fire
- ✅ Enemies spawn and pathfind
- ✅ XP drops and leveling works
- ✅ Can place 2 building types
- ✅ 10 waves with increasing difficulty
- ✅ Victory screen
- ✅ Runs at 60 FPS with 200+ enemies

### **Full Game Success Criteria:**
- ✅ 20+ weapons
- ✅ 15+ enemy types
- ✅ 25+ upgrades
- ✅ 10+ Joker modifiers
- ✅ Meta progression system
- ✅ 3+ maps
- ✅ 30+ minutes of gameplay per run
- ✅ High replayability (10+ hours)

---

## 📞 SUPPORT & RESOURCES

### **Phaser 3 Resources:**
- Official Docs: https://photonstorm.github.io/phaser3-docs/
- Examples: https://phaser.io/examples
- Forum: https://phaser.discourse.group/
- Discord: https://discord.gg/phaser

### **Colyseus Resources:**
- Docs: https://docs.colyseus.io/
- Phaser Tutorial: https://learn.colyseus.io/phaser/

### **Asset Resources:**
- Pixel Art: Aseprite ($20)
- Sound Effects: freesound.org
- Music: OpenGameArt.org
- Tiled Map Editor: mapeditor.org (free)

---

## 🚨 RISK MITIGATION

### **Major Risks:**

1. **Scope Creep**
   - Mitigation: Stick to MVP first, add features after
   - Use strict phase system

2. **Performance Issues**
   - Mitigation: Test with 500+ enemies early (Phase 2)
   - Use object pooling from day 1
   - Profile frequently

3. **Art Production Bottleneck**
   - Mitigation: Use placeholder art during development
   - Simple geometric shapes work fine for prototyping
   - Commission art or use asset packs

4. **Balancing Nightmare**
   - Mitigation: Spreadsheet with all weapon/enemy stats
   - DPS calculations for each weapon
   - Automated balance testing

5. **Multiplayer Complexity**
   - Mitigation: Build single-player FIRST
   - Add multiplayer as Phase 11 (optional)
   - Use Colyseus (handles 80% of complexity)

---

## ✅ PRE-DEVELOPMENT CHECKLIST

Before writing any code, you must decide:

- [ ] **Perspective:** Top-down or Isometric?
- [ ] **Multiplayer:** Single-player first, or multiplayer from start?
- [ ] **Art Style:** 16-bit or 32-bit pixel art?
- [ ] **Resolution:** 800x600? 1280x720? 1920x1080?
- [ ] **Session Length:** 15, 20, or 30 minutes?
- [ ] **Meta Progression:** What unlocks between runs?
- [ ] **Monetization:** Free, premium, or F2P?
- [ ] **RVO2 Collision:** Port from old code or use Phaser physics?

---

## 🎯 RECOMMENDED PATH (My Opinion)

If I were you, I would:

1. ✅ **Perspective:** Top-down (simpler, faster to build)
2. ✅ **Multiplayer:** Single-player MVP first, add co-op later
3. ✅ **Art Style:** 16-bit pixel art (faster, nostalgic)
4. ✅ **Resolution:** 1280x720 (good for web and desktop)
5. ✅ **Session Length:** 20 minutes (sweet spot)
6. ✅ **Meta Progression:** Unlock weapons + meta upgrades
7. ✅ **Monetization:** Free on itch.io/GitHub Pages, paid on Steam later
8. ✅ **RVO2:** Skip it, use Phaser Arcade Physics (simpler)

**Timeline with this approach:** 6-8 weeks for MVP, 3 months for full release

---

**Ready to make these decisions and start building?** 🚀
