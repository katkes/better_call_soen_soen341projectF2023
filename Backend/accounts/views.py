import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import SignUpForm
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = SignUpForm(data)
        if form.is_valid():
            form.save()
            print("hello")
            # You can add additional logic here, such as sending a confirmation email
            return redirect('home')  # Redirect to login page after successful registration
        else:
            print(form.errors)
    else:
        form = SignUpForm()
        print("hello not valid")
    return render(request, 'signup.html', {'form': form})

import json
from django.contrib.auth import login

@csrf_exempt
def custom_login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')  # Assuming your JSON contains an 'email' field
        password = data.get('password')
        user = authenticate(request, username=email, password=password)  # Use email as username

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})  # Replace with your desired response
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)

    return JsonResponse({'message': 'Method not allowed'}, status=405)
