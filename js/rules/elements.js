const WHEEL=['Water','Fire','Air','Earth']; // each beats the next
export function mult(a,d){if(!a||!d)return 1;
if((a==='Light'&&d==='Dark')||(a==='Dark'&&d==='Light'))return 1.5; // ASSUMPTION
const i=WHEEL.indexOf(a),j=WHEEL.indexOf(d);if(i<0||j<0)return 1;
if((i+1)%4===j)return 1.5;if((j+1)%4===i)return .5;return 1}
