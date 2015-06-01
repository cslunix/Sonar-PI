#!/usr/bin/python

import time
import RPi.GPIO as GPIO
# BCM or BOARD
GPIO.setmode(GPIO.BCM)
GPIO_TRIG = 23
GPI_ECHO = 24

GPIO.setup( GPIO_TRIG, GPIO.OUT )
GPIO.setup( GPI_ECHO, GPIO.IN  )

GPIO.output( GPIO_TRIG, False )

time.sleep(0.5)

GPIO.output( GPIO_TRIG, True )
time.sleep( 0.00001 )  # 10 us
GPIO.output( GPIO_TRIG, False )

while GPIO.input(GPI_ECHO)==0:
	pulse_start = time.time()

while GPIO.input(GPI_ECHO)==1:
	pulse_end = time.time()

pulse_duration = pulse_end - pulse_start

distancia = pulse_duration * 17150
# (343*100) / 2 = 17150
distancia = round( distancia, 4 )
print distancia
GPIO.cleanup()
