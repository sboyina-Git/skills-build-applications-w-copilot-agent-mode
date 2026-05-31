# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey sboyina-Git!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/sboyina-Git/skills-build-applications-w-copilot-agent-mode/issues/1)

## Frontend Environment

The React presentation tier uses `import.meta.env.VITE_CODESPACE_NAME` to build the backend URL:

- `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`
- If `VITE_CODESPACE_NAME` is not set, the frontend safely falls back to `http://localhost:8000/api/[component]/`

Copy `octofit-tracker/frontend/.env.local.example` to `octofit-tracker/frontend/.env.local` and set:

```env
VITE_CODESPACE_NAME=your_codespace_name
```

