# 🔄 Git Credential Switching Guide

## Overview
This guide helps you easily switch between two GitHub accounts:
- **Ankit007Codes** (masterankit007chandigarh@gmail.com)
- **RAj2027** (rajbardhansingh17@gmail.com)

---

## Quick Switch Methods

### Method 1: Using Batch Scripts (Easiest)

#### Switch to Ankit007Codes
```bash
# Double-click or run:
switch-to-ankit.bat
```

#### Switch to RAj2027
```bash
# Double-click or run:
switch-to-raj.bat
```

---

### Method 2: Manual Commands

#### Switch to Ankit007Codes
```bash
git config --global user.name "Ankit007Codes"
git config --global user.email "masterankit007chandigarh@gmail.com"
```

#### Switch to RAj2027
```bash
git config --global user.name "RAj2027"
git config --global user.email "rajbardhansingh17@gmail.com"
```

---

### Method 3: Per-Repository Configuration

If you want different credentials for different repositories:

#### For This Repository (Ankit007Codes)
```bash
cd devfolio-project
git config user.name "Ankit007Codes"
git config user.email "masterankit007chandigarh@gmail.com"
```

#### For Other Repositories (RAj2027)
```bash
cd other-project
git config user.name "RAj2027"
git config user.email "rajbardhansingh17@gmail.com"
```

**Note:** Local config (without `--global`) only affects the current repository.

---

## Verify Current Credentials

### Check Global Credentials
```bash
git config --global user.name
git config --global user.name
```

### Check Local Repository Credentials
```bash
git config user.name
git config --global user.name
```

### Check All Git Configuration
```bash
git config --list
```

---

## Managing GitHub Authentication

### Clear Cached Credentials

When switching accounts, you may need to clear cached credentials:

#### Windows Credential Manager
```bash
# List credentials
cmdkey /list | findstr git

# Delete GitHub credentials
cmdkey /delete:LegacyGeneric:target=git:https://github.com
```

#### Git Credential Manager
```bash
# Clear all credentials
git credential-manager-core erase
```

---

## Authentication After Switching

### When You Push/Pull

After switching credentials, the first push/pull will prompt for authentication:

#### Option 1: Username & Password
- Username: Your GitHub username
- Password: Your Personal Access Token (not your GitHub password)

#### Option 2: GitHub CLI
```bash
# Login with GitHub CLI
gh auth login

# Select account and follow prompts
```

#### Option 3: Personal Access Token in URL
```bash
# For Ankit007Codes
git remote set-url origin https://YOUR_TOKEN@github.com/Ankit007Codes/Personal-Portfolio.git

# For RAj2027
git remote set-url origin https://YOUR_TOKEN@github.com/RAj2027/your-repo.git
```

---

## Creating Personal Access Tokens

### For Ankit007Codes
1. Login to GitHub as Ankit007Codes
2. Go to: https://github.com/settings/tokens
3. Click "Generate new token (classic)"
4. Select scopes: `repo` (all)
5. Generate and save token securely

### For RAj2027
1. Login to GitHub as RAj2027
2. Go to: https://github.com/settings/tokens
3. Click "Generate new token (classic)"
4. Select scopes: `repo` (all)
5. Generate and save token securely

---

## Recommended Workflow

### Scenario 1: Working on Personal-Portfolio (Ankit)
```bash
# 1. Switch to Ankit credentials
switch-to-ankit.bat

# 2. Navigate to project
cd devfolio-project

# 3. Make changes and commit
git add .
git commit -m "Your changes"

# 4. Push (will prompt for Ankit's credentials)
git push origin master
```

### Scenario 2: Working on Other Projects (RAj)
```bash
# 1. Switch to RAj credentials
switch-to-raj.bat

# 2. Navigate to project
cd other-project

# 3. Make changes and commit
git add .
git commit -m "Your changes"

# 4. Push (will prompt for RAj's credentials)
git push origin master
```

---

