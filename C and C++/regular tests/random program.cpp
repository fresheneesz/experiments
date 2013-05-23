// multidimensional array
#include <iostream.h>

#define SUPABLEH 3
#define RAPAGE cout << "i say madame, rapage\n", \
cin >> global, cout << "\b\b", cin >>global;

    int global=0;
    inline void rabbit();
    int bunny(int);

int main () {
    int a,b=3;
    char c='c';
 
   cin >> a;
   if(a)
    cout<<"bleh";
    else if(b==3)
        cout <<"moo";
        else 
        cout <<'j';
    
  if(a>0) {
      cout << "alright";
  
  if(1)
    cout<<"yo";
    cin>>a;
    
    a=bunny(a);
           
	}    
}

int bunny(int a) {
    int b=2,c=3;
    char x,y,z;
    
    RAPAGE
    rabbit();    
    
    a++;
    b--;
    ++c;
    cout << ++a << a;
    
    cout << b-c;
    cout << (float)c/b << "\n";
    cout << float (c)/b;
    cin >> a;
    a=b%c;
    b=c*8;
                    // bitwise operators: >> << & ~ and | are stupid but can also be used compoundly with = e.g. &= or >>=    
    return a;


}


void rabbit() {
    
    short a=2;                   // 2 bytes - from -32768 to 32767
    int b=1;                     // 2 to 4 bytes - depends on system
    long c=-2;                   // 4 bytes - from -2147483648 to 2147483647
    
    unsigned short h=34;         // 0 to 65535
    unsigned int i;              // depends on system
    unsigned long j;             // 0 to 4294967295
    signed char number;            // 1 byte from -128 to 127    - stores a nubmer, not a character
    unsigned char number2;        // 1 byte from 0 to 255        - stores a nubmer, not a character
    int array[5]={3,4,5,2,3};
    int array2[]={3,5,3,4,2,5325252,3,233,32};
    
    char z='z';                    // 1 byte - from -128 to 127    - char stores a character, not a number
    wchar_t y='F';
    char x[]="what the fuck";
    char w[]={'b','i','l','l','y','\0'};
    
    float m=3.428933;            // stores up to 7 digits
    double n=3.4029e15;         // stores up to 15 digits
    long double l=5.298e19 ;    //stores up to 19 digits
    
    bool troo=1;
    
    
    cout << a;
    cout << "you suck\n";
    cout << "b is:\t " << b << "\n";
    cout << "what does carriage return do\r", // cin >> a;  // \r goes to the beggining of a line
    cout << "\v";                                       //seems useless, outputs a weird circly character
    cout << "hello\b";                                    // \b goes back one space but doesn't delete the character (sort of like carriage return)
    //cin >> a;
    cout << "what is global: " << global;
    cout << "beep\a", cout << "we can \
say \"cheese\"" << "\'what\'";                         //  \ allows for putting a constant on multiple lines
    cout << glo\
bal;                                            // again \ allows for putting any constant on multiple lines
    cout << \
"ok look at that!";                            // again \ allows for putting anything on multiple lines
    cout << " huh ? what\?", // cin >> a;                // \? seems useless... you can just write a ?
    cout << "last" " thing \\" "mhm"
    " yea\t it sounds good \n";
    cout << "whats going " << a << "on "  << b << "here" << x;
    cin >> a;
    
}    

