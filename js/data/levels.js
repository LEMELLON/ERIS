// Only anchor points from the handoff are encoded; fill the rest from the GDD table.
export const LEVEL_SR={1:0,2:10,20:1900};
export const prof=l=>l>=17?6:l>=13?5:l>=9?4:l>=5?3:2; // PLACEHOLDER curve
export const mobSR=cr=>Math.min(10*cr,3*cr+21,cr+41);
