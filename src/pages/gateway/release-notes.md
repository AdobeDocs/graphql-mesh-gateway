---
title: Release notes
description: This page lists changes that were made in each version of API Mesh for Adobe Developer App Builder.
---

# Release notes

The following sections indicate when updates were made to API Mesh for Adobe Developer App Builder.

## Jan 15, 2023

We have made the following changes since the API Mesh beta:

### Enhancements

- Mesh errors will now be surfaced to the user via the mesh:status command. This will alleviate issues where users did not know why their mesh is erroring
- Mesh updates that result in an error will not overwrite the existing working mesh
- Mesh provisioning will now take up to 5 minutes and the status of the mesh can be queried using the mesh:status cli command
- RequestIds should be surfaced to the user for all error messages. We can use this requestid to troubleshoot errors
- Mesh update bug has been fixed in V2
- Users will have the ability to look at response times for each source via the response data
- Users will need to run the update command to update their meshes to move to the V2 code base
- Any meshes with CORS will need to be updated correctly before running an update

### Bug Fixes
