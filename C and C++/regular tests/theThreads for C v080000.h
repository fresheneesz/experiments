#include <pthread.h>
#include "definebool.h"

// MUST compile with -pthreadpre

typedef pthread_t thread;

bool startThread(thread* theThread, void* (*threadFunc)(void*), void* args)
{	return pthread_create(theThread, 0, threadFunc, args);
}

void waitonThread(thread* theThread)
{	pthread_join(*theThread, NULL ); // wait for them to finish
}

typedef pthread_mutex_t mutex;

void mutexConstruct(mutex* a)
{	pthread_mutex_init(a, 0);
}

void mutexL(mutex* a)
{	pthread_mutex_lock(a);
}

void mutexUL(mutex* a)
{	pthread_mutex_unlock(a);
}
