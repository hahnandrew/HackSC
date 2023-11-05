import sendgrid
import os
from sendgrid.helpers.mail import Mail, Email, To, Content

sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
api_key=os.environ.get('SENDGRID_API_KEY')
print(api_key)
FROM_EMAIL=os.environ.get('FROM_EMAIL')
TO_EMAIL=os.environ.get('TO_EMAIL')
from_email = Email(FROM_EMAIL)  # Change to your verified sender
to_email = To(TO_EMAIL)  # Change to your recipient
# subject = "Sending with SendGrid is Fun"
# content = Content("text/plain", "and easy to do anywhere, even with Python")
# mail = Mail(from_email, to_email, subject, content)

# # Get a JSON-ready representation of the Mail object
# mail_json = mail.get()

# # Send an HTTP POST request to /mail/send
# response = sg.client.mail.send.post(request_body=mail_json)
# print(response.status_code)
# print(response.headers)
