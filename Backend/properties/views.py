"""
Module Docstring: Define views for the properties app.

This module contains views for property CRUD, display, and related functionalities.
"""

import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from accounts.models import CustomUser
from .forms import PropertyForm, OfferForm
from .models import Property

# Use constants for magic numbers
DEFAULT_PRICE_UPPER_BOUND = 800000
DEFAULT_SIZE_UPPER_BOUND = 2000
DEFAULT_BATHROOMS_UPPER_BOUND = 3
DEFAULT_BEDROOMS_UPPER_BOUND = 10


def extract_broker_name(assigned_user):
    """
    Extract the broker name from the assigned user if available.
    """
    broker_name = None
    if assigned_user and hasattr(assigned_user, 'broker'):
        broker_name = assigned_user.name
    return broker_name


def get_properties(request):
    """
    Retrieve and return all properties in a JSON response.
    """
    properties = Property.objects.all()
    serialized_properties = [{'price': p.price,
                              'size': p.size,
                              'num_of_bedrooms': p.num_of_bathrooms,
                              'num_of_bathrooms': p.num_of_bathrooms,
                              'city': p.city,
                              'rating': p.rating} 
                             for p in properties]
    return JsonResponse(serialized_properties, safe=False)


def property_list(request):
    """
    Render a property list page with all available properties.
    """
    properties = Property.objects.all()
    context = {'properties': properties}
    return render(request, 'property_list.html', context)


@csrf_exempt
def property_search(request):
    """
    Search for properties based on the provided data and return the results in a JSON response.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)

        if not data:
            properties = Property.objects.all()
            print("nothing")
        else:
            properties = Property.objects.filter(city=data)

        serialized_properties = []

        for p in properties:
            assigned_user = CustomUser.objects.get(pk=p.assigned_user_id)
            broker_name = extract_broker_name(assigned_user)

            serialized_property = {
                'price': p.price,
                'city': p.city,
                'rating': p.rating,
                'broker_name': broker_name,
                'num_of_bedrooms': p.num_of_bathrooms,
                'num_of_bathrooms': p.num_of_bathrooms,
                'size': p.size
            }
            serialized_properties.append(serialized_property)

        return JsonResponse(serialized_properties, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def property_filter(request):
    """
    Filter properties based on the provided data and return the results in a JSON response.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        price_upper_bound = int(data.get('Price', DEFAULT_PRICE_UPPER_BOUND))
        size_upper_bound = int(data.get('Size', DEFAULT_SIZE_UPPER_BOUND))
        bathrooms_upper_bound = int(data.get('numBathrooms', DEFAULT_BATHROOMS_UPPER_BOUND))
        bedrooms_upper_bound = int(data.get('numBedrooms', DEFAULT_BEDROOMS_UPPER_BOUND))

        properties = Property.objects.filter(
            price__lte=price_upper_bound,
            size__lte=size_upper_bound,
            num_of_bathrooms__lte=bathrooms_upper_bound,
            num_of_bedrooms__lte=bedrooms_upper_bound,
            for_sale=True
        )

        serialized_properties = []

        for p in properties:
            assigned_user = CustomUser.objects.get(pk=p.assigned_user_id)
            broker_name = extract_broker_name(assigned_user)

            serialized_property = {
                'price': p.price,
                'city': p.city,
                'rating': p.rating,
                'broker_name': broker_name,
                'num_of_bedrooms': p.num_of_bathrooms,
                'num_of_bathrooms': p.num_of_bathrooms,
                'size': p.size
            }
            serialized_properties.append(serialized_property)

        return JsonResponse(serialized_properties, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@login_required
def create_property(request):
    """
    Create a new property and redirect to the property detail page.
    """
    if request.method == 'POST':
        form = PropertyForm(request.POST, request.FILES)
        if form.is_valid():
            property_obj = form.save(commit=False)
            property_obj.assigned_user = request.user
            property_obj.save()
            return redirect('property_detail', property_id=property_obj.property_id)
    else:
        form = PropertyForm()
    return render(request, 'property_create.html', {'form': form})


def property_detail(request, property_id):
    """
    Render the property detail page for the specified property.
    """
    property_obj = Property.objects.get(property_id=property_id)
    return render(request, 'property_detail.html', {'property': property_obj})


def property_edit(request, property_id):
    """
    Edit an existing property and redirect to the property list page.
    """
    property_obj = Property.objects.get(property_id=property_id)

    if request.method == 'POST':
        form = PropertyForm(request.POST, instance=property_obj)
        if form.is_valid():
            form.save()
            return redirect('property_list')  # Redirect to property_list view
    else:
        form = PropertyForm(instance=property_obj)

    return render(request, 'property_edit.html', {'form': form, 'property': property_obj})


def property_delete(request, property_id):
    """
    Delete an existing property and redirect to the property list page.
    """
    property_obj = Property.objects.get(property_id=property_id)
    property_obj.delete()
    return redirect('property_list')


def request_visit(request, property_id):
    """
    Send a visit request email for the specified property and redirect to the property detail page.
    """
    property_obj = get_object_or_404(Property, property_id=property_id)
    assigned_user_email = property_obj.assigned_user.email

    # Send the visit request email
    subject = 'Visit Request for Property'
    message = 'Hello,\n\nI would like to request a visit for your property.'
    sender_email = 'sender@example.com'
    send_mail(subject, message, sender_email, [assigned_user_email])

    return redirect('property_detail', property_id=property_id)


def email_form(request):
    """
    Render the email form page with the provided 'to' parameter.
    """
    # Get the 'to' parameter from the query string
    to_email = request.GET.get('to', '')

    # Pass the 'to' parameter to the template
    return render(request, 'email_form.html', {'to_email': to_email})


def send_email(request):
    """
    Send an email based on the provided data and redirect to the email success page.
    """
    if request.method == 'POST':
        to_email = request.POST.get('to')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        from_email = 'webmaster@example.com'  # Change this to your actual sender email

        send_mail(subject, message, from_email, [to_email])

        # Redirect to a success page or wherever you want
        return redirect('email_success')

    return HttpResponseBadRequest('Invalid request')


def email_success(request):
    """
    Render the email success page.
    """
    return render(request, 'email_success.html')


def submit_offer(request, property_id):
    """
    Submit an offer for the specified property and redirect to the property detail page.
    """
    property_obj = get_object_or_404(Property, property_id=property_id)

    if request.method == 'POST':
        form = OfferForm(request.POST)
        if form.is_valid():
            offer = form.save(commit=False)
            # Assuming request.user is authenticated and has a broker profile
            offer.buyer_broker = request.user.broker
            offer.property = property_obj
            offer.save()
            return redirect('property_detail', property_id=property_obj.property_id)
    else:
        form = OfferForm()

    return render(request, 'offer_submission.html', {'form': form, 'property': property_obj})
