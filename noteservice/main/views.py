from django.http import JsonResponse

def hello_world(request, variant_number):
    return JsonResponse(f'Hello World {variant_number}', safe=False)
