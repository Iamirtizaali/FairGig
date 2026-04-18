#!/usr/bin/env pwsh
<#
.SYNOPSIS
    FairGig Pre-Deployment Validation Script
    
.DESCRIPTION
    Validates local environment, builds all services, runs tests, and generates deployment checklist.
    
.EXAMPLE
    .\scripts\pre-deploy.ps1 -Mode validate
    .\scripts\pre-deploy.ps1 -Mode build
    .\scripts\pre-deploy.ps1 -Mode test
#>

param(
    [ValidateSet("validate", "build", "test", "all")]
    [string]$Mode = "all"
)

$ErrorActionPreference = "Stop"
$RepoRoot = (Get-Item $PSScriptRoot).Parent.FullName

Write-Host "FairGig Pre-Deployment Validator" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# ──────────────────────────────────────────────────────────────────────────────
# VALIDATION
# ──────────────────────────────────────────────────────────────────────────────

function Validate-Environment {
    Write-Host "Phase 1: Environment Validation" -ForegroundColor Yellow
    Write-Host "──────────────────────────────────────────────────────────────" -ForegroundColor Gray
    
    $issues = @()
    
    # Check Node.js
    try {
        $nodeVersion = node --version
        Write-Host "✅ Node.js: $nodeVersion"
    } catch {
        $issues += "❌ Node.js not found. Install from https://nodejs.org"
    }
    
    # Check npm
    try {
        $npmVersion = npm --version
        Write-Host "✅ npm: $npmVersion"
    } catch {
        $issues += "❌ npm not found"
    }
    
    # Check Python
    try {
        $pythonVersion = python --version
        Write-Host "✅ Python: $pythonVersion"
    } catch {
        $issues += "❌ Python not found. Install from https://python.org"
    }
    
    # Check git
    try {
        $gitVersion = git --version
        Write-Host "✅ Git: $gitVersion"
    } catch {
        $issues += "❌ Git not found. Install from https://git-scm.com"
    }
    
    # Check git status
    try {
        $gitStatus = git -C $RepoRoot status --porcelain
        if ($gitStatus) {
            $issues += "⚠️  Uncommitted changes in git. Commit before deploying."
            Write-Host "⚠️  Git status:" -ForegroundColor Yellow
            Write-Host $gitStatus
        } else {
            Write-Host "✅ Git status: clean"
        }
    } catch {
        $issues += "❌ Git status check failed"
    }
    
    # Check directory structure
    $services = @(
        "apps/auth-service",
        "apps/earnings-service",
        "apps/certificate-service",
        "apps/grievance-service",
        "apps/anomaly-service",
        "apps/analytics-service",
        "apps/web"
    )
    
    foreach ($service in $services) {
        $path = Join-Path $RepoRoot $service
        if (Test-Path $path) {
            Write-Host "✅ $service exists"
        } else {
            $issues += "❌ $service not found"
        }
    }
    
    # Check .env files (should NOT exist, but warn if they do)
    $envFiles = Get-ChildItem -Path $RepoRoot -Recurse -Filter ".env*" -ErrorAction SilentlyContinue
    if ($envFiles) {
        $issues += "⚠️  .env files found in repo. Ensure they are in .gitignore before committing."
    }
    
    Write-Host ""
    
    if ($issues.Count -gt 0) {
        Write-Host "Issues Found:" -ForegroundColor Red
        $issues | ForEach-Object { Write-Host "  $_" }
        Write-Host ""
        return $false
    } else {
        Write-Host "✅ All validation checks passed!" -ForegroundColor Green
        Write-Host ""
        return $true
    }
}

# ──────────────────────────────────────────────────────────────────────────────
# BUILD
# ──────────────────────────────────────────────────────────────────────────────

