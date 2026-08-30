#!/bin/bash

FILES=(".env" ".env.local")
NEEDS_AMEND=false

echo "🔍 Checking if .gitignore rules apply..."
for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        if git check-ignore -q "$FILE"; then
            echo "✅ .gitignore is successfully blocking: $FILE"
            
            if git ls-files --error-unmatch "$FILE" >/dev/null 2>&1; then
                echo "⚠️  WARNING: $FILE is ignored but STILL TRACKED in Git history!"
                echo "   -> Removing $FILE from Git cache..."
                git rm --cached "$FILE"
                NEEDS_AMEND=true
            else
                echo "🎉 Success: $FILE is completely untracked and safe."
            fi
        else
            echo "❌ ERROR: .gitignore is NOT blocking $FILE. Check your .gitignore rules!"
        fi
    else
        echo "ℹ️  File $FILE does not exist locally, skipping check."
    fi
    echo "----------------------------------------"
done

if [ "$NEEDS_AMEND" = true ]; then
    echo "💾 Updating your last commit to wipe tracking..."
    git commit --amend --no-edit
    echo "✨ Done! Your current commit is now clean. You can safely force push."
else
    echo "🟢 Everything looks perfect. No tracking issues found."
fi
