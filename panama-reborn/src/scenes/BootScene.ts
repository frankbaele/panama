/**
 * BootScene - Initial loading and setup
 * Loads critical assets and transitions to GameScene
 */

import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Display loading text
    const loadingText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Loading Panama Reborn...',
      {
        fontSize: '32px',
        color: '#ffffff'
      }
    );
    loadingText.setOrigin(0.5);

    // TODO: Load assets here
    // this.load.image('player', 'assets/sprites/player.png');
    // this.load.image('enemy', 'assets/sprites/enemy.png');
    // this.load.image('tower', 'assets/sprites/tower.png');
  }

  create() {
    console.log('[BootScene] Assets loaded, starting GameScene');

    // Transition to GameScene
    this.scene.start('GameScene');
  }
}
