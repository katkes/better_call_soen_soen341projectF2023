from django.urls import path
from django.contrib.auth.views import LoginView
from .views import *

urlpatterns = [
    path('signup/', signup, name='signup'),
    #path('login/', custom_login, name='login'),
     path('login/', LoginView.as_view(template_name='login.html'), name='login'),
    path('users/', user_list, name='user_list'),
    path('user/<int:user_id>/', user_detail, name='user_detail'),
    path('user/create/', create_user, name='create_user'),
    path('user/<int:user_id>/update/', update_user, name='update_user'),
     path('search_brokers/', search_brokers, name='search_brokers'),
      path('request_info/<int:broker_id>/', request_info, name='request_info'),
      path('broker_property_listings/<int:broker_id>/', broker_property_listings, name='broker_property_listings'),
       path('accounts/profile/', profile_view, name='profile'),
    # Add any other URLs you may need
]
