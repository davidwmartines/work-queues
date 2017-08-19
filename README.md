# Work Queues
Demontrates a full-stack JavaScript application.  

**Frameworks / technologies used:**
* UI 
  * React
  * Redux
  * websocket (native)
* API 
  * Node.js, Express
  * JsonWebToken (jwt) authentication
  * Redis
  * websocket ([ws](https://github.com/websockets/ws))
  * messaging ([amqp-bus](https://github.com/d5172/amqp-bus))
* RabbitMQ
* Micro-services
  * Node.js
  * Messaging ([amqp-bus](https://github.com/d5172/amqp-bus))
  * MongoDB

## What it does
This is a generic, multi-user Work Queue (i.e. a glorified To-Do List), that could be applicable to a variety of domains.  

Users are associated to one or more Groups.

Administrator creates WorkItems, associating them to Groups.

As WorkItems are created, users who are logged in will see the new WorkItems appear in their list (websocket push), if the WorkItem is associated to one of the user's assigned Groups.   

A user can claim WorkItems as their own.  When a user claims a WorkItem, any users who also have the WorkItem in their list will see it become claimed (again, websocket push).  Likewise, users can complete as well as un-claim WorkItems, and other users should see these changes in the list as they happen in "real" time.

## Architecture
The workflows are primarily driven by an asynchronous event model.  As state changes, events are published.  Subscribers handle events.  A Notification service uses special, user-specific event messages to notifiy the all the active UI clients.
