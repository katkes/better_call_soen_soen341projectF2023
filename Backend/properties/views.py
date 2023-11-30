"""
Module Docstring: Define views for the properties app.

This module contains views for property CRUD, display, and related functionalities.
"""

import json
from django.forms import model_to_dict
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from accounts.models import CustomUser
from .forms import PropertyForm, OfferForm
from .models import Offer, Property
from django.db.models import Q

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
    if request.method == 'POST' or request.method == 'GET':
        if request.method == 'POST':
            data = json.loads(request.body)
        else:
            data = request.GET.dict()

        if not data:
            properties = Property.objects.all()
            print("nothing")
        else:
            # Use Q objects to perform case-insensitive search
            properties = Property.objects.filter(Q(city__icontains=data))

        serialized_properties = []

        for p in properties:
            assigned_user = CustomUser.objects.get(pk=p.assigned_user_id)
            broker_name = extract_broker_name(assigned_user)

            serialized_property = {
                'price': p.price,
                'city': p.city,
                'rating': p.rating,
                'broker_name': broker_name,
                'broker_id': p.assigned_user_id,
                'num_of_bedrooms': p.num_of_bedrooms,
                'num_of_bathrooms': p.num_of_bathrooms,
                'size': p.size,
                'type_of_property': p.type_of_property,
                'id': p.property_id
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
                'size': p.size,
                'id': p.property_id
            }
            # print(p.property_id)
            serialized_properties.append(serialized_property)

        return JsonResponse(serialized_properties, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


def create_property(request):
    """
    Create a new property and return a JSON response.
    """
    if request.method == 'POST':
        form = PropertyForm(request.POST, request.FILES)
        if form.is_valid():
            property_obj = form.save(commit=False)
            property_obj.assigned_user = request.user
            property_obj.save()

            # Convert the property object to a dictionary for the JSON response
            property_data = model_to_dict(property_obj)
            return JsonResponse({'message': 'Property created successfully', 'property': property_data})
        else:
            return JsonResponse({'error': 'Invalid form data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


def property_detail(request, property_id):
    """
    Retrieve the details of a property and return a JSON response.
    """
    property_obj = get_object_or_404(Property, property_id=property_id)
    property_data = model_to_dict(property_obj)
    return JsonResponse({'property': property_data})


def property_edit(request, property_id):
    """
    Edit an existing property and return a JSON response.
    """
    property_obj = get_object_or_404(Property, property_id=property_id)

    if request.method == 'POST':
        form = PropertyForm(request.POST, instance=property_obj)
        if form.is_valid():
            form.save()

            # Convert the updated property object to a dictionary for the JSON response
            updated_property_data = model_to_dict(Property.objects.get(property_id=property_id))
            return JsonResponse({'message': 'Property updated successfully', 'property': updated_property_data})
        else:
            return JsonResponse({'error': 'Invalid form data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


def property_delete(request, property_id):
    """
    Delete an existing property and return a JSON response.
    """
    property_obj = get_object_or_404(Property, property_id=property_id)
    property_obj.delete()
    return JsonResponse({'message': 'Property deleted successfully'})


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


# def submit_offer(request):
#     """
#     Submits a property offer from a JSON payload.
#     Parameters:
#     - request (HttpRequest): The HTTP request object.
#
#     Returns:
#     - JsonResponse: Result of the offer submission.
#     """
#     if request.method == "POST":
#         data = json.loads(request.body)
#         form_data = {
#             'buyer_name': str(data.get("buyerName")),
#             'buyer_email': str(data.get("buyerEmail")),
#             'buyer_broker_id': int(data.get("buyerBrokerID")),
#             'price_offered': int(data.get("priceOffered")),
#             'property_id': int(data.get("propertyID")),
#             'deed_of_sale_date': str(data.get("deedOfSaleDate")),
#             'occupancy_date': str(data.get("occupancyDate")),
#         }
#         form = OfferForm(form_data)
#         if form.is_valid():
#             form.save()
#             return JsonResponse({"message": "Offer submitted successfully."}, status=201)
#         else:
#             return JsonResponse({"errors": form.errors}, status=400)
#     else:
#         return JsonResponse({"error": "Invalid request method."}, status=405)

# @csrf_exempt
# def submit_offer(request):
#     if request.method == "POST":
#         data = json.loads(request.body)
#
#         if str(data.get("role")) == "renter":
#             form_data = {
#                 'buyer_name': str(data.get("username")),
#                 'buyer_broker_id': int(data.get("userID")),
#                 'price_offered': int(data.get("data1")),
#                 'property_id': int(data.get("propID")),
#             }
#         else:
#             form_data = {
#                 'buyer_name': str(data.get("username")),
#                 'buyer_broker_id': int(data.get("userID")),
#                 'price_offered': int(data.get("data1")) * int(data.get("data2")),
#                 'property_id': int(data.get("propID")),
#             }
#
#         form = OfferForm(form_data)
#         if form.is_valid():
#             form.save()
#             return JsonResponse({"message": "Offer submitted successfully."}, status=201)
#         else:
#             return JsonResponse({"errors": form.errors}, status=400)
#     else:
#         return JsonResponse({"error": "Invalid request method."}, status=405)

@csrf_exempt
def submit_offer(request):
    if request.method == "POST":
        data = json.loads(request.body)

        role = str(data.get("role"))
        username = str(data.get("username"))
        userID = int(data.get("userID"))

        if role == "renter":
            price_offered = int(data.get("offerAmount"))
        else:
            amount = int(data.get("offerAmount"))
            time = int(data.get("offerTime"))
            price_offered = amount * time

        # Ensure that propID is a string or a number
        propID = data.get("propID")
        if (isinstance(propID,dict)):
            propID = data.get("propID").get("propID")

        print(data)
        print("here")
        print(propID)

        # try:
        #     propID = int(propID)  # Try converting to int if it's a string representation of an integer
        # except (TypeError, ValueError):
        #     return JsonResponse({"error": "propID must be a string or a number."}, status=400)


        form_data = {
            'buyer_name': username,
            'buyer_broker_id': userID,
            'price_offered': price_offered,
            'property_id': propID,
        }

        form = OfferForm(form_data)
        if form.is_valid():
            form.save()
            return JsonResponse({"message": "Offer submitted successfully."}, status=201)
        else:
            return JsonResponse({"errors": form.errors}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=405)


def offer_list(request, user_id):
    """
    Retrieves a list of offers associated with properties assigned to a user.

    Parameters:
    - request (HttpRequest): The HTTP request object.
    - user_id (int): ID of the user whose assigned properties are considered.

    Returns:
    - JsonResponse: JSON response containing a list of offers associated with the user's properties.
    """
    matching_properties = Property.objects.filter(assigned_user=user_id)

    # Initialize a list to store offers data
    offers_data = []

    # Loop through the matching properties
    for property_instance in matching_properties:
        # Query for offers associated with the property and assigned_user
        matching_offers = Offer.objects.filter(property=property_instance)

        # Optionally, you can use the matching_offers queryset as needed
        for offer in matching_offers:
            # Collect offer data as needed (modify this based on your Offer model structure)
            offer_data = {
                'offer_id': offer.id,
                'amount': offer.amount,
                'property_id': property_instance.id,
                # Add more fields as needed
            }
            offers_data.append(offer_data)

    # Optionally, you can return the offers data as JSON response
    return JsonResponse({'offers_data': offers_data})


# def submit_offer(request, property_id):
#     """
#     Submit an offer for the specified property and redirect to the property detail page.
#     """
#     property_obj = get_object_or_404(Property, property_id=property_id)
#
#     if request.method == 'POST':
#         form = OfferForm(request.POST)
#         if form.is_valid():
#             offer = form.save(commit=False)
#             # Assuming request.user is authenticated and has a broker profile
#             offer.buyer_broker = request.user.broker
#             offer.property = property_obj
#             offer.save()
#
#             send_mail(
#                 subject="Property Offer",
#                 message=f"{offer.buyer_name} made an offer on the property.",
#                 from_email=offer.buyer_email,
#                 recipient_list=[property_obj.assigned_user.email]
#             )
#
#             # Redirect to the property detail page after a successful offer submission
#             return redirect('property_detail', property_id=property_obj.property_id)
#
#     else:
#         form = OfferForm()
#
#     return render(request, 'offer_submission.html', {'form': form, 'property': property_obj})

def reject_offer(request, offer_id):
    """
    Reject an offer and send an email to the broker. The offer is deleted from the database.

    Args:
        request (HttpRequest): The HTTP request object.
        offer_id (int): The ID of the offer to be rejected.

    Returns:
        JsonResponse: JSON response indicating the rejection of the offer.
    """
    offer = get_object_or_404(Offer, pk=offer_id)

    if request.method == 'POST':
        # Perform actions to reject the offer
        offer.delete()

        # Send email to the broker
        broker_email = offer.property_id.assigned_user.email
        send_mail(
            subject="Offer Rejected",
            message=f"The offer from {offer.buyer_name} has been rejected for property {offer.property}.",
            from_email=broker_email,  # Update with your email
            recipient_list=[offer.buyer_email],
        )

        return JsonResponse({'message': 'Offer rejected successfully'})

    return JsonResponse({'error': 'Invalid request method'}, status=400)


def accept_offer(request, offer_id):
    """
    Accept an offer, update the on_sale value, and send an email to the buyer.

    Args:
        request (HttpRequest): The HTTP request object.
        offer_id (int): The ID of the offer to be accepted.

    Returns:
        JsonResponse: JSON response indicating the acceptance of the offer.
    """
    offer = get_object_or_404(Offer, pk=offer_id)

    if request.method == 'POST':
        # Perform actions to accept the offer
        offer.property.for_sale = False  # Set the property's on_sale value to False
        offer.property.save()

        # Send email to the buyer
        send_mail(
            subject="Offer Accepted",
            message=f"Congratulations! Your offer for property {offer.property} has been accepted.",
            from_email="your@email.com",  # Update with your email
            recipient_list=[offer.buyer_email],
        )

        # Delete the offer from the database
        offer.delete()

        return JsonResponse({'message': 'Offer accepted successfully'})

    return JsonResponse({'error': 'Invalid request method'}, status=400)
