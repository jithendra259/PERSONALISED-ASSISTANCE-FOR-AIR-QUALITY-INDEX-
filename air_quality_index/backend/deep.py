import tkinter as tk
from tkinter import scrolledtext, messagebox
import subprocess
import threading
import os
import re

def clean_output(text):
    # Remove ANSI escape sequences (used for colors, progress indicators, cursor movements)
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    cleaned_text = ansi_escape.sub('', text)
    
    # Replace non-ASCII characters with a placeholder (optional)
    cleaned_text = cleaned_text.encode('ascii', 'ignore').decode('ascii')
    
    return cleaned_text.strip()

# Function to execute the command and capture output
def run_deepseek(query, output_area):
    try:
        command = ["ollama", "run", "deepseek-r1:8b", query]

        shell = os.name == 'nt'  # Use shell=True for Windows

        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, shell=shell)

        output_area.insert(tk.END, f"User Query: {query}\n", 'user_input')

        # Read real-time output in a separate thread to avoid blocking the GUI
        def read_output():
            for line in iter(process.stdout.readline, ''):
                cleaned_line = clean_output(line)
                if cleaned_line:
                    output_area.insert(tk.END, f"Response: {cleaned_line}\n", 'response')
                    output_area.see(tk.END)

        threading.Thread(target=read_output, daemon=True).start()

        process.wait()  # Wait for the command to finish

        # Handle errors after the process has finished
        stderr_output = clean_output(process.stderr.read())
        if stderr_output:
            output_area.insert(tk.END, f"Error: {stderr_output}\n", 'error')
            messagebox.showerror("Error", stderr_output)

    except FileNotFoundError:
        output_area.insert(tk.END, "Error: 'ollama' command not found.\n", 'error')
        messagebox.showerror("Error", "'ollama' command not found. Please ensure it is installed correctly.")
    except Exception as e: # Catch any other exceptions during command execution.
        output_area.insert(tk.END, f"Error: {e}\n", 'error')
        messagebox.showerror("Error", f"An error occurred: {e}")



# Function to handle submit button click
def on_submit(entry, output_area):
    query = entry.get().strip()
    if not query:
        messagebox.showwarning("Input Error", "Query cannot be empty!")
        return

    output_area.delete(1.0, tk.END)  # Clear previous output

    # Run the command in a separate thread
    threading.Thread(target=run_deepseek, args=(query, output_area), daemon=True).start()

def clear_output(output_area):
    output_area.delete(1.0, tk.END)

# Setup GUI
def setup_gui():
    root = tk.Tk()
    root.title("DeepSeek Query Interface")

    # Input Label
    tk.Label(root, text="Enter your query:").pack(pady=5)

    # Entry Box
    entry = tk.Entry(root, width=50)
    entry.pack(pady=5)

    # Submit Button
    submit_btn = tk.Button(root, text="Submit", command=lambda: on_submit(entry, output_area))
    submit_btn.pack(pady=5)

    # Clear Button
    clear_btn = tk.Button(root, text="Clear", command=lambda: clear_output(output_area))
    clear_btn.pack(pady=5)


    # Output Area
    output_area = scrolledtext.ScrolledText(root, width=60, height=20)
    output_area.pack(pady=5)

    # Text Tags for Formatting
    output_area.tag_config('user_input', foreground='blue', font=('Arial', 10, 'bold'))
    output_area.tag_config('response', foreground='green', font=('Arial', 10))
    output_area.tag_config('error', foreground='red', font=('Arial', 10, 'italic'))

    root.mainloop()

if __name__ == "__main__":
    setup_gui()