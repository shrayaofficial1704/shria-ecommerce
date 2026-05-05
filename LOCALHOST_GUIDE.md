# Run Shria In VS Code

Use these steps to view Shria locally in your browser.

## 1. Open The Correct Folder

Open VS Code, then choose:

```text
File > Open Folder
```

Select:

```text
C:\Users\Admin\OneDrive\Documents\New project\shria-ecommerce
```

## 2. Install Dependencies

In VS Code, open:

```text
Terminal > Run Task
```

Run:

```text
Install Shria Dependencies
```

## 3. Start The Website

In VS Code, open:

```text
Terminal > Run Task
```

Run:

```text
Start Shria Full Stack
```

This starts:

```text
Backend:  http://localhost:5000
Frontend: http://localhost:5173
```

If VS Code tasks ever give an error, double-click this file instead:

```text
start-local.cmd
```

It is inside the `shria-ecommerce` folder and starts the same website.

## 4. View In Browser

Open this URL:

```text
http://localhost:5173
```

You can also use:

```text
Run and Debug > Open Shria in Chrome
```

or:

```text
Run and Debug > Open Shria in Edge
```

## 5. Stop The Website

In the VS Code terminal running the task, press:

```text
Ctrl + C
```

## Notes

The project is ready to view without MongoDB or payment keys. In that mode, it uses the 18 sample fairy gown products from the local backend.

For real database and payments, fill these files:

```text
server\.env
client\.env
```
