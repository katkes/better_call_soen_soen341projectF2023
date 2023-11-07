from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', custom_login, name='login'),
    path('users/', user_list, name='user_list'),
    path('user/<int:user_id>/', user_detail, name='user_detail'),
    path('user/create/', create_user, name='create_user'),
    path('user/<int:user_id>/update/', update_user, name='update_user'),
     path('search_brokers/', search_brokers, name='search_brokers'),
    # Add any other URLs you may need
]
