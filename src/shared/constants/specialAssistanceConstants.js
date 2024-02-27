export const WHEELCHAIR_ASSISTANCE = {
  SEGMENT_LABEL: 'WHEELCHAIR ASSISTANCE',
  OPTIONS: {
    NONE: { text: 'No wheelchair assistance needed' },
    AIRPORT_WHEELCHAIR: { text: 'Can walk but need assistance to and from gate' },
    AISLE_CHAIR: { text: 'Need lift/transfer assistance to and from aircraft seat' }
  }
};
export const WHEELCHAIR_STOWAGE = {
  SEGMENT_LABEL: 'PERSONAL WHEELCHAIR STOWAGE',
  OPTIONS: {
    NONE: { text: 'No wheelchair stowage needed' },
    MANUAL_WHEELCHAIR: { text: 'Manual wheelchair' },
    WET_CELL_BATTERY_WHEELCHAIR: {
      text: 'Powered wheelchair (how many spillable batteries?)',
      select: true
    },
    DRY_CELL_BATTERY_WHEELCHAIR: {
      text: 'Powered wheelchair (how many non-spillable batteries?)',
      select: true
    }
  },
  BATTERIES: {
    DEFAULT: '1',
    OPTIONS: ['0', '1', '2', '3', '4']
  }
};
export const OTHER_ASSISTANCE = {
  SEGMENT_LABEL: 'OTHER',
  PEANUT_DUST_ALLERGY: 'Have peanut-dust allergy',
  PORTABLE_OXYGEN_CONCENTRATOR: 'Bringing my own approved Portable Oxygen Concentrator'
};
export const DEFAULT_FIELD_VALUES = {
  BLIND: false,
  DEAF: false,
  COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
  ASSISTANCE_ANIMAL: false,
  PEANUT_DUST_ALLERGY: false,
  PORTABLE_OXYGEN_CONCENTRATOR: false,
  WHEELCHAIR_ASSISTANCE: 'NONE',
  WHEELCHAIR_STOWAGE: 'NONE',
  WET_BATTERIES: null,
  DRY_BATTERIES: null
};
