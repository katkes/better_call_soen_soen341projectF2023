from .forms import PropertyForm
from django.shortcuts import render, redirect

# Create your views here.
from django.http import JsonResponse
from .models import Property


def get_properties(request):
    properties = Property.objects.all()
    serialized_properties = [{'name': p.name, 'price': p.price,
                              'country': p.country, 'rating': p.rating} for p in properties]
    return JsonResponse(serialized_properties, safe=False)


def property_list(request):
    properties = Property.objects.all()
    context = {'properties': properties}
    return render(request, 'property_list.html', context)


def property_search(request):
    query = request.GET.get('q')
    if query is not None:
        properties = Property.objects.filter(name__icontains=query)
    else:
        properties = Property.objects.all()
    return render(request, 'property_search_results.html', {'properties': properties})


def create_property(request):
    if request.method == 'POST':
        form = PropertyForm(request.POST, request.FILES)
        if form.is_valid():
            property = form.save()  # Save the form and get the created property object
            # Redirect to the property_detail view for the newly created property
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
