# Security Specification for VibeStream

## 1. Data Invariants
- A `User` document can only be created/edited by the user with the same `uid`.
- A `Playlist` must have a valid `ownerId` matching the authenticated user's `uid`.
- Playlists are private to the owner (read/write access restricted to owner).
- Document IDs must follow standard alphanumeric format.
- Timestamps (`createdAt`, `updatedAt`) must be server-validated.

## 2. The Dirty Dozen Payloads (Negative Tests)

1. **Identity Spoofing (Playlist)**: Create a playlist with an `ownerId` of another user.
2. **Identity Spoofing (User)**: Create a user profile with a `uid` different from the auth token.
3. **Write Bypass (Playlist)**: Update a playlist owned by someone else.
4. **Read Bypass (Playlist)**: Fetch a playlist owned by another user.
5. **Schema Poisoning**: Inject a 1MB string into a playlist `name`.
6. **Shadow Field Injection**: Add an `isAdmin: true` field to a user profile.
7. **Type Mismatch**: Send a `songs` field as a string instead of an array.
8. **ID Poisoning**: Use a document ID containing malicious scripts or excessive length.
9. **Timestamp Manipulation**: Set a backdated `createdAt` field on a new playlist.
10. **Orphaned Playlist**: Create a playlist without a `name`.
11. **List Scraping**: Attempt to list all playlists in the database without an owner filter.
12. **Unauthorized Metadata Update**: Update the `ownerId` of an existing playlist.

## 3. Test Runner Plan
I will generate `firestore.rules` that prevent these payloads by:
- Using `isValidId()` for path and data IDs.
- Enforcing `request.auth.uid == userId` for `/users/{userId}`.
- Enforcing `resource.data.ownerId == request.auth.uid` for `/playlists/{playlistId}`.
- Using `isValid[Entity]` helpers for strict schema validation.
- Enforcing `affectedKeys().hasOnly()` during updates.
