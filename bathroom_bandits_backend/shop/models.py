from django.db import models

# models.py (using MongoEngine)
from mongoengine import Document, StringField, DecimalField, BooleanField, ReferenceField

class Product(Document):
    name = StringField(max_length=255, required=True)
    description = StringField()
    price = DecimalField(min_value=0)
    image_url = StringField()
    in_stock = BooleanField(default=True)
    category = StringField(max_length=255)

class User(Document):
    user_id = StringField(max_length=255, unique=True)
    email = StringField(required=True, unique=True)
    password_hash = StringField()
    created_at = StringField()

class Payment(Document):
    user = ReferenceField(User, reverse_delete_rule='CASCADE')
    card_number = StringField(max_length=16)
    card_expiry = StringField(max_length=5)
    card_cvv = StringField(max_length=4)
    billing_address = StringField()

class Contact(Document):
    name = StringField(max_length=255, required=True)
    email = StringField(required=True)
    message = StringField()

class DealOfTheWeek(Document):
    title = StringField(max_length=255, required=True)
    description = StringField()
    product = ReferenceField(Product, reverse_delete_rule='CASCADE')
    discount_percentage = DecimalField(min_value=0)

