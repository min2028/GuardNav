export function filterCrimeData(origin, dest, weight_limit, crimeData) {
  // Calculate A, B and C for the line equation Ax + By + C = 0
  let A = dest?.lat - origin?.lat;
  let B = origin?.lng - dest?.lng;
  let C = dest?.lng * origin?.lat - dest?.lat * origin?.lng;

  // Calculate the distances from each crimeData point to the line
  let distances = crimeData.map((row) => {
    let x1 = parseFloat(row.location.lat()),
      y1 = parseFloat(row.location.lng());
    let distance = Math.abs(A * x1 + B * y1 + C) / Math.sqrt(A * A + B * B);
    return {
      location: row.location,
      weight: parseFloat(row.weight),
      distance: distance,
    };
  });

  let minLat = Math.min(
    ...crimeData.map((row) => parseFloat(row.location.lat()))
  );
  let maxLat = Math.max(
    ...crimeData.map((row) => parseFloat(row.location.lat()))
  );
  let minLng = Math.min(
    ...crimeData.map((row) => parseFloat(row.location.lng()))
  );
  let maxLng = Math.max(
    ...crimeData.map((row) => parseFloat(row.location.lng()))
  );

  // Filter out points based on the weight limit
  let filteredData = distances.filter((row) => row.weight <= weight_limit);

  // Sort the data by distance
  filteredData.sort((a, b) => a.distance - b.distance);

  // Select the closest points to each of the 23 segments
  let waypoints = [];
  let totalDistance = Math.sqrt(
    Math.pow(dest.lat - origin.lat, 2) + Math.pow(dest.lng - origin.lng, 2)
  );
  let segmentDistance = totalDistance / 23;

  for (let i = 0; i < 23; i++) {
    let segmentPoint = {
      lat:
        origin.lat +
        (i * segmentDistance * (dest.lat - origin.lat)) / totalDistance,
      lng:
        origin.lng +
        (i * segmentDistance * (dest.lng - origin.lng)) / totalDistance,
    };

    // Skip this waypoint if it is not within the crime data boundaries
    if (
      segmentPoint.lat < minLat ||
      segmentPoint.lat > maxLat ||
      segmentPoint.lng < minLng ||
      segmentPoint.lng > maxLng
    ) {
      continue;
    }

    let closestPoint = null;
    let minDistance = Infinity;

    for (let point of filteredData) {
      let distance = Math.sqrt(
        Math.pow(segmentPoint.lat - point.location.lat(), 2) +
          Math.pow(segmentPoint.lng - point.location.lng(), 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }

    if (closestPoint) {
      waypoints.push({
        location: closestPoint.location,
        weight: closestPoint.weight,
      });
    }
  }

  return waypoints;
}
