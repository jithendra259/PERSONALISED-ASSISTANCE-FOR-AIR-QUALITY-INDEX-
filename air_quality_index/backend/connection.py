import multiprocessing
import subprocess

def run_chatbot():
    subprocess.run(["python", r"D:\PERSONALISED-ASSISTANCE-FOR-AIR-QUALITY-INDEX-\air_quality_index\backend\chatbotbackend\chatbot.py"])

def run_map():
    subprocess.run(["python", r"D:\PERSONALISED-ASSISTANCE-FOR-AIR-QUALITY-INDEX-\air_quality_index\backend\map_component\map.py"])

if __name__ == "__main__":
    p1 = multiprocessing.Process(target=run_chatbot)
    p2 = multiprocessing.Process(target=run_map)

    p1.start()
    p2.start()

    p1.join()
    p2.join()
