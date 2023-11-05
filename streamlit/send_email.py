import base64
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition

# Define your function here
def send_email_with_attachment(pdf_bytes, recipients, patient, sender_email, time, hospital, filename='PatientHealth.pdf'):
    encoded_file = base64.b64encode(pdf_bytes).decode()

    attachment = Attachment(
        FileContent(encoded_file),
        FileName(filename),
        FileType('application/pdf'),
        Disposition('attachment')
    )
    
    # Make sure to replace the API key with an environment variable or secure storage
    # Never hardcode your API keys in your code
    sg = SendGridAPIClient("your_sendgrid_api_key")

    html_content = f"""
                    <html>
                    <body>
                        <p>This PDF was generated at <strong>{time}</strong> and was sent to the <strong>{hospital}</strong>.</p>
                        <p>Sender: <a href='mailto:{sender_email}'>{sender_email}</a></p>
                    </body>
                    </html>
                    """


    for recipient in recipients:
        message = Mail(
            from_email="andrewhahn0201@gmail.com",
            to_emails=recipient,
            subject=("PDF Patient Data From Health Chronicles" + patient),
            html_content=html_content)
        
        message.attachment = attachment
        
        try:
            response = sg.send(message)
            print(f"Email to {recipient} sent! Status code: {response.status_code}")
        except Exception as e:
            print(f"An error occurred: {e}")

# # Example usage:
# pdf_bytes = b'...'  # Your PDF data in bytes
# recipients_list = ['recipient1@example.com', 'recipient2@example.com']  # The list of recipients
# subject = 'Your Subject Here'
# content = '<strong>and easy to do anywhere, even with Python</strong>'
# sender_email = 'sender@example.com'

# send_email_with_attachment(pdf_bytes, recipients_list, patient, content, sender_email)
