/**
 * GameScene - Main gameplay scene
 * Handles player movement, enemies, combat, building, etc.
 */

import Phaser from 'phaser';
import { PLAYER_CONFIG, CASTLE_CONFIG, DEBUG } from '../config';

export class GameScene extends Phaser.Scene {
  // Player
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    Space: Phaser.Input.Keyboard.Key;
  };

  // Player state
  private playerHealth: number = PLAYER_CONFIG.health;
  private isDashing: boolean = false;
  private canDash: boolean = true;

  // UI
  private debugText?: Phaser.GameObjects.Text;

  constructor() {
    super('GameScene');
  }

  create() {
    console.log('[GameScene] Starting game...');

    // Setup world bounds
    this.physics.world.setBounds(0, 0, 1920, 1080);

    // Create temporary player (placeholder circle until we have sprites)
    this.createPlayer();

    // Setup input
    this.setupInput();

    // Setup camera
    this.setupCamera();

    // Setup UI
    if (DEBUG.showFPS || DEBUG.showCoordinates) {
      this.createDebugUI();
    }

    // Display instructions
    this.add.text(20, 20, 'WASD - Move\nSpace - Dash (5s cooldown)', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 10 }
    });
  }

  private createPlayer() {
    // Create player as a circle (temporary, until we have sprites)
    const graphics = this.add.graphics();
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillCircle(32, 32, 32);
    graphics.generateTexture('player-temp', 64, 64);
    graphics.destroy();

    // Create player sprite
    this.player = this.physics.add.sprite(
      PLAYER_CONFIG.startX,
      PLAYER_CONFIG.startY,
      'player-temp'
    );

    // Setup physics
    this.player.setCollideWorldBounds(true);
    this.player.setDrag(500);  // Smooth deceleration
    this.player.setMaxVelocity(PLAYER_CONFIG.speed);

    console.log('[GameScene] Player created at', this.player.x, this.player.y);
  }

  private setupInput() {
    // Arrow keys
    this.cursors = this.input.keyboard!.createCursorKeys();

    // WASD keys
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      Space: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    };

    // Dash input
    this.wasd.Space.on('down', () => this.handleDash());
  }

  private setupCamera() {
    // Camera follows player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.0);

    // Set camera bounds to world bounds
    this.cameras.main.setBounds(0, 0, 1920, 1080);
  }

  private createDebugUI() {
    this.debugText = this.add.text(20, 80, '', {
      fontSize: '14px',
      color: '#ffff00',
      backgroundColor: '#000000',
      padding: { x: 5, y: 5 }
    });
    this.debugText.setScrollFactor(0);  // Fixed to camera
    this.debugText.setDepth(1000);  // Always on top
  }

  private handleDash() {
    if (!this.canDash || this.isDashing) return;

    // Get current velocity direction
    const velocity = this.player.body!.velocity;
    if (velocity.length() === 0) return;  // Don't dash if not moving

    // Normalize and scale to dash speed
    const dashVelocity = velocity.normalize().scale(PLAYER_CONFIG.dashSpeed);

    // Apply dash
    this.player.setVelocity(dashVelocity.x, dashVelocity.y);
    this.isDashing = true;
    this.canDash = false;

    // Visual feedback (tint player)
    this.player.setTint(0x00ffff);

    // End dash after duration
    this.time.delayedCall(PLAYER_CONFIG.dashDuration, () => {
      this.isDashing = false;
      this.player.clearTint();
    });

    // Reset dash cooldown
    this.time.delayedCall(PLAYER_CONFIG.dashCooldown, () => {
      this.canDash = true;
    });

    console.log('[GameScene] Dash!');
  }

  update(time: number, delta: number) {
    this.handlePlayerMovement();

    if (DEBUG.showFPS || DEBUG.showCoordinates) {
      this.updateDebugUI();
    }
  }

  private handlePlayerMovement() {
    if (this.isDashing) return;  // No control during dash

    const speed = PLAYER_CONFIG.speed;
    const velocity = new Phaser.Math.Vector2(0, 0);

    // WASD input
    if (this.wasd.W.isDown || this.cursors.up!.isDown) velocity.y = -1;
    if (this.wasd.S.isDown || this.cursors.down!.isDown) velocity.y = 1;
    if (this.wasd.A.isDown || this.cursors.left!.isDown) velocity.x = -1;
    if (this.wasd.D.isDown || this.cursors.right!.isDown) velocity.x = 1;

    // Normalize diagonal movement (prevent faster diagonal speed)
    velocity.normalize();

    // Apply velocity
    this.player.setVelocity(velocity.x * speed, velocity.y * speed);
  }

  private updateDebugUI() {
    if (!this.debugText) return;

    const fps = Math.round(this.game.loop.actualFps);
    const playerPos = `(${Math.round(this.player.x)}, ${Math.round(this.player.y)})`;
    const velocity = this.player.body!.velocity;
    const speed = Math.round(velocity.length());

    this.debugText.setText([
      `FPS: ${fps}`,
      `Position: ${playerPos}`,
      `Speed: ${speed}`,
      `Dash Ready: ${this.canDash ? 'YES' : 'NO'}`,
      `Health: ${this.playerHealth}/${PLAYER_CONFIG.health}`
    ]);
  }
}
