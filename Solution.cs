
using System;

public class Solution
{
    private static readonly int NUMBER_OF_SIDES = 3;

    public double LargestTriangleArea(int[][] points)
    {
        double[] triangleSides = new double[NUMBER_OF_SIDES];
        double maxTriangleArea = 0;

        for (int first = 0; first < points.Length - 2; ++first)
        {

            for (int second = first + 1; second < points.Length - 1; ++second)
            {
                triangleSides[0] = calculateDistance(points[first], points[second]);

                for (int third = second + 1; third < points.Length; ++third)
                {
                    triangleSides[1] = calculateDistance(points[first], points[third]);
                    triangleSides[2] = calculateDistance(points[second], points[third]);

                    if (isTriangle(triangleSides))
                    {
                        maxTriangleArea = Math.Max(maxTriangleArea, calculateArea(triangleSides));
                    }
                }
            }
        }

        return maxTriangleArea;
    }

    private double calculateDistance(int[] pointOne, int[] pointTwo)
    {
        double xDistance = pointOne[0] - pointTwo[0];
        double yDistance = pointOne[1] - pointTwo[1];
        return Math.Sqrt(xDistance * xDistance + yDistance * yDistance);
    }

    private bool isTriangle(double[] triangleSides)
    {
        return (triangleSides[0] + triangleSides[1] > triangleSides[2])
                && (triangleSides[0] + triangleSides[2] > triangleSides[1])
                && (triangleSides[1] + triangleSides[2] > triangleSides[0]);
    }

    // Heron's formula
    private double calculateArea(double[] triangleSides)
    {
        double halfPerimeter = (triangleSides[0] + triangleSides[1] + triangleSides[2]) / 2;
        return Math.Sqrt(halfPerimeter
                * (halfPerimeter - triangleSides[0])
                * (halfPerimeter - triangleSides[1])
                * (halfPerimeter - triangleSides[2]));
    }
}
