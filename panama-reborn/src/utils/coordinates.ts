/**
 * Coordinate Transformation Utilities
 * Ported from original Panama standardLibrary.js
 *
 * Handles conversions between:
 * - 2D grid coordinates (array indices)
 * - Isometric world coordinates (rotated 45°)
 * - Screen/world pixel positions
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface GameConfig {
  actor: {
    grid: { width: number; height: number };
    tile: { width: number; height: number };
    car: { width: number; height: number };
  };
  terrain: {
    grid: { width: number; height: number };
    tile: { width: number; height: number };
  };
}

/**
 * Convert 2D grid coordinates to isometric coordinates
 * @param point 2D grid position
 * @returns Isometric position
 */
export function twoDToIso(point: Point2D): Point2D {
  return {
    x: (point.x - point.y) / 2,
    y: (point.x + point.y) / 2
  };
}

/**
 * Convert isometric coordinates to 2D grid coordinates
 * @param point Isometric position
 * @returns 2D grid position
 */
export function isoToTwoD(point: Point2D): Point2D {
  return {
    x: (point.x + point.y) / 2,
    y: (point.y - point.x) / 2
  };
}

/**
 * Convert world pixel position to grid coordinates
 * @param point World position in pixels
 * @param config Game configuration
 * @returns Grid coordinates (floored)
 */
export function worldPosToGridPos(point: Point2D, config: GameConfig): Point2D {
  // Clone to avoid mutation
  const p = { ...point };

  // Add correction for the centering of the map
  p.x = p.x - (config.actor.grid.width / 2 * config.actor.tile.width);

  const coords = {
    x: (p.x / (config.actor.tile.width / 2) + p.y / (config.actor.tile.height / 2)) / 2,
    y: (p.y / (config.actor.tile.height / 2) - (p.x / (config.actor.tile.width / 2))) / 2
  };

  return {
    x: Math.floor(coords.x),
    y: Math.floor(coords.y)
  };
}

/**
 * Convert world position to isometric position
 * @param point World position
 * @param config Game configuration
 * @returns Isometric position
 */
export function worldPosToIsoPos(point: Point2D, config: GameConfig): Point2D {
  const gridCoordinates = worldPosToGridPos(point, config);
  return twoDToIso(gridCoordinates);
}

/**
 * Convert grid coordinates to world pixel position
 * @param point Grid coordinates
 * @param config Game configuration
 * @returns World position in pixels
 */
export function gridPosToWorldPos(point: Point2D, config: GameConfig): Point2D {
  const iso = twoDToIso(point);
  return {
    x: iso.x * config.actor.tile.width + (config.actor.grid.width / 2 * config.actor.tile.width),
    y: iso.y * config.actor.tile.height
  };
}

/**
 * Convert terrain grid coordinates to world pixel position
 * Used for rendering terrain tiles
 * @param point Terrain grid coordinates
 * @param config Game configuration
 * @returns World position in pixels
 */
export function terrainGridPosToWorldPos(point: Point2D, config: GameConfig): Point2D {
  const iso = twoDToIso(point);
  return {
    x: iso.x * config.terrain.tile.width + (config.terrain.grid.width / 2 * config.terrain.tile.width),
    y: iso.y * config.terrain.tile.height
  };
}

/**
 * Convert isometric world position to car (collision) world position
 * Used for collision detection with RVO2
 * @param point Isometric world position
 * @param config Game configuration
 * @returns Car world position
 */
export function isoWorldPosToCarWorldPos(point: Point2D, config: GameConfig): Point2D {
  const p = { ...point };
  p.x = p.x - (config.actor.grid.width / 2 * config.actor.tile.width);

  return {
    x: (p.x + p.y) / 2,
    y: (p.y - p.x) / 2
  };
}

/**
 * Convert car (collision) world position to isometric world position
 * @param point Car world position
 * @param config Game configuration
 * @returns Isometric world position
 */
export function carWorldPosToIsoWorldPos(point: Point2D, config: GameConfig): Point2D {
  const p = {
    x: point.x / config.actor.car.width,
    y: point.y / config.actor.car.height
  };

  let x = (p.x - p.y) / 2;
  let y = (p.x + p.y) / 2;

  x = x * config.actor.tile.width;
  y = y * config.actor.tile.height;
  x = x + (config.actor.grid.width / 2 * config.actor.tile.width);

  return { x, y };
}

/**
 * Generate a UUID v4 (for entity IDs)
 * @returns UUID string
 */
export function generateUUID(): string {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
