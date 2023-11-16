import json

from accounts.models import CustomUser
from .forms import PropertyForm, OfferForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
# Create your views here.
from django.shortcuts import get_object_or_404, redirect
from django.core.mail import send_mail
from django.http import HttpResponseBadRequest, JsonResponse
from .models import Property
from django.views.decorators.csrf import csrf_exempt


def get_properties(request):
    properties = Property.objects.all()
    serialized_properties = [{'price': p.price, 'size': p.size, 'num_of_bedrooms': p.num_of_bathrooms,
                              'num_of_bathrooms': p.num_of_bathrooms,
                              'city': p.city, 'rating': p.rating} for p in properties]
    return JsonResponse(serialized_properties, safe=False)


def property_list(request):
    properties = Property.objects.all()
    context = {'properties': properties}
    return render(request, 'property_list.html', context)


# old property search
def property_search(request):
    query = request.GET.get('q')
    print("Received query:", query)
    if query is not None:
        properties = Property.objects.filter(
            name__icontains=query, for_sale=True)
    else:
        properties = Property.objects.all()

    serialized_properties = []
    for p in properties:
        broker_name = None
        if p.assigned_user_id:  # Check if there's an assigned user ID
            assigned_user = CustomUser.objects.get(pk=p.assigned_user_id)
            if hasattr(assigned_user, 'broker'):
                broker_name = assigned_user.name

        serialized_property = {
            'price': p.price,
            'size': p.size,
            'num_of_bedrooms': p.num_of_bathrooms,
            'num_of_bathrooms': p.num_of_bathrooms,
            'city': p.city,
            'rating': p.rating,
            'broker_name': broker_name
        }
        serialized_properties.append(serialized_property)

    return JsonResponse(serialized_properties, safe=False)


@csrf_exempt
def property_filter(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        priceUpperBound = int(data.get('Price', 800000))
        sizeUpperBound = int(data.get('Size', 2000))
        bathroomsUpperBound = int(data.get('numBathrooms', 3))
        bedroomsUpperBound = int(data.get('numBedrooms', 10))

        properties = Property.objects.filter(
            price__lte=priceUpperBound,
            size__lte=sizeUpperBound,
            num_of_bathrooms__lte=bathroomsUpperBound,
            num_of_bedrooms__lte=bedroomsUpperBound,
            for_sale=True
        )

        serializedProperties = []

        for p in properties:
            brokerName = None
            if p.assigned_user_id:
                assignedUser = CustomUser.objects.get(pk=p.assigned_user_id)
                if hasattr(assignedUser, 'broker'):
                    brokerName = assignedUser.name
                    # brokerID =

            serializedProperty = {
                'price': p.price,
                'city': p.city,
                'rating': p.rating,
                'brokerName': brokerName,
                'num_of_bedrooms': p.num_of_bathrooms,
                'num_of_bathrooms': p.num_of_bathrooms,
                'size': p.size
            }
            serializedProperties.append(serializedProperty)

        return JsonResponse(serializedProperties, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


@login_required
def create_property(request):
    if request.method == 'POST':
        form = PropertyForm(request.POST, request.FILES)
        if form.is_valid():
            property = form.save(commit=False)
            property.assigned_user = request.user
            property.save()
            return redirect('property_detail', property_id=property.property_id)
    else:
        form = PropertyForm()
    return render(request, 'property_create.html', {'form': form})


def property_detail(request, property_id):
    property = Property.objects.get(property_id=property_id)
    return render(request, 'property_detail.html', {'property': property})


def property_edit(request, property_id):
    property = Property.objects.get(property_id=property_id)

    if request.method == 'POST':
        form = PropertyForm(request.POST, instance=property)
        if form.is_valid():
            form.save()
            return redirect('property_list')  # Redirect to property_list view
    else:
        form = PropertyForm(instance=property)

    return render(request, 'property_edit.html', {'form': form, 'property': property})


def property_delete(request, property_id):
    property = Property.objects.get(property_id=property_id)
    property.delete()
    return redirect('property_list')


def request_visit(request, property_id):
    property = get_object_or_404(Property, property_id=property_id)
    assigned_user_email = property.assigned_user.email

    # Send the visit request email
    subject = 'Visit Request for Property'
    message = f'Hello,\n\nI would like to request a visit for your property.'
    sender_email = 'sender@example.com'
    send_mail(subject, message, sender_email, [assigned_user_email])

    return redirect('property_detail', property_id=property_id)


# views.py


def email_form(request):
    # Get the 'to' parameter from the query string
    to_email = request.GET.get('to', '')

    # Pass the 'to' parameter to the template
    return render(request, 'email_form.html', {'to_email': to_email})


def send_email(request):
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
    return render(request, 'email_success.html')


def submit_offer(request, property_id):
    property = get_object_or_404(Property, property_id=property_id)

    if request.method == 'POST':
        form = OfferForm(request.POST)
        if form.is_valid():
            offer = form.save(commit=False)
            # Assuming request.user is authenticated and has a broker profile
            offer.buyer_broker = request.user.broker
            offer.property = property
            offer.save()
            return redirect('property_detail', property_id=property.property_id)
    else:
        form = OfferForm()

    return render(request, 'offer_submission.html', {'form': form, 'property': property})
