"""
Module Docstring: Define views for the accounts app.

This module contains views for user authentication, profile, and related functionalities.
"""

import json
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from properties.models import Property
from .forms import SignUpForm, UserUpdateForm, LoginForm
from .models import Broker, CustomUser


@csrf_exempt
def signup(request):
    """
    Handle user registration.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        User = get_user_model()
        form = SignUpForm(data)
        if form.is_valid():
            email = form.cleaned_data['email']
            name = form.cleaned_data['name']
            phone_number = form.cleaned_data['phone_number']
            role = form.cleaned_data['role']
            password = form.cleaned_data['password']
            password_confirmation = form.cleaned_data['password_confirmation']

            if password != password_confirmation:
                return JsonResponse({"error": "Passwords do not match"}, status=400)

            try:
                user = User.objects.create_user(
                    email=email,
                    name=name,
                    phone_number=phone_number,
                    role=role,
                    password=password
                )
                return JsonResponse({"message": "User was registered successfully"})
            except ValidationError as e:
                return JsonResponse({"error": str(e)}, status=400)
        else:
            return JsonResponse({"error": form.errors}, status=400)
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})


@csrf_exempt
def custom_login(request):
    """
    Handle user login.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        User = get_user_model()
        form = LoginForm(data)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            user = authenticate(request, email=email, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({"message": "User was logged in successfully",
                                     "id": user.id,
                                     "name": user.name,
                                     "role": user.role})
            else:
                return JsonResponse({"error": "Invalid email or password"}, status=400)
        else:
            return JsonResponse({"error": form.errors}, status=400)
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})


def user_list(request):
    """
    Display a list of users.
    """
    users = CustomUser.objects.all()
    return render(request, 'user_list.html', {'users': users})


def user_detail(request, user_id):
    """
    Display details of a specific user.
    """
    user = get_object_or_404(CustomUser, id=user_id)
    return render(request, 'user_detail.html', {'user': user})


def create_user(request):
    """
    Create a new user.
    """
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('user_list')
    else:
        form = SignUpForm()
    return render(request, 'create_user.html', {'form': form})


def update_user(request, user_id):
    """
    Update an existing user.
    """
    user = get_object_or_404(CustomUser, id=user_id)
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('user_list')
    else:
        form = UserUpdateForm(instance=user)
    return render(request, 'update_user.html', {'form': form})


def delete_user(request, user_id):
    """
    Delete an existing user.
    """
    user = get_object_or_404(CustomUser, id=user_id)
    user.delete()
    return redirect('user_list')


@csrf_exempt
def search_brokers(request):
    """
    Search for brokers based on the provided query.
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        brokers = CustomUser.objects.filter(role="broker")

        if data:
            brokers = brokers.filter(name=data)

        serialized_brokers = []

        for broker in brokers:
            serialized_broker = {
                "name": broker.name,
                "email": broker.email,
                "phone_number": broker.phone_number
            }

            serialized_brokers.append(serialized_broker)

        return JsonResponse(serialized_brokers, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


def request_info(request, broker_id):
    """
    Handle a request for information about a broker.
    """
    broker = get_object_or_404(Broker, id=broker_id)
    # Handle the request (send email, save to database, etc.)
    # Add your logic here...
    return render(request, 'request_info.html', {'broker': broker})


def broker_property_listings(request, broker_id):
    """
    Display property listings for a specific broker.
    """
    broker = get_object_or_404(CustomUser, id=broker_id)
    properties = Property.objects.filter(assigned_user=broker)
    return render(request, 'broker_property_listings.html', {'broker': broker, 'properties': properties})


def profile_view(request):
    """
    Display the profile of the currently logged-in user.
    """
    user = request.user
    return render(request, 'profile.html', {'user': user})


def index(request):
    """
    Display the index page.
    """
    return render(request, 'index.html')


@csrf_exempt
def custom_logout(request):
    """
    Handle user logout.
    """
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
