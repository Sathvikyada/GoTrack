# GoTrack - Run-Log Scalable-Web-App
This project is a scalable web application built using a microservices architecture to ensure high availability, load balancing, and efficient handling of asynchronous operations. Key technologies include Svelte for the client-side, Node.js for backend services, Docker for containerization, and PM2 for process management.

**Key Features**
Client-Side with Svelte: Built the front end using Svelte to leverage its lightweight components and reactive stores, optimizing for performance, responsiveness, and maintainability.

Microservices Architecture: Developed and deployed multiple independent, horizontally scalable microservices to handle specific functions within the application, achieving load distribution across services and enabling easy scaling.

Containerization with Docker: Each microservice is isolated and containerized using Docker, allowing for modular deployment, easy updates, and version control across different environments.

Backend with Node.js: Utilized Node.js for backend services, enabling efficient data handling and asynchronous operations, ideal for high-throughput demands in a scalable web application.

Process Management and Load Testing: Implemented PM2 for managing microservices processes and performed load testing to ensure each service's stability and efficiency under high demand.

Pub-Sub Design Pattern: The application architecture follows a pub-sub design pattern, separating frontend and backend services to improve scalability, reduce interdependencies, and enhance communication efficiency.

**Technology Stack**
- Frontend: Svelte, HTML, CSS, JavaScript
- Backend: Node.js, Indexed.DB, JavaScript
- Docker Containerization
- Pub-Sub Patter
