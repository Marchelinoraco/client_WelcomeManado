# Requirements Document

## Introduction

This feature adds an Admin User Management module to the WelcomeManado admin panel. It allows the designated super admin account (`admin@welcomemanado.com`) to view, create, edit, and toggle the active status of other admin accounts. Regular admin accounts are restricted to viewing only their own profile. The feature requires a new `is_active` flag on the `users` table, a dedicated Laravel API controller, and a new Vue.js management page accessible from the sidebar.

## Glossary

- **Super_Admin**: The admin account with email `admin@welcomemanado.com`. Has full user management privileges.
- **Admin**: Any authenticated user in the `users` table who can access the admin panel.
- **Admin_Management_API**: The Laravel API endpoints under `/admin/users` that handle CRUD and status operations.
- **Admin_Management_Page**: The Vue.js page at `/admin-users` in the admin panel that renders the user management UI.
- **Auth_Store**: The Pinia store (`useAuthStore`) that holds the currently authenticated user's data.
- **is_active**: A boolean column on the `users` table. When `false`, the user cannot log in.

---

## Requirements

### Requirement 1: Database Support for Account Status

**User Story:** As a Super_Admin, I want admin accounts to have an active/inactive status, so that I can control who can access the admin panel.

#### Acceptance Criteria

1. THE Admin_Management_API SHALL add an `is_active` boolean column (default `true`) to the `users` table via a new migration.
2. WHEN a user attempts to log in and their `is_active` value is `false`, THE Admin_Management_API SHALL reject the login and return an error message indicating the account is inactive.
3. THE Admin_Management_API SHALL treat the super admin account (`admin@welcomemanado.com`) as always active, regardless of the `is_active` column value.

---

### Requirement 2: List Admin Accounts

**User Story:** As a Super_Admin, I want to view all admin accounts, so that I can monitor who has access to the panel.

#### Acceptance Criteria

1. WHEN the Super_Admin requests the admin user list, THE Admin_Management_API SHALL return all users with their `id`, `name`, `email`, `is_active`, and `created_at` fields.
2. WHEN a non-Super_Admin authenticated user requests the admin user list, THE Admin_Management_API SHALL return a 403 Forbidden response.
3. WHEN an unauthenticated request is made to the admin user list endpoint, THE Admin_Management_API SHALL return a 401 Unauthorized response.

---

### Requirement 3: Create Admin Account

**User Story:** As a Super_Admin, I want to create new admin accounts, so that I can grant panel access to new team members.

#### Acceptance Criteria

1. WHEN the Super_Admin submits a valid name, email, and password, THE Admin_Management_API SHALL create a new user record with `is_active` set to `true` and return the created user data with a 201 status.
2. WHEN the submitted email already exists in the `users` table, THE Admin_Management_API SHALL return a 422 Unprocessable Entity response with a validation error on the `email` field.
3. WHEN the submitted password is fewer than 8 characters, THE Admin_Management_API SHALL return a 422 Unprocessable Entity response with a validation error on the `password` field.
4. WHEN a non-Super_Admin authenticated user attempts to create an admin account, THE Admin_Management_API SHALL return a 403 Forbidden response.

---

### Requirement 4: Edit Admin Account

**User Story:** As a Super_Admin, I want to edit admin accounts, so that I can update names, emails, or passwords when needed.

#### Acceptance Criteria

1. WHEN the Super_Admin submits updated `name` and/or `email` for an existing user, THE Admin_Management_API SHALL update the user record and return the updated user data.
2. WHEN the Super_Admin submits a new `password` for an existing user, THE Admin_Management_API SHALL hash and store the new password.
3. WHEN the Super_Admin does not include a `password` field in the update request, THE Admin_Management_API SHALL leave the existing password unchanged.
4. WHEN the submitted email is already used by a different user, THE Admin_Management_API SHALL return a 422 Unprocessable Entity response with a validation error on the `email` field.
5. WHEN a non-Super_Admin authenticated user attempts to edit another user's account, THE Admin_Management_API SHALL return a 403 Forbidden response.

---

### Requirement 5: Deactivate and Activate Admin Accounts

**User Story:** As a Super_Admin, I want to deactivate or reactivate admin accounts, so that I can revoke or restore panel access without deleting accounts.

#### Acceptance Criteria

1. WHEN the Super_Admin sends a toggle-status request for an active user, THE Admin_Management_API SHALL set `is_active` to `false` and return the updated user data.
2. WHEN the Super_Admin sends a toggle-status request for an inactive user, THE Admin_Management_API SHALL set `is_active` to `true` and return the updated user data.
3. WHEN the Super_Admin sends a toggle-status request targeting the super admin account (`admin@welcomemanado.com`), THE Admin_Management_API SHALL return a 403 Forbidden response and leave the account unchanged.
4. WHEN a non-Super_Admin authenticated user attempts to toggle another user's status, THE Admin_Management_API SHALL return a 403 Forbidden response.

---

### Requirement 6: Super Admin Account Protection

**User Story:** As a system operator, I want the super admin account to be protected from modification that would lock it out, so that there is always a guaranteed admin account available.

#### Acceptance Criteria

1. WHEN any request attempts to deactivate the super admin account (`admin@welcomemanado.com`), THE Admin_Management_API SHALL return a 403 Forbidden response.
2. WHEN any request attempts to delete the super admin account, THE Admin_Management_API SHALL return a 403 Forbidden response.
3. THE Admin_Management_Page SHALL hide the deactivate/activate toggle button for the super admin account row.

---

### Requirement 7: Admin Management Page (Frontend)

**User Story:** As a Super_Admin, I want a dedicated page in the admin panel to manage admin accounts, so that I can perform all user management tasks from a single UI.

#### Acceptance Criteria

1. THE Admin_Management_Page SHALL display a table listing all admin accounts with columns for name, email, status (active/inactive), creation date, and an actions column.
2. WHEN the Super_Admin clicks "Tambah Admin", THE Admin_Management_Page SHALL display a modal form with fields for name, email, and password.
3. WHEN the Super_Admin clicks the edit action for a user, THE Admin_Management_Page SHALL display a modal form pre-filled with the user's current name and email, and an optional password field.
4. WHEN the Super_Admin clicks the toggle-status action for a non-super-admin user, THE Admin_Management_Page SHALL send a toggle-status request and update the displayed status without a full page reload.
5. WHEN an API request returns a validation error, THE Admin_Management_Page SHALL display the error messages inline next to the relevant form fields.
6. WHEN the currently authenticated user is not the Super_Admin, THE Admin_Management_Page SHALL redirect the user to the dashboard.

---

### Requirement 8: Sidebar Navigation

**User Story:** As a Super_Admin, I want a sidebar link to the Admin Management page, so that I can navigate to it quickly.

#### Acceptance Criteria

1. WHILE the authenticated user is the Super_Admin, THE Admin_Management_Page link SHALL be visible in the sidebar navigation.
2. WHILE the authenticated user is not the Super_Admin, THE Admin_Management_Page link SHALL be hidden from the sidebar navigation.
