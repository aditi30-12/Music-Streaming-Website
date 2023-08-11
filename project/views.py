from django.http import HttpResponse
from django.shortcuts import render

# these are templates pages(i.e pages that are loaded on UI(user interface) levels)
def index(request):
	return render(request,"index.html")
def oldsongs(request):
	return render(request,"oldsongs.html")#render is a method is used to load pages

def punjabi(request):
	return render(request,"punjabi.html")

def party(request):
	return render(request,"party.html")

def Romantic(request):
	return render(request,"Romantic.html")

def Cafe(request):
	return render(request,"Cafe.html")

def sufi(request):
	return render(request,"sufi.html")

def artist(request):
	return render(request,"artist.html")

def ArijitSingh(request):
	return render(request,"ArijitSingh.html")
def sunidhi(request):
	return render(request,"sunidhi.html")	
def jubinnautiyal(request):
	return render(request,"jubinnautiyal.html")		
def baadshah(request):
	return render(request,"baadshah.html")	
def hollywoodsongs(request):
	return render(request,"hollywoodsongs.html")		
def trending(request):
	return render(request,"trending.html")	