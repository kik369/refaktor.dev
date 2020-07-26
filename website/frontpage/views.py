from django.views import generic
from django.http import HttpResponse


class HomeView(generic.TemplateView):
    template_name = 'frontpage/home.html'


def robots(request):
    response = HttpResponse(
<<<<<<< HEAD
        'User-agent: *\nSitemap: http://refaktor.dev/sitemap.xml', content_type='text/plain')
=======
        'User-agent: *\nSitemap: https://refaktor.dev/sitemap.xml', content_type='text/plain')
>>>>>>> 4052377a0bc2930da3fce5cdbcddb5a813028a8e
    return response


class SitemapView(generic.TemplateView):
    template_name = 'frontpage/sitemap.xml'
