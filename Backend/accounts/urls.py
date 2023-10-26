from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', signup, name='signup'),
     path('login/', login, name='login'),
    # Add any other URLs you may need
]
