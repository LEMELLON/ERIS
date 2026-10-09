// GDD section 2: Total SR required and Proficiency Bonus per level.
export const MAX_LEVEL = 20;
export const MAX_ATTRIBUTE = 20;
export const ATTRIBUTE_UPGRADE_COST_PER_POINT = 6; // current score x 6, paid from Wallet SR

// index 0 = level 1
const TOTAL_SR = [0, 10, 30, 60, 100, 150, 210, 280, 360, 450, 550, 660, 780, 910, 1050, 1200, 1360, 1530, 1710, 1900];
const PROFICIENCY = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];

export const sRForLevel = level => TOTAL_SR[level - 1];
export const proficiencyForLevel = level => PROFICIENCY[level - 1];