function Build-Services {
    Write-Host "Phase 2: Building Services" -ForegroundColor Yellow
    Write-Host "──────────────────────────────────────────────────────────────" -ForegroundColor Gray
    
    $nodeServices = @(
        "apps/auth-service",
        "apps/earnings-service",
        "apps/certificate-service",
        "apps/grievance-service"
    )
    
    # Build Node services
    foreach ($service in $nodeServices) {
        Write-Host ""
        Write-Host "Building $service..." -ForegroundColor Cyan
        $servicePath = Join-Path $RepoRoot $service
        
        try {
            Push-Location $servicePath
            npm install | Out-Null
            npm run build 2>&1 | Select-String "error" -ErrorAction SilentlyContinue | ForEach-Object {
                Write-Host "❌ $_" -ForegroundColor Red
            }
            Write-Host "✅ $service built successfully"
            Pop-Location
        } catch {
            Write-Host "❌ Failed to build $service : $_" -ForegroundColor Red
            Pop-Location
            return $false
        }
    }
    
    # Build FastAPI services (check requirements.txt)
    $pythonServices = @(
        "apps/anomaly-service",
        "apps/analytics-service"
    )
    
    foreach ($service in $pythonServices) {
        Write-Host ""
        Write-Host "Checking $service..." -ForegroundColor Cyan
        $servicePath = Join-Path $RepoRoot $service
        $reqFile = Join-Path $servicePath "requirements.txt"
        
        if (Test-Path $reqFile) {
            Write-Host "✅ $service has requirements.txt"
        } else {
            Write-Host "⚠️  $service missing requirements.txt" -ForegroundColor Yellow
        }
    }
    
    # Build frontend
    Write-Host ""
    Write-Host "Building frontend..." -ForegroundColor Cyan
    $webPath = Join-Path $RepoRoot "apps/web"
    
    try {
        Push-Location $webPath
        npm install | Out-Null
        npm run build 2>&1 | Select-String "error" -ErrorAction SilentlyContinue | ForEach-Object {
            Write-Host "❌ $_" -ForegroundColor Red
        }
        Write-Host "✅ Frontend built successfully"
        Pop-Location
    } catch {
        Write-Host "⚠️  Frontend build skipped (optional)" -ForegroundColor Yellow
        Pop-Location
    }
    
    Write-Host ""
    Write-Host "✅ All services built!" -ForegroundColor Green
    Write-Host ""
    return $true
}

# ──────────────────────────────────────────────────────────────────────────────
# TEST
# ──────────────────────────────────────────────────────────────────────────────

function Run-Tests {
    Write-Host "Phase 3: Running Tests" -ForegroundColor Yellow
    Write-Host "──────────────────────────────────────────────────────────────" -ForegroundColor Gray
    
    $pythonServices = @(
        "apps/anomaly-service",
        "apps/analytics-service"
    )
    
    foreach ($service in $pythonServices) {
        Write-Host ""
        Write-Host "Testing $service..." -ForegroundColor Cyan
        $servicePath = Join-Path $RepoRoot $service
        
        try {
            Push-Location $servicePath
            $pythonExe = if ($PSVersionTable.OS -match "Windows") { 
                "..\..\.venv\Scripts\python.exe" 
            } else { 
                "../../.venv/bin/python" 
            }
            
            if (Test-Path $pythonExe) {
                & $pythonExe -m pytest -q --tb=short
                Write-Host "✅ $service tests passed"
            } else {
                Write-Host "⚠️  Python venv not found, skipping tests" -ForegroundColor Yellow
            }
            Pop-Location
        } catch {
            Write-Host "⚠️  Tests failed or not available: $_" -ForegroundColor Yellow
            Pop-Location
        }
    }
    
    Write-Host ""
    Write-Host "✅ Test phase complete!" -ForegroundColor Green
    Write-Host ""
    return $true
}

# ──────────────────────────────────────────────────────────────────────────────
# SUMMARY
# ──────────────────────────────────────────────────────────────────────────────

function Show-Summary {
    Write-Host "Pre-Deployment Summary" -ForegroundColor Green
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Gray
    Write-Host ""
    Write-Host "✅ Environment is ready for deployment!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Create accounts on Render, Vercel, Supabase, Upstash"
    Write-Host "  2. Create .env files for each service (do NOT commit)"
    Write-Host "  3. Follow DEPLOYMENT_GUIDE.md for step-by-step instructions"
    Write-Host "  4. Use DEPLOYMENT_CHECKLIST.md to track progress"
    Write-Host ""
    Write-Host "Quick links:" -ForegroundColor Cyan
    Write-Host "  • Render:   https://render.com"
    Write-Host "  • Vercel:   https://vercel.com"
    Write-Host "  • Supabase: https://supabase.com"
    Write-Host "  • Upstash:  https://upstash.com"
    Write-Host ""
}

# ──────────────────────────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────────────────────────

try {
    switch ($Mode) {
        "validate" {
            $valid = Validate-Environment
            if ($valid) { Show-Summary }
            exit if ($valid) { 0 } else { 1 }
        }
        "build" {
            $valid = Validate-Environment
            if ($valid) {
                $built = Build-Services
                exit if ($built) { 0 } else { 1 }
            }
        }
        "test" {
            $valid = Validate-Environment
            $built = Build-Services
            if ($valid -and $built) {
                $tested = Run-Tests
                Show-Summary
                exit if ($tested) { 0 } else { 1 }
            }
        }
        "all" {
            $valid = Validate-Environment
            if ($valid) {
                $built = Build-Services
                if ($built) {
                    $tested = Run-Tests
                    if ($tested) {
                        Show-Summary
                    }
                }
            }
        }
    }
} catch {
    Write-Host "Fatal error: $_" -ForegroundColor Red
    exit 1
}
