"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('oldsongs/', views.oldsongs),
    path('punjabi/', views.punjabi),
    path('party/', views.party),
    path('Romantic/', views.Romantic),
    path('Cafe/', views.Cafe),
    path('sufi/', views.sufi),
    path('artist/', views.artist),
    path('ArijitSingh/', views.ArijitSingh),
    path('sunidhi/', views.sunidhi),
    path('jubinnautiyal/', views.jubinnautiyal),
    path('baadshah/', views.baadshah),
    path('hollywoodsongs/', views.hollywoodsongs),
    path('trending/', views.trending)
]
