
/**
 * @param {number[][]} points
 * @return {number}
 */
var largestTriangleArea = function (points) {
    const NUMBER_OF_SIDES = 3;
    const triangleSides = new Array(NUMBER_OF_SIDES);
    let maxTriangleArea = 0;

    for (let first = 0; first < points.length - 2; ++first) {

        for (let second = first + 1; second < points.length - 1; ++second) {
            triangleSides[0] = calculateDistance(points[first], points[second]);

            for (let third = second + 1; third < points.length; ++third) {
                triangleSides[1] = calculateDistance(points[first], points[third]);
                triangleSides[2] = calculateDistance(points[second], points[third]);

                if (isTriangle(triangleSides)) {
                    maxTriangleArea = Math.max(maxTriangleArea, calculateArea(triangleSides));
                }
            }
        }
    }

    return maxTriangleArea;
};

/**
 * @param {number[]} pointOne
 * @param {number[]} pointTwo
 * @return {number}
 */
function calculateDistance(pointOne, pointTwo) {
    const xDistance = pointOne[0] - pointTwo[0];
    const yDistance = pointOne[1] - pointTwo[1];
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

/**
 * @param {number[]} triangleSides
 * @return {boolean}
 */
function isTriangle(triangleSides) {
    return (triangleSides[0] + triangleSides[1] > triangleSides[2])
            && (triangleSides[0] + triangleSides[2] > triangleSides[1])
            && (triangleSides[1] + triangleSides[2] > triangleSides[0]);
}

// Heron's formula
/**
 * @param {number[]} triangleSides
 * @return {number}
 */
function calculateArea(triangleSides) {
    const halfPerimeter = (triangleSides[0] + triangleSides[1] + triangleSides[2]) / 2;
    return Math.sqrt(halfPerimeter
            * (halfPerimeter - triangleSides[0])
            * (halfPerimeter - triangleSides[1])
            * (halfPerimeter - triangleSides[2]));
}
