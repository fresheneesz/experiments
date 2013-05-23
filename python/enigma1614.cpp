#include <iostream>
#include <iomanip>
#include <sstream>
#include <string>

using namespace std;

int main (int argc, char * const argv[]) {
    cout << "Enigma 1614 Solver";
	int i = 1;
	int primes[10000];
	int factors[1000];
//	int primeFactors[50];
	int factorCount;
	int primesCount=0;
	int primeFactorCount;
	int maxCount = 10000;
	string answers[10000];
	int	answerCount = 0;
	stringstream ss;
	while (i<maxCount) {
		factorCount = 0;
		primeFactorCount = 0;
		cout << "Testing " << i << "." << endl;
		for (int j=2; j<= i/2 ; j++) {
			if (i%j == 0) {
				factors[factorCount]=j;
				factorCount++;
			}
		};
		if (factorCount == 0) {
			primes[primesCount]=i;
			primesCount++;
			cout << "\t" << i << " is prime!" << endl;
		} else {
			cout << "\t" << i << " has " << factorCount << " factors.\t\t";
			for (int k=0; k<= factorCount/2; k++) {
				if (k!=0) {
					cout << ", ";
				}
				cout << factors[k] << "x" << factors[factorCount-(1+k)];
				for (int l=0; l < primesCount ; l++) {
					if (factors[k] == primes[l]) {
						for (int m=primesCount; m > l; m--) {
							if (factors[factorCount-(1+k)] == primes[m]) {
								char answerString[100];
								char buffer[10];
								sprintf(answerString, "%d", i);
								strcat(answerString, " has prime factor pair ");
								sprintf(buffer, "%d", factors[k]);
								strcat(answerString, buffer);
								strcat(answerString, "x");
								sprintf(buffer, "%d", factors[factorCount-(1+k)]);
								strcat(answerString, buffer);
								//ss << i << " has prime factor pair " <<  << "x" << factors[factorCount-(1+k)];
								answers[answerCount] = answerString;
								answerCount++;
								//ss.ignore(100);
							}
						}
					}
				}
			}
			cout << "." << endl;
		}
		
		i++;
	}
	for (int o= 0 ; o < answerCount; o++) {
		cout << answers[o] << endl;
	}
    return 0;
}