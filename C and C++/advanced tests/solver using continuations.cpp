#include <stdio.h>
#include <setjmp.h>
#include <stdlib.h>

long *pbos;

/*
 * Continuation datastructure.
 */
typedef struct cont {
	jmp_buf registers;
	int n;
	long *stack;
	/*
	 * Pointer to next continuation in chain.
	 */
	struct cont *next;
} cont;

void save_stack(cont *c,long *pbos,long *ptos) {
	int n = pbos-ptos;
	int i;

	c->stack = (long *)malloc(n*sizeof(long));
	c->n = n;
	for (i = 0; i<n; ++i) {
		c->stack[i] = pbos[-i];
	}
}

cont *getcontext() {
	cont *c = (cont *)malloc(sizeof(cont));
	long tos;
	/*
	 * Save registers
	 */
	if (!setjmp(c->registers)) {
		/*
		 * Save stack
		 */
		save_stack(c,pbos,&tos);

		return c;
	} else {
		return 0;
	}
}

cont *gcont = 0;

/*
 * Save current continuation.
 */
int save_context() {
	cont *c = getcontext();
	if (c) {
		c->next = gcont;
		gcont = c;
		return 0;
	} else {
		return 1;
	}
}

void restore_stack(cont *c,int once_more) {
  long padding[12];
	long tos;
	int i,n;
	/*
	 * Make sure there's enough room on the stack
	 */
	if (pbos-c->n<&tos) {
		restore_stack(c,1);
	}

	if (once_more) {
		restore_stack(c,0);
	}

	/*
	 * Copy stack back out from continuation
	 */
	n = c->n;
	for (i = 0; i<n; ++i) {
		pbos[-i] = c->stack[i];
	}
	longjmp(c->registers,1);
}

void exec_context(cont *c) {
	/*
	 * Restore stack
	 */
	restore_stack(c,1);
}

/*
 * Restore last continuation.
 */
void restore_context() {
	if (gcont) {
		cont *old = gcont;
		gcont = old->next;
		exec_context(old);
	} else {
		exit(1);		// why can't this just return?
	}
}

int my_main();

int main() {
	long bos;
	pbos = &bos;

	my_main();
}

#define FAIL restore_context()
#define TRY(i) if (!save_context()) { return i; }

/*
 * integer(m,n) returns an integer from m to n inclusive.
 * You can view i = integer(m,n) as the assertion
 * m<=i<=n.
 */
int integer(int m,int n) {
	int i;

	for (i = m; i<=n; ++i) {
		TRY(i);
	}

	FAIL;
}

/*
 * Solve this problem:
 * 2<=i<=100 and
 * 2<=j<=i and
 * i*j==481.
 * In other words factorise 481.
 */
int my_main() {
	int i,j;

	i = integer(2,100);
	j = integer(2,i);

	if (i*j!=10001) {
		/*
		 * If they don't factor 481 then
		 * backtrack.
		 */
		FAIL;
	}

	printf("%d %d\n",i,j);
	getchar();
}
