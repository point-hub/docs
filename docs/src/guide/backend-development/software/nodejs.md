# Node.js

Website: [https://nodejs.org/](https://nodejs.org/)

We use Node.js because its event-driven, non-blocking I/O model and JavaScript’s ubiquity across both client and server-side development. Here are several key reasons why we choose Node.js:

- **Single Language for Frontend and Backend:** With Node.js, you can use JavaScript on both the client and the server. This creates a unified development experience, which simplifies both the learning curve and code management for full-stack developers. 
- **Asynchronous and Non-blocking I/O:** Node.js is built on an asynchronous, non-blocking I/O model, which allows it to handle many operations simultaneously without waiting for one to finish before moving on to the next. This makes it particularly well-suited for I/O-heavy applications like real-time services (e.g., chat applications, live updates) and APIs.

::: warning
In our backend implementation, we use Bun as a replacement for Node.js for better integration with modern javascript like TypeScript and ESM.
:::