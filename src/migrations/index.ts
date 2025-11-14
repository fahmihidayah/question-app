import * as migration_20251114_083950 from './20251114_083950';

export const migrations = [
  {
    up: migration_20251114_083950.up,
    down: migration_20251114_083950.down,
    name: '20251114_083950'
  },
];
