# Project Structure

This document describes the project's folder structure, providing guidelines on how the files should be organized and the purpose of each directory.

## Directories and Their Purposes

### `/configs`

Contains global configuration files for the project, such as database configurations, environment variables, and other essential settings.

### `/definitions`

Groups core definitions used throughout the project:

-   **`/abstracts`**: Abstract classes that serve as a base for other classes.
-   **`/dtos`** (Data Transfer Objects): Objects used to transfer data between layers, especially between the network layer and the service layer.
-   **`/enums`**: Enumerations that define sets of named values for consistent use throughout the project.
-   **`/interfaces`**: Interfaces that define contracts for classes or objects, ensuring consistency in implementation.
-   **`/types`**: Custom types and type aliases for use throughout the project.

### `/exceptions`

Contains custom exception classes or methods used to handle errors and exceptional behaviors.

### `/http`

This directory deals with everything related to the HTTP protocol:

-   **`/controllers`**: Controllers that handle HTTP requests, execute business logic, and return responses.
-   **`/middlewares`**: HTTP middlewares for request processing, such as authentication, logging, etc.
-   **`/resources`**: If necessary, include resource representations like data transformers or serializers.
-   **`/routes`**: Route definitions that map URLs to specific controllers.

### `/models`

Defines data models, usually corresponding to database entities. Includes logic for querying and manipulating these data.

### `/services`

Contains business logic and application rules. Services interact with models and perform business operations, such as data creation, modification, and querying.

### `/utils`

Stores utilities and helper functions that are reusable and do not fit into other categories. May include functions for date and time, string manipulation, etc.

### `General Guidelines for Developers`

-   Place files in the directory corresponding to their primary responsibility.
-   Maintain consistency in file and directory naming.
-   Clearly document any complex or non-obvious logic in code comments.
-   Periodically review the project structure to ensure it remains clean and manageable.
