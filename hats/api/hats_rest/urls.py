from hats_rest.views import api_list_hats

from django.urls import path


urlpatterns = [
    path("hats/", api_list_hats, name="api_list_hats"),
]
