---
title: Hooks transform
description: Learn how to use the Hooks transform to add hooks before and after querying your mesh.
---

# Hooks transform

The Hooks transform allows you to invoke a composable [local or remote](#local-vs-remote-functions) function on a particular operation.

## Types of hooks

The following sections describe how to invoke hooks at different points during the query.

### BeforeAll

The `BeforeAll` hook occurs before the query takes place. 

### Before

### After

### AfterAll


## Blocking

Both `before` and `beforeall` hooks accept the `blocking` argument, which allows you to stop running hooks for a query that does not receive a successful response.

## Local vs remote functions

Hooks transform


Questions 

- Define Resolver/composer/blocking

- What is the difference between before/before all and after/after all? e.g. if last source has after does that = after all?
- You should use resolvers to restrict returned data instead of using after all restrictions?
- Local vs remote? Define and when to use
- Can’t change request?
- When are we publishing this? Approx

Hooks can come before/after an action, (including query or a specific query), 

Before all is an object not an array. (Before the operation has started executing), best place for an authentication layer, 
	composer = function you will be running, url or local file,
	composer defines what should be done at the hook
	
	blocking determines what is done, so if an error occurs the 		rest of the query is not executed. Stop execution and wait for successful response. An error causes the request to stop, error message will be passed on.

Before all is before query time

BEFORE - can be an array, if you query available stores, right before it resolves it runs the compose function, and waits for response. Other queries will resolve as normal even if the query is blocked. 

Call before each queried 
	

If multiple objects use the same resolver, if the blocking hook does not return a success it will not call the resolver. Chronologically otherwise. 

After hooks can’t be blocked because data is already resolved. 

After all is a single function, non blocking, 

Reference local files in handlers section, do not need to create a new file, all local files must be in the mesh, in the files array.

How functions are structured in before vs after

Root 
Args
Context
Info


We advis using this structure for hook transforms 

When to use a local vs remote


END OF NOVEMBER




Can add before or after schema, can add for a source or for a whole mesh

Looks like

{
resolver: string
composer: string
blocking: boolean
}

Blocking is false by default

Response e.g.
{
 Status: “Success”,
 Message: “asdf”
}

types: 
- Before All  (single function, could be an array if Revanth changes)
- Before  (array)
- After (array)
- After All (single function) runs immediately before returning response

Can block resolver invocation by throwing an error in before hooks. After hook you can’t stop because its published

Hooks may need to be limited, because the more you add the longer the processing time. (In non-commerce instances, a second or two might not be a big deal - Nishant)


User Story
1. Authenticate user before all operations
2. Add a check to look for storeCode in headers before executing availableStores query
3. Create a cart in a 3rd party store when Create Cart Mutation is called
4. Publish event once all operations are executed



Transforms only work on responses, not requests.
Currently can’t change request and response, 

List of best practices in docs. “Hooks shouldn’t manipulate anything” If you want to manipulate, use resolvers.


Use case 3 will check for infinite loops, and rate checking


Local function vs remote function: need to know when to use which









