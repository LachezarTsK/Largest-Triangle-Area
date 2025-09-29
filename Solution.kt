
import kotlin.math.sqrt

class Solution {

    private companion object {
        const val NUMBER_OF_SIDES = 3
    }

    fun largestTriangleArea(points: Array<IntArray>): Double {
        val triangleSides = DoubleArray(NUMBER_OF_SIDES)
        var maxTriangleArea: Double = 0.0

        for (first in 0..<points.size - 2) {

            for (second in first + 1..<points.size - 1) {
                triangleSides[0] = calculateDistance(points[first], points[second])

                for (third in second + 1..<points.size) {
                    triangleSides[1] = calculateDistance(points[first], points[third])
                    triangleSides[2] = calculateDistance(points[second], points[third])

                    if (isTriangle(triangleSides)) {
                        maxTriangleArea = Math.max(maxTriangleArea, calculateArea(triangleSides))
                    }
                }
            }
        }

        return maxTriangleArea
    }

    private fun calculateDistance(pointOne: IntArray, pointTwo: IntArray): Double {
        val xDistance: Double = (pointOne[0] - pointTwo[0]).toDouble()
        val yDistance: Double = (pointOne[1] - pointTwo[1]).toDouble()
        return sqrt(xDistance * xDistance + yDistance * yDistance)
    }

    private fun isTriangle(triangleSides: DoubleArray): Boolean {
        return (triangleSides[0] + triangleSides[1] > triangleSides[2])
                && (triangleSides[0] + triangleSides[2] > triangleSides[1])
                && (triangleSides[1] + triangleSides[2] > triangleSides[0])
    }

    // Heron's formula
    private fun calculateArea(triangleSides: DoubleArray): Double {
        val halfPerimeter = (triangleSides[0] + triangleSides[1] + triangleSides[2]) / 2
        return sqrt(halfPerimeter
                    * (halfPerimeter - triangleSides[0])
                    * (halfPerimeter - triangleSides[1])
                    * (halfPerimeter - triangleSides[2])
        )
    }
}
