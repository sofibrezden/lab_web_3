from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('main.urls')),
    path('admin/', admin.site.urls),

]
#http://127.0.0.1:8000/api/v1/hello-world-4/