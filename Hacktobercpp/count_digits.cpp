#include <iostream>
using namespace std;

/* 
Given a number N, count the number of digits in N
which evenly divide N. 
Return the count of such digits.
*/

class Solution {
public:
    int evenlyDivides(int N) {
        int count = 0;
        int temp = N;

        while (temp > 0) {
            int digit = temp % 10; // Get last digit
            temp /= 10;             // Remove last digit

            // Check if digit is non-zero and divides N
            if (digit != 0 && N % digit == 0) {
                count++;
            }
        }

        return count;
    }
};

// Driver code
int main() {
    int t;
    cout << "Enter number of test cases: ";
    cin >> t;

    while (t--) {
        int N;
        cout << "Enter a number: ";
        cin >> N;

        Solution obj;
        cout << "Number of digits evenly dividing " << N << " is: "
             << obj.evenlyDivides(N) << endl;
    }

    return 0;
}
