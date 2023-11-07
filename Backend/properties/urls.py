from django.urls import path
from . import views

urlpatterns = [
    path('api/properties/', views.get_properties, name='get_properties'),
    path('property_search/', views.property_search, name='property_search'),
    path('property/create/', views.create_property, name='create_property'),
    path('properties/', views.property_list, name='property_list'),
    path('property/<int:property_id>/',
         views.property_detail, name='property_detail'),
    path('property/<int:property_id>/edit/',
         views.property_edit, name='property_edit'),
    path('property/<int:property_id>/delete/',
         views.property_delete, name='property_delete'),
    path('request_visit/<int:property_id>/', views.request_visit, name='request_visit'),
    path('email_form/', views.email_form, name='email_form'),
    path('send_email/', views.send_email, name='send_email'),
    path('email_success/', views.email_success, name='email_success'),  # Create this view as well

    # Add other URL patterns as needed
]
