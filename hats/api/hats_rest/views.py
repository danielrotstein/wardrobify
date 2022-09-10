from django.shortcuts import render


# Hat, LocationVO
from .models import Hat, LocationVO


# require_http_methods
from django.views.decorators.http import require_http_methods\


# JSONResponse
from django.http import JsonResponse


# ModelEncoder
from common.json import ModelEncoder

# json
import json





class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [ 
        "import_href",
        "closet_name",
    ]





class HatsDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]

    encoders = {
        "location": LocationVOEncoder(),
    }




class HatsListEncoder(ModelEncoder):
    model = Hat
    properties = [ 
        "style_name",
        "id",
    ]

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}



@require_http_methods({"GET", "POST"})
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hat = Hat.objects.filter(location=location_vo_id)
        else:
            hat = Hat.objects.all()
        
        return JsonResponse(
            {"hats": hat},
            encoder=HatsListEncoder,
        )
    
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location

        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Inavlid location id"},
                status=400,
            )

        hats = Hat.objects.create(**content)
        return JsonResponse(
            hats,
            encoder=HatsDetailEncoder,
            safe=False,
        )
    
            





