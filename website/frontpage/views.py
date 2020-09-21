from django.views import generic
from django.http import HttpResponse


class HomeView(generic.TemplateView):
    template_name = 'frontpage/home.html'


class PasswordView(generic.TemplateView):
    template_name = 'frontpage/password.html'


class QuadraticView(generic.TemplateView):
    template_name = 'frontpage/quadratic.html'


def robots(request):
    response = HttpResponse(
        'User-agent: *\nSitemap: https://refaktor.dev/sitemap.xml', content_type='text/plain')
    return response


class SitemapView(generic.TemplateView):
    template_name = 'frontpage/sitemap.xml'
