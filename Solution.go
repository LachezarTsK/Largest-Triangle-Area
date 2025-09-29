
package main
import "math"

const NUMBER_OF_SIDES = 3

func largestTriangleArea(points [][]int) float64 {
    triangleSides := make([]float64, NUMBER_OF_SIDES)
    maxTriangleArea := 0.0

    for first := 0; first < len(points) - 2; first++ {

        for second := first + 1; second < len(points) - 1; second++ {
            triangleSides[0] = calculateDistance(points[first], points[second])

            for third := second + 1; third < len(points); third++ {
                triangleSides[1] = calculateDistance(points[first], points[third])
                triangleSides[2] = calculateDistance(points[second], points[third])

                if isTriangle(triangleSides) {
                    maxTriangleArea = max(maxTriangleArea, calculateArea(triangleSides))
                }
            }
        }
    }

    return maxTriangleArea
}

func calculateDistance(pointOne []int, pointTwo []int) float64 {
    xDistance := float64(pointOne[0] - pointTwo[0])
    yDistance := float64(pointOne[1] - pointTwo[1])
    return math.Sqrt(xDistance * xDistance + yDistance * yDistance)
}

func isTriangle(triangleSides []float64) bool {
    return (triangleSides[0] + triangleSides[1] > triangleSides[2]) &&
            (triangleSides[0] + triangleSides[2] > triangleSides[1]) &&
            (triangleSides[1] + triangleSides[2] > triangleSides[0])
}

// Heron's formula
func calculateArea(triangleSides []float64) float64 {
    halfPerimeter := (triangleSides[0] + triangleSides[1] + triangleSides[2]) / 2
    return math.Sqrt(halfPerimeter *
            (halfPerimeter - triangleSides[0]) *
            (halfPerimeter - triangleSides[1]) *
            (halfPerimeter - triangleSides[2]))
}
