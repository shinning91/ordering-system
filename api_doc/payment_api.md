### Payment Endpoint

## GET /api/v1/payments

Return single payment based on paymentID provided.

# Query params
- paymentID

# Example

Request URL: `/api/v1/payments?paymentID=5f67ed976992770013b63383`
Response:
```
{
    "status": "SUCCESS",
    "payment": {
        "status": "complete",
        "_id": "5f67ed976992770013b63383",
        "totalAmount": 149.99,
        "createdDate": "2020-09-21T00:02:31.214Z",
        "__v": 0
    }
}
```

## POST /api/v1/payments

If totalAmount query param provided, will initialize a new payment object with status `pending`.
Else check for if credit card details provide and update status to `complete`.
Return created or updated payment object as response.

# Query params
- totalAmount (Required for payment initialize)
- paymentID (Required for payment process)

# Request JSON Body
- creditCardNum (Required for payment process)
- creditCardName (Required for payment process)
- creditCardExpDate (Required for payment process)
- creditCardCCV (Required for payment process)

# Example

Sample Request
```
{
    "creditCardNum": 112344,
    "creditCardName": "David",
    "creditCardExpDate": "11/25",
    "creditCardCCV": 345
}
```

Sample Response
```
{
    "status": "SUCCESS",
    "payment": {
        "status": "complete",
        "_id": "5f67ed976992770013b63383",
        "totalAmount": 149.99,
        "createdDate": "2020-09-21T00:02:31.214Z",
        "__v": 0
    }
}
```