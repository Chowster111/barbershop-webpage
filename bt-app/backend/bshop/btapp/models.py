from djongo import models

class Professional(models.Model):
    name = models.CharField(max_length=100)
    availableDate = models.CharField(max_length=100, blank=True)
    price = models.CharField(max_length=10)
    serviceName = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'btapp'
