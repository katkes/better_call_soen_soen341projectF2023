from django.contrib.auth import login
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from .forms import SignUpForm, UserUpdateForm
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = SignUpForm(data)
        if form.is_valid():
            form.save()
            print("hello")
            # You can add additional logic here, such as sending a confirmation email
            # Redirect to login page after successful registration
            return redirect('home')
        else:
            print(form.errors)
    else:
        form = SignUpForm()
        print("hello not valid")
    return render(request, 'signup.html', {'form': form})


@csrf_exempt
def custom_login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        # Assuming your JSON contains an 'email' field
        email = data.get('email')
        password = data.get('password')
        user = authenticate(request, username=email,
                            password=password)  # Use email as username

        if user is not None:
            login(request, user)
            # Replace with your desired response
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)

    return JsonResponse({'message': 'Method not allowed'}, status=405)


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