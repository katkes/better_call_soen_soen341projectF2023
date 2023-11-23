"""
URL Configuration for the accounts app.

This module defines the URL patterns for the views in the accounts app.
"""

from django.urls import path
from .views import (
    signup, custom_login, user_list, user_detail, create_user,
    update_user, search_brokers, request_info, broker_property_listings,
    profile_view, index, custom_logout, delete_user
)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', custom_login, name='login'),
    path('users/', user_list, name='user_list'),
    path('user/<int:user_id>/', user_detail, name='user_detail'),
    path('user/create/', create_user, name='create_user'),
    path('user/<int:user_id>/update/', update_user, name='update_user'),
    path('search_brokers/', search_brokers, name='search_brokers'),
    path('request_info/<int:broker_id>/', request_info, name='request_info'),
    path('broker_property_listings/<int:broker_id>/',
         broker_property_listings, name='broker_property_listings'),
    path('accounts/profile/', profile_view, name='profile'),
    path('', index, name='index'),
    path('logout/', custom_logout, name='logout'),
    path('user/<int:user_id>/delete/', delete_user, name='delete_user'),
]
