<?php		/* ugh too much work */
	printf("Type hostname: ");
	for(n=0; (temp = getchar())!='\n'; n++)
	{	hostname[n] = temp;
	}
	hostname[n]=0;

	if(sock.Connect(hostname,port))
		errorFunc(ConnectErr);
	printf("Connected!\n\n");
		
		
		
		
		
	int sendMessages(void* socka)
	{	int len, temp, n;
		char message[1024];
		TCPsocket sock = *(TCPsocket*)(socka);
		
		while(1)
	    {	if(khit())
			{	printf("Send: ");
				onTheTable_len=6;
				for(n=0; (temp=gech())!='\n'; n++)
		        {	if(temp == '\b')
					{	n-=2;
						onTheTable_len--;
					}
					else
					{	message[n]=temp;
			        	onTheTable[6+n] = temp;
			        	onTheTable_len++;
					}
				}
				message[n]=0;			
				onTheTable_len=0;
				
		        len=SDLNet_TCP_Send(sock,message,n+1);   //send message to client 
			    if(len < n+1) 
			    	printf("\t\t\tSDLNet_TCP_Send: %s\n", SDLNet_GetError()); 
			    
			    if(message[0]=='e' && message[1]=='n' && message[2]=='d' && message[3]==0)
			    	break;
			}
			SDL_Delay(10);
		}
		printf("Connection has been closed (by you). Press enter to quit.\n");
		SDL_KillThread(recvThread);
	}

?>
