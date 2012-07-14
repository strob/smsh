import numm
import numpy

MAP = {}

import json
import urllib2

URL = 'http://sms.rmozone.com/'

def audio_out(a):
    if len(MAP.keys()) == 0:
        return

    audio = []
    for k,v in MAP.items():
        audio.append(numpy.array([ord(X) for X in k]).astype(numpy.int16))
        audio.append(numpy.array([ord(X) for X in v]).astype(numpy.int16))

    audio = numpy.concatenate(audio)

    # normalize
    audio *= 2**15/audio.max()

    a.flat = audio.flat

def video_out(a):
    audio = []
    for k,v in MAP.items():
        audio.append(numpy.array([ord(X) for X in k]).astype(numpy.uint8))
        audio.append(numpy.array([ord(X) for X in v]).astype(numpy.uint8))

    audio = numpy.concatenate(audio)
    # normalize
    audio *= 2**8/audio.max()

    a.flat = audio.flat

import threading
def watch_changes():
    global MAP

    MAP = json.loads(urllib2.urlopen(URL+'poll').read())
    print MAP
    while True:
        try:
            MAP = json.loads(urllib2.urlopen(URL+'change').read())
        except urllib2.HTTPError:
            print 'proxy error -- retrying'
        print MAP

t = threading.Thread(target=watch_changes)
t.start()
