from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfessionalViewSet
from django.contrib import admin
from .views import process_payment

router = DefaultRouter()
router.register(r'professionals', ProfessionalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('process-payment/', process_payment, name='process_payment'),
    path('admin/', admin.site.urls),
    path('', include('btapp.urls')),
]
