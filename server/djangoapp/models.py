# Uncomment the following imports before adding the Model code

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.


# <HINT> Create a Car Make model `class CarMake(models.Model)`:
# - Name
# - Description
# - Any other fields you would like to include in car make model
# - __str__ method to print a car make object
class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # Other fields as needed

    def __str__(self):
        return self.name  # Return the name as the string representation


# <HINT> Create a Car Model model `class CarModel(models.Model):`:
# - Many-To-One relationship to Car Make model (One Car Make has many
# Car Models, using ForeignKey field)
# - Name
# - Type (CharField with a choices argument to provide limited choices
# such as Sedan, SUV, WAGON, etc.)
# - Year (IntegerField) with min value 2015 and max value 2023
# - Any other fields you would like to include in car model
# - __str__ method to print a car make object
class CarModel(models.Model):
    car_make = models.ForeignKey(
        CarMake, on_delete=models.CASCADE
    )  # Many-to-One relationship
    name = models.CharField(max_length=100)
    CAR_TYPES = [
        ("SEDAN", "Sedan"),
        ("SUV", "SUV"),
        ("WAGON", "Wagon"),
        ("HATCHBACK", "Hatchback"),
        ("COUPE", "Coupe"),
        ("MINIVAN", "Minivan"),
        ("PICKUP", "Pickup"),
        ('CONVERTIBLE', 'Convertible'),
        # Add more choices as required
    ]
    type = models.CharField(max_length=20, choices=CAR_TYPES, default="SUV")
    year = models.IntegerField(
        default=2023,
        validators=[MaxValueValidator(2023), MinValueValidator(2015)]
    )
    # Other fields as needed

    def __str__(self):
        return self.name  # Return the name as the string representation


class Dealer(models.Model):
    id = models.IntegerField(primary_key=True)  # Match JSON
    full_name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    st = models.CharField(max_length=2)  # TX, NY, etc.
    address = models.CharField(max_length=200)
    zip_code = models.CharField(max_length=20)
    lat = models.FloatField()
    long = models.FloatField()
    short_name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.full_name
        
    class Meta:
        db_table = 'djangoapp_dealer'  # Consistent naming