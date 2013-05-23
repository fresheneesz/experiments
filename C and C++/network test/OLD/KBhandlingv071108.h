#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
#	include <conio.h>
#	include <stdio.h>

#else	//#elif defined(SYSV) || defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
//#	include <sys/time.h>
#	include <stdio.h>
#	include <stdlib.h>
#	include <unistd.h>
#	include <termios.h>
	struct termios term_settings,term_settings_saved;
#endif

int gechnr()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		int temp;
		temp = getch();
		if(temp == '\r')
		{	temp='\n';
		}
		return temp;
	#else//#elif defined(SYSV)	|| defined(DSYSV)	// System V Unix - SYSV and DSYSV apparently don't cover it, so we assume SysV unix
		int temp;
		if (tcgetattr(STDIN_FILENO,&term_settings))
			return -1;
		term_settings_saved=term_settings;
		term_settings.c_lflag &= ~ICRNL;
		term_settings.c_lflag &= ~ICANON ;
		term_settings.c_lflag &= ~ECHO ;
		term_settings.c_cc[VMIN]=1;
		term_settings.c_cc[VTIME]=0;
		term_settings.c_cc[VINTR]=0xFF;
  		term_settings.c_cc[VSUSP]=0xFF;
  		term_settings.c_cc[VQUIT]=0xFF;
		if (tcsetattr(STDIN_FILENO, TCSANOW, &term_settings) < 0)
		{	tcsetattr(STDIN_FILENO, TCSANOW, &term_settings_saved);
			return -1;
		}
		temp = getchar();
		tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
		return temp;
	#endif
}

int gechr()
{	int temp;
	temp = gechnr();
	if(temp == '\b')
	{	printf("\b \b");
	}
	else
	{	printf("%c",temp);
	}
	return temp;
}

int gechrInternal()
{	int temp;
	temp = gechnr();
	if(temp != '\b')
	{	printf("%c",temp);
	}
	return temp;
}

int numDC=0; //number of Deletable Characters

int gech()
{	int temp;
	temp = gechrInternal();
	if(temp == '\b')
	{	if(numDC>0)
		{	numDC-=1;
			printf("\b \b");
			return temp;
		}
		else
		{	return gech();
		}
	}
	else if(temp == '\n')
	{	numDC=0;
		return temp;
	}
	else
	{	numDC+=1;
		return temp;
	}
}

int gechn()
{	char temp;
	temp = gechnr();
	if(temp == '\b')
	{	if(numDC>0)
		{	numDC-=1;
			return temp;
		}
		else
		{	return gechn();
		}
	}
	else if(temp == '\n')
	{	numDC=0;
		return temp;
	}
	else
	{	numDC+=1;
		return temp;
	}
}

int khit()
{	
	#if defined(_WIN32) || defined(WIN32) || defined(__CYGWIN__)
		return kbhit();
	#else
		if (tcgetattr(STDIN_FILENO,&term_settings))
			return false;
		term_settings_saved=term_settings;
		term_settings.c_lflag &= ~ICRNL;
		term_settings.c_lflag &= ~ICANON ;
		term_settings.c_cc[VMIN]=0;
		term_settings.c_cc[VTIME]=0;
		term_settings.c_cc[VINTR]=0xFF;
  		term_settings.c_cc[VSUSP]=0xFF;
  		term_settings.c_cc[VQUIT]=0xFF;
		if (tcsetattr (STDIN_FILENO, TCSANOW, &term_settings) < 0)
		{	tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
			return false;
		}
		fd_set obscureFileDescriptorThing;
		FD_SET(STDIN_FILENO, &obscureFileDescriptorThing);
		struct timeval TimeZero;
		TimeZero.tv_sec=0; TimeZero.tv_usec=0;
		int test=select(1,&obscureFileDescriptorThing,0,0,&TimeZero);
		
		tcsetattr (STDIN_FILENO, TCSANOW, &term_settings_saved);
		if(test==1)
			return true;
		else
			return false;
	#endif
}


// gets num characters and puts them in 'a'
void gechars(char* a, int num)
{	int n;
	for(n=0; n<num; n++)
	{	a[n]=getchar();
		if(a[n]==-1)
		{	a[n]=0;
			return;
		}
	}
	a[n]=0;
}

// gets chacters until a certain one, and returns the number of characters gotten
int gechars(char* a, char end)
{	int n;
	for(n=0; (a[n]=getchar())!=end; n++)
	{	if(a[n]==-1)
		{	a[n]=0;
			return n-1;
		}
	}
	a[n+1]=0;
	return n;
}

// not meant to be used publically
// this function was jacked from BillysStrings....h
bool isIn_forKBHandling(char a, char* ins)
{	for(int m=0; ins[m]!=0; m++)
	{	if(a==ins[m])
		{	return true;
		}
	}
	return false;
}

// gets chacters until reaching one of a number of characters
// returns the number of characters gotten
int gechars(char* a, char* ends)
{	int n;
	for(n=0; !isIn_forKBHandling(a[n]=getchar(), ends); n++)
	{	if(a[n]==-1)
		{	a[n]=0;
			return;
		}
	}
	a[n+1]=0;
	return n;
}

/*
function searchFor($searchString, $inString, $nStart)		// returns the index of the character after the search string
{	$searchState = 0;
	$contentLength = strlen($inString);
	$searchStringLen = strlen($searchString);
	for($n=$nStart; $n<$contentLength; $n++)		// search for "Alexatrafficrankbased"
	{	if($searchState == $searchStringLen)
		{	return $n;
		}
		else if($inString[$n]==" " || $inString[$n]=="\t" || $inString[$n]=="\n")
		{	// do nothing
		}
		else if($inString[$n] == $searchString[$searchState])
		{	$searchState++;
		}
		else 
		{	$searchState = 0;
		}
	}
	
	return -1;
}


function storeSearchFor($searchString, $inString, $nStart, $storeString)		// same as searchFor above, but stores the string in between
{	$storeString = "";		// clear storeString
	$searchState = 0;
	$contentLength = strlen($inString);
	$searchStringLen = strlen($searchString);
	for($n=$nStart; $n<$contentLength; $n++)		// search for "Alexatrafficrankbased"
	{	//echo "n: $n   content: {$inString[$n]}\n";
		
		if($n-$nStart > $searchStringLen)
		{	$storeString = $storeString . $inString[$n-$searchStringLen-1];
		}
		
		if($searchState == $searchStringLen)
		{	return $n;
		}
		else if($inString[$n]==" " || $inString[$n]=="\t" || $inString[$n]=="\n")
		{	// do nothing
		}
		else if($inString[$n] == $searchString[$searchState])
		{	$searchState++;
		}
		else 
		{	$searchState = 0;	
		}
	}
	
	//if search term was not found
	return -1;
	
}
*/
