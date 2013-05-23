/*	This file was created by Billy Tetrud. Use of this file is free as long as it is credited.
*/

#include <stdlib.h>

// copies to = from
void Scopy(char* to, char* from)
{	int m;
	for(m=0; from[m]!=0; m++)
	{	to[m]=from[m];
	}
	to[m]=0;
}	

/*/ returns true if isThis is greater than gtThis by ascii alphabetical order
bool SGT(char* isThis, char* gtThis)
{	
}
*/

/*/ returns true if isThis is less than ltThis by ascii alphabetical order
bool SLT(char* isThis, char* ltThis)
{	
}*/

// returns true if strings are the same
bool SEQ(char* a, char* b)
{	int n;
	for(n=0; a[n]!=0; n++)
	{	if(a[n]!=b[n])
			return false;
	}
	if(a[n]!=b[n])
		return false;
	else
		return true;
}

// returns true if "b" is the substring of "a" starting from "n"
bool Scontain(char* a, char* b, int n)
{	for(; a[n]!=0; n++)
	{	if(a[n]!=b[n])
			return false;
	}
		return true;
}

// concatinates strings
//  atEndOfThis = (atEndOfThis putThis)
// returns a reference to the atEndOfThis string
char* Scat(char* atEndOfThis, char* putThis)
{	int n;
	for(n=0; atEndOfThis[n]!=0; n++)
	{}	// now a[n]==0
	int m;
	for(m=0; putThis[m]!=0; m++)
	{	atEndOfThis[n]=putThis[m];
		n++;
	}
	atEndOfThis[n]=0;	
	return atEndOfThis;
}

// concatinates strings
//  atEndOfThis = (atEndOfThis putThis)
// returns a reference to the atEndOfThis string
char* Scat(char* atEndOfThis, char putThis)
{	int n;
	for(n=0; atEndOfThis[n]!=0; n++)
	{}	// now a[n]==0
	atEndOfThis[n]=putThis;
	atEndOfThis[n+1]=0;	
	return atEndOfThis;
}

// string length
int Slen(char* a)
{	int n=0;
	for(; a[n]!=0; n++)
	{}
	return n;
}

// string to integer
int Sti(char* a)
{	return atoi(a);
}

// integer to string
char* itS(int a, char* b)
{	int n=0;
	if(a<0)
	{	b[0]='-';
		n=1;
	}
	while(a>0)
	{	b[n] = a%10;
		n++;
		a/=10;
	}
	return b;
}

// tests if every character in 'a' is 'in'
bool allEQ(char* a, char in)
{	int n;
	for(n=0; a[n]!=0; n++)
	{	if(a[n]!=in)
			return false;
	}
	return true;
}

// tests if all characters in the subarray defined by 'index' is 'in'
bool allEQ(char* a, int* index, char in)	// index is a -1 ending array of indecies that correspond to elemetns of a to test
{	for(int n=0; index[n]!=-1; n++)
	{	if(a[index[n]]!=in)
			return false;
	}
	return true;
}

// tests if every character in 'a' is in 'ins'
bool allIn(char* a, char* ins)
{	int n;
	for(n=0; a[n]!=0; n++)
	{	bool found=false;		// whether a[n] was found in ins
		int m;
		for(m=0; ins[n]!=0; m++)
		{	if(a[n]==ins[m])
			{	found = true;
				break;
			}
		}
		if(!found)
			return false;
	}
	return true;
}

// tests if character 'a' is in 'ins'
bool isIn(char a, char* ins)
{	for(int m=0; ins[m]!=0; m++)
	{	if(a==ins[m])
		{	return true;
		}
	}
	return false;
}

// writes mult copies of a into output
char* Smult(char* a, int mult, char* output)
{	int count=0;
	for(int n=0; n<mult; n++)
	{	for(int m=0; a[m]!=0; m++)
		{	output[count]=a[m];
			count++;
		}
	}
	return output;
}

// returns index after the skipChars
int skipChars(char* theChars, char* inThis, int startingHere)
{	int skipCharsLen = Slen(theChars);
	int n;
	for(n=startingHere; isIn(inThis[n],theChars); n++)
	{	//work is done up there ^	
	}
	return n;
}

// returns the index of the character after the search string
// returns -1 if it doesn't find the searchForThis string
int find(char* searchForThis, char* inThis, int startingHere)
{	int searchState=0;
	int contentLength = Slen(inThis);
	int searchStrLength = Slen(searchForThis);
	
	for(int n=startingHere; n<contentLength; n++)
	{	if(searchState == searchStrLength)
		{	return n;
		}
		else if(inThis[n] == searchForThis[searchState])
		{	searchState++;
		}
		else 
		{	searchState = 0;
		}
	}
	
	return -1; // didn't find it
}

// finds the searchForThis string and stores the characters 
// between the startingHere value and the character before the searchForThis string starts
// Should work even if "inThis" is the same string as "storeHere"
// Probably will not work if "searchForThis" is the same as "storeHere"
// returns the index of the character after the search string
// returns -1 if it doesn't find the searchForThis string
int find(char* searchForThis, char* inThis, int startingHere, char* storeHere)
{	
	int searchState=0;
	int contentLength = Slen(inThis);
	int searchStrLength = Slen(searchForThis);
	
	int n;
	for(n=startingHere; n<contentLength; n++)
	{	if(n-startingHere > searchStrLength)
		{	storeHere[n-searchStrLength-startingHere-1] = inThis[n-searchStrLength-1];
		}
		
		if(searchState == searchStrLength)
		{	storeHere[n-searchStrLength-startingHere] = 0;
			return n;
		}
		else if(inThis[n] == searchForThis[searchState])
		{	searchState++;
		}
		else 
		{	searchState = 0;
		}
	}
	
	for(n = contentLength-searchStrLength-1; n<contentLength; n++)
	{	storeHere[n-startingHere] = inThis[n];
	}
	
	storeHere[n-startingHere] = 0;
	return -1; // didn't find it
}
