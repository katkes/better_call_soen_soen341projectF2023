from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('property_search_results/', TemplateView.as_view(
        template_name='property_search_results.html'), name='property_search_results'),
    path('', include('accounts.urls')),  # Assuming this handles authentication
    path('', include('properties.urls')),
    # This should be the last pattern to handle any other routes
    path('', TemplateView.as_view(template_name='index.html')),
]
