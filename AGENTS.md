🔒 User Authentication API Requirements
1. Account Creation (Registration)
To create an account, the user must provide a unique username (or email) and a password. The requirement is that the chosen username must not already exist in the system, and the password must meet any defined security criteria (e.g., minimum length, complexity). The prompt involves sending the user's desired username and password to the server. The server's immediate requirement is to hash the provided password before storing the new user record.

2. User Login (Authentication)
To log in, the user must provide their correct username (or email) and password. The system requires that the provided username exists and that the provided password, when hashed, matches the stored password hash for that user. The successful prompt results in the server issuing an authentication token (e.g., a JWT) or starting a session for the user. All subsequent API calls require this token/session to identify the user.

📝 To-Do List API Requirements
1. Add New Task (Create)
To add a new task, the user's API request must include the task description (the actual work item) and the due date for the task. The system requires that the user is authenticated (via a token/session) so the new task can be correctly associated with their User ID. The prompt must provide a concise description (string) and a valid date format (e.g., YYYY-MM-DD).

2. View Tasks (Read)
To view tasks (either all or for a specific day), the only critical requirement is that the user must be authenticated. The system uses the active authentication token or session to identify the User ID and retrieve only the tasks belonging to that specific user. If the user is requesting tasks for a specific date, they must also provide the target date in the request (e.g., as a query parameter).

3. Edit Task Content (Update)
To edit an existing task, the user must be authenticated and provide the unique Task ID of the item they wish to change. The system's primary requirement is verification: the User ID from the authentication token must match the User ID associated with the Task ID provided. The prompt must also include the specific fields to be updated, such as the new task description or the new due date.

4. Mark Task Complete (Update Status)
To mark a task as complete (or incomplete), the user must be authenticated and provide the unique Task ID. As with editing content, the system must verify that the authenticated user owns the task corresponding to the Task ID. The prompt simply requires the Task ID, and the system sets the is_completed status field to TRUE.

5. Delete Task (Delete)
To delete a task, the user must be authenticated and provide the unique Task ID of the item they want to remove. The core requirement is ownership verification: the system must confirm that the User ID associated with the Task ID matches the authenticated user before permanently removing the record from the database.
