from django.shortcuts import render

# views.py

from django.http import JsonResponse
from .models import Product

def product_list(request):
    products = Product.objects.all()  # Query all products using MongoEngine
    product_data = [{"name": p.name, "price": p.price, "description": p.description} for p in products]
    return JsonResponse(product_data, safe=False)

