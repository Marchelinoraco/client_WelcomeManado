# Tasks

## Task List

- [x] 1. Backend: Migration and Model
  - [x] 1.1 Create migration `add_is_active_to_users_table` adding `is_active` boolean (default `true`) to `users` table
  - [x] 1.2 Update `User` model: add `is_active` to `$fillable` and cast to `boolean`

- [x] 2. Backend: Login Check
  - [x] 2.1 Modify `AuthController@login` to reject login (403) when `is_active === false`, with bypass for `admin@welcomemanado.com`

- [x] 3. Backend: IsSuperAdmin Middleware
  - [x] 3.1 Create `IsSuperAdmin` middleware that returns 403 if authenticated user email is not `admin@welcomemanado.com`
  - [x] 3.2 Register middleware in `bootstrap/app.php` (or `Kernel.php`)

- [x] 4. Backend: AdminUserController
  - [x] 4.1 Create `AdminUserController` with `index` method (return all users with id, name, email, is_active, created_at)
  - [x] 4.2 Add `store` method with validation (name required, email unique, password min:8), creates user with `is_active=true`
  - [x] 4.3 Add `update` method with validation (email unique ignoring self, password nullable min:8, leave password unchanged if omitted)
  - [x] 4.4 Add `toggleStatus` method: flip `is_active`, revoke all tokens on deactivation, block super admin email with 403

- [x] 5. Backend: Routes
  - [x] 5.1 Add `GET /admin/users`, `POST /admin/users`, `PUT /admin/users/{id}`, `POST /admin/users/{id}/toggle-status` routes under `auth:sanctum` + `is_super_admin` middleware in `api.php`

- [x] 6. Frontend: Router
  - [x] 6.1 Add `admin-users` route to `router/index.js` with `meta: { requiresSuperAdmin: true }`
  - [x] 6.2 Extend `beforeEach` guard to redirect non-super-admin away from `requiresSuperAdmin` routes to dashboard

- [x] 7. Frontend: Sidebar
  - [x] 7.1 Add `admin-users` nav item to `navItems` in `MainLayout.vue`
  - [x] 7.2 Update `filteredNavItems` to show the link only when `authStore.user?.email === 'admin@welcomemanado.com'`

- [x] 8. Frontend: AdminUsers.vue Page
  - [x] 8.1 Create `admin_wm/src/views/users/AdminUsers.vue` with user table (name, email, status badge, created_at, actions)
  - [x] 8.2 Add "Tambah Admin" button that opens a create modal with name, email, password fields
  - [x] 8.3 Add edit action per row that opens an edit modal pre-filled with user's name and email, optional password field
  - [x] 8.4 Add toggle-status action per row (hidden for super admin row), calls API and updates row reactively
  - [x] 8.5 Display inline validation errors next to form fields on 422 responses
