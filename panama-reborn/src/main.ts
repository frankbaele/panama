/**
 * Panama Reborn - Main Entry Point
 * Initializes Phaser game with all scenes
 */

import Phaser from 'phaser';
import { PHASER_CONFIG } from './config';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import './style.css';

// Add scenes to config
const gameConfig: Phaser.Types.Core.GameConfig = {
  ...PHASER_CONFIG,
  scene: [BootScene, GameScene]
};

// Create game instance
const game = new Phaser.Game(gameConfig);

// Log startup
console.log('🎮 Panama Reborn - Starting...');
console.log('📐 Resolution:', gameConfig.width, 'x', gameConfig.height);
console.log('🎨 Renderer:', gameConfig.type === Phaser.AUTO ? 'AUTO' : 'WEBGL');

// Make game globally accessible for debugging
(window as any).game = game;
