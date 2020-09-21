### Order Endpoint

## GET /api/v1/orders

Return list of orders based on query provided.
Will return all orders if query not provided.

# Query params
- hotelName
- customerName
- customerPhone
- customerEmail

# Example

Request URL: `api/v1/orders?customerName=David&customerPhone=12345678`
Response:
```
{
    "status": "SUCCESS",
    "orders": [
        {
            "paymentID": [
                "5f67ed976992770013b63383"
            ],
            "_id": "5f67ed972bb91f0013f6e4e0",
            "hotelID": "hotel888",
            "hotelName": "First World Hotel",
            "customerName": "David",
            "customerEmail": "hello@test.com",
            "customerPhone": 12345678,
            "roomID": "room_123",
            "roomName": "Double Deluxe",
            "numberOfGuests": 2,
            "totalAmount": 149.99,
            "__v": 0
        }
    ]
}
```

## POST /api/v1/orders

Create new order

# Request JSON Body
- totalAmount
- hotelName
- hotelID"
- checkInDate
- checkOutDate
- customerName
- customerEmail
- customerPhone
- roomID
- roomName
- numberOfGuests

# Example

Sample Request
```
{
    "totalAmount": 149.99,
    "hotelName": "First World Hotel",
    "hotelID": "hotel888",
    "checkInDate": "2020-11-08",
    "checkOutDate": "2020-11-15",
    "customerName": "David",
    "customerEmail": "hello@test.com",
    "customerPhone": "012345678",
    "roomID": "room_123",
    "roomName": "Double Deluxe",
    "numberOfGuests": 2
}
```

Sample Response
```
{
    "status": "SUCCESS",
    "obj": {
        "paymentID": [
            "5f67ed976992770013b63383"
        ],
        "_id": "5f67ed972bb91f0013f6e4e0",
        "hotelID": "hotel888",
        "hotelName": "First World Hotel",
        "customerName": "David",
        "customerEmail": "hello@test.com",
        "customerPhone": 12345678,
        "roomID": "room_123",
        "roomName": "Double Deluxe",
        "numberOfGuests": 2,
        "totalAmount": 149.99
    }
}
```