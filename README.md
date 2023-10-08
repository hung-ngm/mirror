# MirrorScripts


## How to run:

### Frontend:
1. Clone this repo
2. Run `pnpm run dev` inside this repo

### Backend:
1. Clone [mirror-scripts-v2](https://github.com/KaleidoAI/mirror-scripts-v2)
2. Navigate to the backend directory: `cd mirror_scripts_agent`
3. Create virtual environment and install packages:
   ```bash
   python -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```
4. Run the local backend:
   ```bash
   uvicorn main:app --reload
   ```