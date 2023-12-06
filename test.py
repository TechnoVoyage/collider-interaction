import time
okTimer = time.time()
while True:
    if(time.time()-okTimer >= 2):
        okTimer = time.time()
        print("ok")