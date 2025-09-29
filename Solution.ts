
function largestTriangleArea(points: number[][]): number {
    const NUMBER_OF_SIDES = 3;
    const triangleSides: number[] = new Array(NUMBER_OF_SIDES);
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

function calculateDistance(pointOne: number[], pointTwo: number[]): number {
    const xDistance = pointOne[0] - pointTwo[0];
    const yDistance = pointOne[1] - pointTwo[1];
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

function isTriangle(triangleSides: number[]): boolean {
    return (triangleSides[0] + triangleSides[1] > triangleSides[2])
        && (triangleSides[0] + triangleSides[2] > triangleSides[1])
        && (triangleSides[1] + triangleSides[2] > triangleSides[0]);
}

// Heron's formula
function calculateArea(triangleSides: number[]): number {
    const halfPerimeter = (triangleSides[0] + triangleSides[1] + triangleSides[2]) / 2;
    return Math.sqrt(halfPerimeter
        * (halfPerimeter - triangleSides[0])
        * (halfPerimeter - triangleSides[1])
        * (halfPerimeter - triangleSides[2]));
}
