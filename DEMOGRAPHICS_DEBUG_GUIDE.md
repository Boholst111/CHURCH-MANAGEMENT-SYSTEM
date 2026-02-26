# Demographics Data Issue - Debugging Guide

## Current Status

The demographics feature has been thoroughly investigated:

✅ **Backend is working perfectly** - Tested with PHP scripts showing 13 members with full demographic data
✅ **API endpoint exists** - `/api/reports/demographics` is properly configured
✅ **Authentication is working** - User is logged in as "Church Administrator"
✅ **Frontend code is correct** - Reports.tsx properly calls the API
✅ **Frontend is compiled** - Latest code is built and deployed

❌ **Issue**: Frontend shows "No demographic data available" despite all the above working

## Root Cause Analysis

The issue is likely one of the following:

1. **Token not being sent with request** - The Authorization header may not be properly attached
2. **CORS issue** - Browser may be blocking the request
3. **JavaScript error** - Silent error preventing data from being set
4. **Cache issue** - Browser may be serving old JavaScript

## Step-by-Step Debugging Instructions

### Step 1: Test the API Directly (Recommended First Step)

1. Open your browser and navigate to: `http://127.0.0.1:8000/test-demographics-frontend.html`
2. This page will:
   - Show your authentication status
   - Test the API call with your current token
   - Display the full response or any errors
3. Click "Test API Call" button
4. **Expected Result**: Should show demographic data with 13 members
5. **If it fails**: Note the error message and status code

### Step 2: Check Browser Console

1. Open the Reports & Analytics page: `http://127.0.0.1:8000/reports`
2. Press `F12` to open Developer Tools
3. Click the "Console" tab
4. Look for any errors (red text)
5. You should see these console logs:
   ```
   Fetching demographic data...
   Demographic data received: {data: {...}}
   ```
6. **If you see errors**: Take note of the error message

### Step 3: Check Network Tab

1. With Developer Tools still open (F12)
2. Click the "Network" tab
3. Refresh the page
4. Look for a request to `demographics`
5. Click on it to see details
6. Check:
   - **Status Code**: Should be 200 (if 401, authentication issue; if 403, permission issue)
   - **Request Headers**: Should include `Authorization: Bearer <token>`
   - **Response**: Should show demographic data

### Step 4: Clear Cache and Reload

1. Press `Ctrl + Shift + Delete` to open Clear Browsing Data
2. Select "Cached images and files"
3. Click "Clear data"
4. Close and reopen your browser
5. Navigate to Reports page again

### Step 5: Check LocalStorage

1. Open Developer Tools (F12)
2. Go to "Application" tab (or "Storage" in Firefox)
3. Click "Local Storage" → `http://127.0.0.1:8000`
4. Verify these keys exist:
   - `token` - Should have a long string value
   - `user` - Should have JSON with your user data
5. **If missing**: You need to log out and log back in

## Common Issues and Solutions

### Issue 1: 401 Unauthorized Error

**Cause**: Token is expired or invalid

**Solution**:
1. Log out from the application
2. Log back in
3. Try accessing Reports page again

### Issue 2: 403 Forbidden Error

**Cause**: User doesn't have permission to view reports

**Solution**:
1. Check your user role (should be "admin" or "staff")
2. If you're a "viewer", you need admin to upgrade your role

### Issue 3: CORS Error

**Cause**: Browser blocking cross-origin requests

**Solution**:
1. Make sure you're accessing the app via `http://127.0.0.1:8000` (not `localhost`)
2. Check if Laravel is running: `php artisan serve`

### Issue 4: JavaScript Error

**Cause**: Error in frontend code preventing data display

**Solution**:
1. Check browser console for errors
2. Try the test page: `http://127.0.0.1:8000/test-demographics-frontend.html`
3. If test page works but Reports doesn't, there's a React component issue

## Quick Test Commands

Run these in your terminal to verify backend:

```bash
# Test demographics endpoint with authentication
php test-demographics-with-auth.php

# Should output:
# Status: 200
# Total Members: 13
# Age Groups: X
# Locations: X
```

## Files Created for Debugging

1. **test-demographics-frontend.html** - Browser-based API tester
   - URL: `http://127.0.0.1:8000/test-demographics-frontend.html`
   - Tests the exact same API call the React app makes

2. **check-auth.html** - Authentication checker
   - URL: `http://127.0.0.1:8000/check-auth.html`
   - Verifies you're logged in

3. **DEMOGRAPHICS_DATA_FLOW.md** - Complete technical documentation
   - Shows how data flows from database to frontend

## Next Steps Based on Test Results

### If test-demographics-frontend.html WORKS:
→ The issue is in the React component
→ Check for JavaScript errors in console
→ Verify DemographicChart component is rendering correctly

### If test-demographics-frontend.html FAILS with 401:
→ Authentication issue
→ Log out and log back in
→ Check if token is being stored in localStorage

### If test-demographics-frontend.html FAILS with 403:
→ Permission issue
→ Check user role in database
→ Ensure user has "admin" or "staff" role

### If test-demographics-frontend.html FAILS with 500:
→ Backend error
→ Check Laravel logs: `storage/logs/laravel.log`
→ Run: `php test-demographics-with-auth.php` to see detailed error

## Contact Information

If none of the above steps resolve the issue, provide:
1. Screenshot of browser console (F12 → Console tab)
2. Screenshot of network tab showing the demographics request
3. Result from test-demographics-frontend.html
4. Your user role from the database

## Technical Details

- **API Endpoint**: `/api/reports/demographics`
- **Method**: GET
- **Authentication**: Bearer token (Sanctum)
- **Required Role**: staff or admin
- **Expected Response**: JSON with demographic data
- **Frontend Component**: `resources/js/pages/Reports.tsx`
- **Backend Controller**: `app/Http/Controllers/Api/ReportController.php`
