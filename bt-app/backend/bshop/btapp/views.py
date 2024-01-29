from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from square.client import Client

@csrf_exempt
def process_payment(request):
    client = Client(
        access_token='EAAAl6h_DVMnsuL8ZHiY5UqRtHpNTg0jjVgJbkndePEqQikyYM1xV9j_6GKikXSn',
        environment='sandbox'
    )

    data = json.loads(request.body)
    payment_body = {
        "source_id": data['sourceId'],
        "idempotency_key": data['idempotencyKey'],
        "amount_money": {
            "amount": int(float(data['amount']) * 100),  # Convert to cents
            "currency": "USD"
        }
    }

    response = client.payments.create_payment(body=payment_body)

    if response.is_success():
        return JsonResponse(response.body, safe=False)
    elif response.is_error():
        return JsonResponse(response.errors, status=400, safe=False)
