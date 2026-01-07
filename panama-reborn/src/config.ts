/**
 * Panama Reborn - Game Configuration
 * All game constants and settings
 */

import Phaser from 'phaser';

/**
 * Game grid and tile configuration
 */
export const GAME_CONFIG = {
  // Grid dimensions
  grid: {
    width: 120,
    height: 120
  },

  // Isometric tile dimensions
  tile: {
    width: 66,
    height: 33
  },

  // Collision grid dimensions (for pathfinding/physics)
  collision: {
    width: 33,
    height: 33
  },

  // Terrain configuration
  terrain: {
    grid: {
      width: 60,
      height: 60
    },
    tile: {
      width: 132,
      height: 66
    }
  }
} as const;

/**
 * Player configuration
 */
export const PLAYER_CONFIG = {
  speed: 200,           // Movement speed (pixels/second)
  dashSpeed: 400,       // Dash speed (pixels/second)
  dashDuration: 200,    // Dash duration (milliseconds)
  dashCooldown: 5000,   // Dash cooldown (milliseconds)
  health: 100,          // Starting health
  startX: 400,          // Starting X position
  startY: 300           // Starting Y position
} as const;

/**
 * Castle configuration
 */
export const CASTLE_CONFIG = {
  health: 5000,
  x: 960,  // Center of 1920 screen
  y: 540   // Center of 1080 screen
} as const;

/**
 * Phaser game configuration
 */
export const PHASER_CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#1a1a2e',
  parent: 'game-container',

  // Physics configuration
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true  // Enable debug mode for development
    }
  },

  // Rendering configuration
  render: {
    pixelArt: true,       // Sharp pixel art rendering
    antialias: false,
    roundPixels: true
  },

  // Scale configuration
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

/**
 * Development flags
 */
export const DEBUG = {
  showFPS: true,
  showCoordinates: true,
  godMode: false
} as const;
