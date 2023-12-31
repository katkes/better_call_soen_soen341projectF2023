"""
Module Docstring: Define URL patterns for the properties app.

This module contains URL patterns for handling property-related views.
"""

from django.urls import path
from . import views

urlpatterns = [
    path('api/properties/', views.get_properties, name='get_properties'),
    path('property_search/', views.property_search, name='property_search'),
    path('property_filter/', views.property_filter, name='property_filter'),
    path('property/create/<int:user_id>/',
         views.create_property, name='create_property'),
    path('properties/', views.property_list, name='property_list'),
    path('property/<int:property_id>/', views.property_detail, name='property_detail'),
    path('property/<int:property_id>/edit/', views.property_edit, name='property_edit'),
    path('property/<int:property_id>/delete/', views.property_delete, name='property_delete'),
    path('request_visit/<int:property_id>/', views.request_visit, name='request_visit'),
    path('email_form/', views.email_form, name='email_form'),
    path('send_email/', views.send_email, name='send_email'),
    path('email_success/', views.email_success, name='email_success'),
    # path('submit_offer/<int:property_id>/', views.submit_offer, name='submit_offer'),
    path('submit_offer/', views.submit_offer, name='submit_offer'),
    path('reject_offer/<int:offer_id>/', views.reject_offer, name='reject_offer'),
    path('accept_offer/<int:offer_id>/', views.accept_offer, name='accept_offer'),
    path('offer_list/<int:user_id>', views.offer_list, name='offer_list')


    # Create this view as well

    # Add other URL patterns as needed
]
