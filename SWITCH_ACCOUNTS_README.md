# 🔄 Quick Account Switching

## Current Setup

✅ **Active Account:** Ankit007Codes (masterankit007chandigarh@gmail.com)
✅ **Backup Account:** RAj2027 (rajbardhansingh17@gmail.com)

---

## How to Switch Back to RAj

### Option 1: Double-Click Batch File (Easiest)
```
📁 devfolio-project/
   └── switch-to-raj.bat  ← Double-click this file
```

### Option 2: Run Command
```bash
git config --global user.name "RAj2027"
git config --global user.email "rajbardhansingh17@gmail.com"
```

### Option 3: Run Batch File from Terminal
```bash
.\switch-to-raj.bat
```

---

## How to Switch Back to Ankit

### Option 1: Double-Click Batch File
```
📁 devfolio-project/
   └── switch-to-ankit.bat  ← Double-click this file
```

### Option 2: Run Command
```bash
git config --global user.name "Ankit007Codes"
git config --global user.email "masterankit007chandigarh@gmail.com"
```

---

## Verify Current Account

```bash
git config user.name
git config user.email
```

---

## Important Notes

1. **Switching is instant** - Takes 1 second
2. **Affects all repositories** - Global configuration
3. **Need to clear credentials** - When pushing to different account
4. **Batch files are safe** - Just change git config

---

## After Switching

When you push/pull after switching, you'll be prompted for credentials:
- Enter the username and password/token for the active account
- Or clear credentials first: `cmdkey /delete:LegacyGeneric:target=git:https://github.com`

---

## Files Created

✅ `switch-to-ankit.bat` - Switch to Ankit007Codes
✅ `switch-to-raj.bat` - Switch to RAj2027  
✅ `CREDENTIAL_SWITCHING_GUIDE.md` - Complete guide
✅ `SWITCH_ACCOUNTS_README.md` - This quick reference

---

## Summary

**To switch back to RAj after pushing:**
1. Double-click `switch-to-raj.bat`
2. Done! ✅

**To switch back to Ankit:**
1. Double-click `switch-to-ankit.bat`
2. Done! ✅

**It's that simple! 🎉**

---

**Current Account:** Ankit007Codes
**Last Updated:** December 12, 2025
