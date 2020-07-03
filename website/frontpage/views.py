from django.views import generic
from django.http import HttpResponse

class HomeView(generic.TemplateView):
    template_name = 'frontpage/home.html'


def robots(request):
    response = HttpResponse('User-agent: *', content_type='text/plain')
    return response