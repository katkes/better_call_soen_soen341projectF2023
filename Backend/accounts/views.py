from django.contrib.auth import login
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from properties.models import Property
from .forms import SignUpForm, UserUpdateForm, LoginForm
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.views.decorators.csrf import csrf_exempt
from .models import Broker, CustomUser
from django.core.exceptions import ValidationError


# old
# @csrf_exempt
# def signup(request):
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             email = form.cleaned_data['email']
#             name = form.cleaned_data['name']
#             phone_number = form.cleaned_data['phone_number']
#             role = form.cleaned_data['role']
#             password = form.cleaned_data['password']
#
#             # Create user with hashed password
#             user = CustomUser.objects.create_user(
#                 email=email,
#                 name=name,
#                 phone_number=phone_number,
#                 role=role,
#                 password=password
#             )
#             print("Was successful")
#             # Redirect to index.html after successful signup
#             return redirect('index')
#             # return JsonResponse({"message": "User was registered successfully"})
#         else:
#             print(form.errors)  # Print form errors for debugging
#     else:
#         form = SignUpForm()
#         print("hello not valid")
#     return render(request, 'signup.html', {'form': form})


@csrf_exempt
def signup(request):
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

# @csrf_exempt
# def custom_login(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         User = get_user_model()
#         form = SignUpForm(data)
#         if form.is_valid():
#             email = form.cleaned_data['email']
#             name = form.cleaned_data['name']
#             phone_number = form.cleaned_data['phone_number']
#             role = form.cleaned_data['role']
#             password = form.cleaned_data['password']
#             password_confirmation = form.cleaned_data['password_confirmation']
#
#             if password != password_confirmation:
#                 return JsonResponse({"error": "Passwords do not match"}, status=400)
#
#             try:
#                 user = User.objects.create_user(
#                     email=email,
#                     name=name,
#                     phone_number=phone_number,
#                     role=role,
#                     password=password
#                 )
#                 return JsonResponse({"message": "User was registered successfully"})
#             except ValidationError as e:
#                 return JsonResponse({"error": str(e)}, status=400)
#         else:
#             return JsonResponse({"error": form.errors}, status=400)
#     else:
#         form = SignUpForm()
#     return render(request, 'signup.html', {'form': form})


@csrf_exempt
def custom_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        User = get_user_model()
        form = LoginForm(data)
        if form.is_valid():
            print("valid")
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            user = authenticate(request, email=email, password=password)  # Use Django's authenticate function

            if user is not None:
                login(request, user)  # Use Django's login function
                print(user)
                return JsonResponse({"message": "User was logged in successfully",
                                     "id": user.id,
                                     "name":user.name,
                                     "role":user.role})
            else:
                return JsonResponse({"error": "Invalid email or password"}, status=400)
        else:
            return JsonResponse({"error": form.errors}, status=400)
    else:
        print("bad")
        form = LoginForm()  # Use LoginForm instead of SignUpForm
    return render(request, 'login.html', {'form': form})  # Render 'login.html' instead of 'signup.html'


def user_list(request):
    users = CustomUser.objects.all()
    return render(request, 'user_list.html', {'users': users})


def user_detail(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    return render(request, 'user_detail.html', {'user': user})


def create_user(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            # Redirect to user list after successful creation
            return redirect('user_list')
    else:
        form = SignUpForm()
    return render(request, 'create_user.html', {'form': form})


def update_user(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            # Redirect to user list after successful update
            return redirect('user_list')
    else:
        form = UserUpdateForm(instance=user)
    return render(request, 'update_user.html', {'form': form})


def delete_user(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    user.delete()
    # Redirect to user list after successful deletio
    return redirect('user_list')


# views.py

#old search brokers
# def search_brokers(request):
#     query = request.GET.get('query')
#     brokers = CustomUser.objects.filter(role='broker')
#
#     if query:
#         brokers = brokers.filter(name__icontains=query)
#
#     # Get active property listings for each broker
#     return render(request, 'search_brokers.html', {'brokers': brokers})

@csrf_exempt
def search_brokers(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)

        brokers = CustomUser.objects.filter(role="broker")

        if data:
            brokers = brokers.filter(name=data)


        serializedBrokers = []

        for broker in brokers:
            serializedBroker = {
                "name" : broker.name,
                "email": broker.email,
                "phone_number": broker.phone_number
            }

            serializedBrokers.append(serializedBroker)


        return JsonResponse(serializedBrokers, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


def request_info(request, broker_id):
    broker = get_object_or_404(Broker, id=broker_id)
    # Handle the request (send email, save to database, etc.)
    # Add your logic here...
    return render(request, 'request_info.html', {'broker': broker})


def broker_property_listings(request, broker_id):
    broker = get_object_or_404(CustomUser, id=broker_id)
    properties = Property.objects.filter(assigned_user=broker)

    return render(request, 'broker_property_listings.html', {'broker': broker, 'properties': properties})


def profile_view(request):
    user = request.user  # Assuming the user is logged in
    return render(request, 'profile.html', {'user': user})


def index(request):
    return render(request, 'index.html')


@csrf_exempt
def custom_logout(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
