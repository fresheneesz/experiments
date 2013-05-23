#include <iostream.h>

    void c(int a) { cout << a;}

int main () {
    
    typedef void (*vint)(int a);
    
    vint* p;
    p= new vint[3];
    p[0]=c;
    
    int a=4,b;
    p[0](a);
    cin >> b;
}    
