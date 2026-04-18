# Node Backend API Routes Analysis

This document outlines the standard response structures and API routes for all four microservices in the `node_backend` of the FairGig project.

## 1. Standard API Structure
All responses use a standardized JSON wrapper for success and error interactions.

### Success Response
```json
{
  "data": { 
    // endpoint specific payload (e.g., user object, shift list, etc) 
  },
  "meta": {
    "page": 1,         // Optional pagination metadata
    "limit": 20,
    "total": 100
  },
  "error": null
}
```

### Error Response
```json
{
  "data": null,
  "meta": {},
  "error": {
    "code": "VALIDATION_ERROR", // e.g. NOT_FOUND, UNAUTHORIZED, INTERNAL_ERROR
    "message": "Validation failed",
    "fields": {                 // Present mainly for validation errors
      "email": "Email format is invalid"
    }
  }
}
```

---

## 2. Services

### A. Auth Service
Handles authentication, user management, and role-upgrade requests.

| Method | Endpoint | Request Body/Query | Response Payload |
|--------|----------|--------------------|-------------------|
| **POST** | `/auth/v1/register` | `{ name, email, password, phone }` | Profile & accessToken |
| **POST** | `/auth/v1/login` | `{ email, password }` | Profile & accessToken |
| **POST** | `/auth/v1/refresh` | *Requires HttpOnly refreshToken cookie* | `{ accessToken }` |
| **POST** | `/auth/v1/logout` | None | None |
| **POST** | `/auth/v1/forgot-password` | `{ email }` | Success confirming email dispatched |
| **POST** | `/auth/v1/reset-password` | `{ token, newPassword }` | Standard success |
| **GET**  | `/auth/v1/me`      | None | User profile |
| **PATCH**| `/auth/v1/me`      | `{ name, language, categories, cityZoneId, phone }` | Updated User profile |
| **POST** | `/auth/v1/change-password` | `{ oldPassword, newPassword }` | Standard success |
| **POST** | `/auth/v1/role-requests` | `{ requestedRole, reason }` | Standard success |
| **GET**  | `/auth/v1/role-requests` | `?page, ?limit` | Paginated role requests |
| **POST** | `/auth/v1/role-requests/:id/approve`| None | Standard success |
| **POST** | `/auth/v1/role-requests/:id/reject` | `{ reason }` | Standard success |
| **PATCH**| `/auth/v1/admin/users/:id/status` | `{ status }` (active, frozen) | Standard success |

### B. Earnings Service
Handles shift logging, csv bulk import, reference data fetching and screenshot verifications.

| Method | Endpoint | Request Body/Query | Response Payload |
|--------|----------|--------------------|-------------------|
| **GET**  | `/earnings/v1/platforms` | None | List of active platforms |
| **GET**  | `/earnings/v1/city-zones`| None | List of city zones |
| **GET**  | `/earnings/v1/imports/template` | None | CSV Template file download |
| **POST** | `/earnings/v1/imports/csv`| `multipart/form-data` (file) | `{ importId, jobId }` |
| **GET**  | `/earnings/v1/imports/:importId`| None | Status of CSV job |
| **GET**  | `/earnings/v1/shifts` | `?page, limit, platformId, from, to, verificationStatus` | Paginated Shifts |
| **POST** | `/earnings/v1/shifts` | `{ platformId, shiftDate, hoursWorked, grossPay, netPay, currency, deductions, notes }`| Created Shift |
| **GET**  | `/earnings/v1/shifts/:id`| None | Shift + Verifications info |
| **PATCH**| `/earnings/v1/shifts/:id`| `{ parameters from post subset }` | Updated Shift |
| **DELETE**|`/earnings/v1/shifts/:id`| None | Standard success |
| **POST** | `/earnings/v1/shifts/:id/verify` | `{ decision, screenshotId, notes }` | Verification record |
| **GET**  | `/earnings/v1/verification/queue`| `?page, limit` | Paginated Shift Queue |
| **POST** | `/earnings/v1/shifts/:shiftId/screenshots/presign` | `{ mimeType, sizeBytes }`| `{ signedUrl, storageKey, token }` |
| **POST** | `/earnings/v1/shifts/:shiftId/screenshots` | `{ storageKey, sizeBytes, mimeType }`| Standard success |
| **GET**  | `/earnings/v1/shifts/:shiftId/screenshots/url` | None | `{ screenshotId, signedUrl, expiresIn }` |

### C. Certificate Service
*(Currently contains health checkpoints only. Endpoints for certificates will be expanded during development.)*

| Method | Endpoint | Request Body/Query | Response Payload |
|--------|----------|--------------------|-------------------|
| **GET**  | `/health` | None | `{ status: "ok", service: "certificate-service", uptime: number }` |

### D. Grievance Service
*(Currently contains health checkpoints only. Full endpoints will be expanded.)*

| Method | Endpoint | Request Body/Query | Response Payload |
|--------|----------|--------------------|-------------------|
| **GET**  | `/health` | None | `{ status: "ok", service: "grievance-service", uptime: number }` |

> *Note: Each service automatically includes a `/health` endpoint structured similarly to the ones detailed above for uptime monitoring.*
