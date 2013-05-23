#include <stdio.h>
#include <time.h>
#include <windows.h>

main()
{	int a1, a2=0, b1, b2=0, c1, c2=0, d1, d2=0; 
	int length=1000;
	
	for(int m=0; m<length; m++)
	{	a1=clock();
		system("noth.exe");
		a2+=clock()-a1;
		
		b1=clock();
		WinExec("noth.exe",SW_SHOWNORMAL);
		b2+=clock()-b1;
		
		c1=clock();
		STARTUPINFO          si = { sizeof(si) };
		PROCESS_INFORMATION  pi;
		char                 szExe[] = "noth.exe";

		if(CreateProcess(0, szExe, 0, 0, FALSE, 0, 0, 0, &si, &pi))
		{
		   // optionally wait for process to finish
		   //WaitForSingleObject(pi.hProcess, INFINITE);
		
		   CloseHandle(pi.hProcess);
		   CloseHandle(pi.hThread);
		}
		else
		{ 	printf("WRONG");
			getchar();
		}

		c2+=clock()-c1;
	
	/*
		d1=clock();
		int d(54);
		d2+=clock()-d1;
	*/	
		
		
	}
	
	printf("\nfirst: %d",a2);
	printf("\nfirst: %d",b2);
	printf("\nfirst: %d",c2);
	printf("\nfirst: %d",d2);
	
	
	getchar();
	
}
