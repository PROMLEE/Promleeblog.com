#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include <sys/select.h>
#include <time.h>
#include <errno.h>
#include <ctype.h>
#include <pthread.h>
#include <signal.h>

#define PORT 00000
#define BUFFER_SIZE 1024
#define MAX_CLIENTS 100

fd_set master, read_fds; // master file descriptor list
int fd_max;              // maximum file descriptor number
int next_id = 1;         // next client id
int Client_num = 0;      // Client number
int request_num = 0;     // request number

typedef struct // Client Structure to store client information, especially id
{
  char ip[16];
  int port_num;
  int id;
  int connected;
} Client;

Client clients[MAX_CLIENTS]; // Array of clients

void set_non_blocking(int sockfd) // Set the socket to non-blocking mode
{
  int flags = fcntl(sockfd, F_GETFL, 0);
  fcntl(sockfd, F_SETFL, flags | O_NONBLOCK);
}

void init_clients() // Initialize the client array
{
  for (int i = 0; i < MAX_CLIENTS; i++)
  {
    clients[i].port_num = -1;
    clients[i].id = 0;
    clients[i].connected = 0;
  }
}

void add_client(int port_number, char *ip) // Add a client to the client array
{
  for (int i = 0; i < MAX_CLIENTS; i++)
  {
    if (clients[i].connected == 0) // Find the first empty slot
    {
      clients[i].connected = 1;
      strncpy(clients[i].ip, ip, 16); // Copy the ip address
      clients[i].port_num = port_number;
      clients[i].id = next_id;
      next_id++;
      break;
    }
  }
}

void remove_client(int port, char *ip) // Remove a client from the client array
{
  for (int i = 0; i < MAX_CLIENTS; i++)
  {
    if (clients[i].port_num == port && strcmp(clients[i].ip, ip) == 0) // Find the client
    {
      clients[i].port_num = -1;
      clients[i].id = 0;
      clients[i].connected = 0;
      break;
    }
  }
}
int get_clientid(int port, char *ip) // Get the client id of a client
{
  for (int i = 0; i < MAX_CLIENTS; i++)
  {
    if (clients[i].port_num == port && strcmp(clients[i].ip, ip) == 0) // Find the client
    {
      return clients[i].id;
    }
  }
  return -1;
}

int get_number() // Get the number of clients connected
{
  int count = 0;
  for (int i = 0; i < MAX_CLIENTS; i++)
  {
    if (clients[i].connected == 1) // Count the number of connected clients
    {
      count++;
    }
  }
  return count;
}

void *periodic_function(void *arg) // Periodic function to print the number of clients connected every 10 seconds
{
  char return_info[256];
  while (1)
  {
    time_t now = time(NULL);
    struct tm *tm_info = localtime(&now);
    strftime(return_info, sizeof(return_info), "%H:%M:%S", tm_info);
    printf("[Time: %s] Number of clients connected = %d\n", return_info, get_number());
    sleep(10);
  }
}

void sigint_handler(int signum) // Signal handler for Ctrl-C
{
  printf("bye bye~\n");
  exit(signum);
}

