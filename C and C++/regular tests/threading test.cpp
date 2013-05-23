#include <pthread.h>
#include <stdio.h>

void* shank(void* a)
{	 getchar();
	printf("hawt\n");
	return 0;
}

main()
{	int        thr_id;
    pthread_t  p_thread;
    int        a = 1;  
    int        b = 2;  

    thr_id = pthread_create(&p_thread, NULL, shank, (void*)&a);
    
     getchar();
    printf("MOOSE\n");
    getchar();
     getchar();
      getchar();
       getchar();
        getchar();
         getchar();

}
