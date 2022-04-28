# todo-mern-stack
Todo web application using MERN stack and TailwindCSS

# API
### AUTH ROUTE:
  * &nbsp; **POST** "/api/v1/auth/register" : REGISTER NEW USER
  * &nbsp; **POST** "/api/v1/auth/login" : USER LOG IN

### USER ROUTE:
  * **PUT** "/api/v1/users/:id" : UPDATE INFORMATION OF SPECIFIC USER
  * **DELETE** "/api/v1/users/:id" : DELETE A SPECIFIC USER
  * **GET** "/api/v1/users/:id" : GET A SPECIFIC USER

### TASK ROUTE:
  * **POST** "/api/v1/tasks/create" : CREATE A NEW TASK
  * **PUT** "/api/v1/tasks/:id" : UPDATE A SPECIFIC TASK INFORMATION
  * **PATCH** "/api/v1/tasks/:id/complete" : UPDATE IS COMPLETE VALUE OF A SPECIFIC TASK
  * **DELETE** "/api/v1/tasks/:id" : DELETE A SPECIFIC TASK
  * **GET** "/api/v1/tasks/:id" : GET A SPECIFIC TASK
  * **GET** "/api/v1/tasks/all/:userId" : GET ALL TASKS OF A SPECIFIC USER
  * **DELETE** "/api/v1/tasks/deleteAll/:userId" : DELETE ALL TASKS OF A SPECIFIC USER