int main()
{
  int listener = socket(AF_INET, SOCK_STREAM, 0); // Create a socket for listening
  struct sockaddr_in server_addr;
  char buffer[BUFFER_SIZE];
  char return_info[256];
  pthread_t thread; // Thread for periodic function
  signal(SIGINT, sigint_handler);
  pthread_create(&thread, NULL, periodic_function, NULL); // Create a thread for periodic function to print the number of clients connected every 10 seconds

  set_non_blocking(listener); // Set the socket to non-blocking mode

  server_addr.sin_family = AF_INET;                                     // Set the server address
  server_addr.sin_addr.s_addr = INADDR_ANY;                             // Set the server address
  server_addr.sin_port = htons(PORT);                                   // Set the server address
  bind(listener, (struct sockaddr *)&server_addr, sizeof(server_addr)); // Bind the socket to the server address
  listen(listener, 5);                                                  // Listen for incoming connections
  printf("Server is ready to receive on port %d\n", PORT);
  FD_ZERO(&master);          // Clear the master and temp sets
  FD_SET(listener, &master); // Add the listener to the master set
  fd_max = listener;         // Keep track of the biggest file descriptor

  init_clients(); // Initialize the client Structure

  while (1)
  {
    read_fds = master;
    if (select(fd_max + 1, &read_fds, NULL, NULL, NULL) < 0) // Select the file descriptors
    {
      perror("select error");
      continue;
    }

    for (int i = 0; i <= fd_max; i++) // Run through the existing connections looking for data to read
    {
      if (FD_ISSET(i, &read_fds))
      {
        if (i == listener)
        {
          struct sockaddr_in client_addr;
          socklen_t addrlen = sizeof(client_addr);
          int new_sock = accept(listener, (struct sockaddr *)&client_addr, &addrlen); // Accept a new connection
          if (new_sock >= 0)
          {
            set_non_blocking(new_sock); // Set the socket to non-blocking mode
            FD_SET(new_sock, &master);  // Add the new connection to the master set
            if (new_sock > fd_max)
              fd_max = new_sock;
            char *client_ip = inet_ntoa(client_addr.sin_addr); // Get the client ip address
            int client_port = ntohs(client_addr.sin_port);     // Get the client port number
            add_client(client_port, client_ip);                // Add the client to the client Structure array
            printf("Connection request from %s:%d\n", client_ip, client_port);
            Client_num++; // Increase the number of clients connected
            time_t now = time(NULL);
            struct tm *tm_info = localtime(&now);
            strftime(return_info, sizeof(return_info), "%H:%M:%S", tm_info);
            printf("[Time: %s] Client %d connected. Number of clients connected = %d\n", return_info, get_clientid(client_port, client_ip), get_number());
          }
          else
          {
            perror("Accept failed");
          }
        }
        else
        {
          int nbytes = recv(i, buffer, BUFFER_SIZE - 1, 0); // Handle data from a client
          if (nbytes > 0)
          {
            buffer[nbytes] = '\0';
            struct sockaddr_in client_addr; // Get the client address
            socklen_t client_len = sizeof(client_addr);
            getpeername(i, (struct sockaddr *)&client_addr, &client_len) == -1;
            char *client_ip = inet_ntoa(client_addr.sin_addr); // Get the client ip address
            int client_port = ntohs(client_addr.sin_port);     // Get the client port number
            int id = get_clientid(client_port, client_ip);     // Get the client id

            char *command = strtok(buffer, "@@");
            char *data = strtok(NULL, "@@");
            if (command)
            {
              printf("Client %d, command: %s\n", id, command);
              request_num++;
              if (strcmp(command, "1") == 0 && data)
              {
                for (int j = 0; data[j]; j++)
                {
                  return_info[j] = toupper(data[j]);
                }
                send(i, return_info, strlen(data), 0);
              }
              else if (strcmp(command, "2") == 0)
              {
                time_t now = time(NULL);
                struct tm *tm_info = localtime(&now);
                strftime(return_info, sizeof(return_info), "run time = %H:%M:%S", tm_info);
                send(i, return_info, strlen(return_info), 0);
              }
              else if (strcmp(command, "3") == 0)
              {
                sprintf(return_info, "Client IP = %s, port = %d", client_ip, client_port);
                send(i, return_info, strlen(return_info), 0);
              }
              else if (strcmp(command, "4") == 0)
              {
                sprintf(return_info, "requests served = %d", request_num);
                send(i, return_info, strlen(return_info), 0);
              }
              else if (strcmp(command, "5") == 0) // Disconnect the client
              {
                time_t now = time(NULL);
                struct tm *tm_info = localtime(&now);
                strftime(return_info, sizeof(return_info), "%H:%M:%S", tm_info);
                remove_client(client_port, client_ip);
                printf("[Time: %s] Client %d disconnected. Number of clients connected = %d\n", return_info, id, get_number());
              }
            }
          }
        }
      }
    }
  }
  return 0;
}
