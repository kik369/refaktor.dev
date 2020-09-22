"""website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.urls import path
from . import views

app_name = 'frontpage'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('password', views.PasswordView.as_view(), name='password'),
    path('clock', views.ClockView.as_view(), name='clock'),
    path('quadratic', views.QuadraticView.as_view(), name='quadratic'),
    path('robots.txt', views.robots, name='robots'),
    path('sitemap.xml', views.SitemapView.as_view(), name='sitemap'),
]
