export function calculateWeight(crime) {
  const crimeSeverities = {
    Homicide: 10,
    "Vehicle Collision or Pedestrian Struck (with Fatality)": 9,
    "Offence Against a Person": 8,
    "BNE Commercial": 7,
    "BNE Residential/Other": 6,
    "Vehicle Collision or Pedestrian Struck (with Injury)": 5,
    "Theft of Vehicle": 4,
    "Theft from Vehicle": 3,
    "Theft of Bicycle": 3,
    "Other Theft": 2,
    Mischief: 1
  };

  function calculateTimeDecay(year, month, day) {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const crimeDate = new Date(year, month - 1, day);
    const diffDays = Math.round(Math.abs((today - crimeDate) / oneDay));
    return 1 / diffDays;
  }

  const { TYPE, YEAR, MONTH, DAY } = crime;
  const crimeSeverity = crimeSeverities[TYPE];
  const timeDecay = calculateTimeDecay(YEAR, MONTH, DAY);

  return crimeSeverity * timeDecay;
}
