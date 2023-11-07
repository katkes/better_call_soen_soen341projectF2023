from django.db import models
from django.contrib import admin
from django.contrib.auth import get_user_model

class Property(models.Model):
    property_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    country = models.CharField(max_length=50)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    image = models.ImageField(upload_to='property_images/')
    assigned_user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, blank=True)


class PropertyAdmin(admin.ModelAdmin):
    list_display = ('property_id', 'name', 'price', 'country', 'rating')
    
    def save_model(self, request, obj, form, change):
        if not obj.assigned_user:
            obj.assigned_user = request.user
        obj.save()
        print(f"Saved property with name '{obj.name}' by user '{request.user}'")