## Advanced: Multiple Accounts with SSH

For seamless switching without credential prompts:

### 1. Generate SSH Keys for Each Account

#### For Ankit007Codes
```bash
ssh-keygen -t ed25519 -C "masterankit007chandigarh@gmail.com" -f ~/.ssh/id_ed25519_ankit
```

#### For RAj2027
```bash
ssh-keygen -t ed25519 -C "rajbardhansingh17@gmail.com" -f ~/.ssh/id_ed25519_raj
```

### 2. Add SSH Keys to GitHub

#### Ankit007Codes
1. Copy public key: `cat ~/.ssh/id_ed25519_ankit.pub`
2. Go to: https://github.com/settings/keys
3. Add new SSH key

#### RAj2027
1. Copy public key: `cat ~/.ssh/id_ed25519_raj.pub`
2. Go to: https://github.com/settings/keys
3. Add new SSH key

### 3. Configure SSH Config

Create/edit `~/.ssh/config`:
```
# Ankit007Codes account
Host github-ankit
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_ankit

# RAj2027 account
Host github-raj
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_raj
```

### 4. Use Different Remotes

#### For Ankit's repositories
```bash
git remote set-url origin git@github-ankit:Ankit007Codes/Personal-Portfolio.git
```

#### For RAj's repositories
```bash
git remote set-url origin git@github-raj:RAj2027/your-repo.git
```

---

## Troubleshooting

### Issue: Wrong account pushing
**Solution:** Clear credentials and switch account
```bash
cmdkey /delete:LegacyGeneric:target=git:https://github.com
switch-to-ankit.bat  # or switch-to-raj.bat
git push
```

### Issue: Permission denied
**Solution:** Verify you're using correct credentials
```bash
git config user.name
git config user.email
```

### Issue: Commits showing wrong author
**Solution:** Amend last commit with correct author
```bash
git commit --amend --author="Ankit007Codes <masterankit007chandigarh@gmail.com>"
```

### Issue: Multiple commits with wrong author
**Solution:** Rebase and change author
```bash
git rebase -i HEAD~5  # Change last 5 commits
# Mark commits as 'edit'
# For each commit:
git commit --amend --author="Ankit007Codes <masterankit007chandigarh@gmail.com>"
git rebase --continue
```

---

## Current Configuration

### Active Credentials
```
User: Ankit007Codes
Email: masterankit007chandigarh@gmail.com
```

### Repository Remote
```
Origin: https://github.com/Ankit007Codes/Personal-Portfolio.git
Branch: master
```

---

## Quick Reference Commands

```bash
# Check current user
git config user.name

# Check current email
git config user.email

# Switch to Ankit (global)
git config --global user.name "Ankit007Codes"
git config --global user.email "masterankit007chandigarh@gmail.com"

# Switch to RAj (global)
git config --global user.name "RAj2027"
git config --global user.email "rajbardhansingh17@gmail.com"

# Clear credentials
cmdkey /delete:LegacyGeneric:target=git:https://github.com

# View all config
git config --list

# View remote
git remote -v
```

---

## Best Practices

1. **Use batch scripts** for quick switching
2. **Clear credentials** when switching accounts
3. **Verify credentials** before committing
4. **Use SSH keys** for seamless authentication
5. **Keep tokens secure** - never commit them
6. **Use per-repo config** if working on both accounts simultaneously

---

## Files Created

- `switch-to-ankit.bat` - Switch to Ankit007Codes
- `switch-to-raj.bat` - Switch to RAj2027
- `CREDENTIAL_SWITCHING_GUIDE.md` - This guide

---

## Summary

✅ **Easy switching** with batch scripts
✅ **Manual commands** available
✅ **Per-repository** configuration supported
✅ **SSH method** for advanced users
✅ **Troubleshooting** guide included

**You can now easily switch between accounts anytime! 🔄**

---

**Last Updated:** December 12, 2025
**Current Account:** Ankit007Codes
