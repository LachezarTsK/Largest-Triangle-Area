
#include <span>
#include <cmath>
#include <array>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {

    static const int NUMBER_OF_SIDES = 3;

public:
    double largestTriangleArea(vector<vector<int>>& points) const {
        array<double, NUMBER_OF_SIDES> triangleSides{};
        double maxTriangleArea = 0;

        for (int first = 0; first < points.size() - 2; ++first) {

            for (int second = first + 1; second < points.size() - 1; ++second) {
                triangleSides[0] = calculateDistance(points[first], points[second]);

                for (int third = second + 1; third < points.size(); ++third) {
                    triangleSides[1] = calculateDistance(points[first], points[third]);
                    triangleSides[2] = calculateDistance(points[second], points[third]);

                    if (isTriangle(triangleSides)) {
                        maxTriangleArea = max(maxTriangleArea, calculateArea(triangleSides));
                    }
                }
            }
        }

        return maxTriangleArea;
    }

private:
    double calculateDistance(span<const int> pointOne, span<const int> pointTwo) const {
        double xDistance = pointOne[0] - pointTwo[0];
        double yDistance = pointOne[1] - pointTwo[1];
        return sqrt(xDistance * xDistance + yDistance * yDistance);
    }

    bool isTriangle(span<const double> triangleSides) const {
        return (triangleSides[0] + triangleSides[1] > triangleSides[2])
                && (triangleSides[0] + triangleSides[2] > triangleSides[1])
                && (triangleSides[1] + triangleSides[2] > triangleSides[0]);
    }

    // Heron's formula
    double calculateArea(span<const double> triangleSides) const {
        double halfPerimeter = (triangleSides[0] + triangleSides[1] + triangleSides[2]) / 2;
        return sqrt(halfPerimeter
                * (halfPerimeter - triangleSides[0])
                * (halfPerimeter - triangleSides[1])
                * (halfPerimeter - triangleSides[2]));
    }
};
