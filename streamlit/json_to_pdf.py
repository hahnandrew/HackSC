from fpdf2 import FPDF
from io import BytesIO


def generate_symptoms_pdf(json_list, filename='symptom.pdf'):

    # Create a new FPDF object
    pdf = FPDF()

    # set auto page break
    pdf.set_auto_page_break(auto=True, margin=15)

    # Add a new page
    pdf.add_page()

    #pdf.set_margins(left=0.5, top=0.5, right=0.5)

    # Set font properties
    pdf.set_font("Arial", "B", 16)

    # Add title
    pdf.set_fill_color(0, 0, 128)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(w=120, h=15, txt="Health Chronicles", fill=1)
    pdf.cell(w=0, h=15, txt="Symptom Checklist", fill=1)#, align="R")
    pdf.ln(10)
    pdf.ln(10)

    pdf.set_text_color(0, 0, 0)

    pdf.cell(100, 12, "Report Summary Shared With: ")#, align="R")

    pdf.set_font("Arial", "U", 14)
    for dict_ in json_list:
        for k,v in dict_.items():
            if k == 'hospital_name':
                pdf.set_font("Arial", "U", 13)
                pdf.cell(0, 12, f"{v}")


    pdf.ln(10)
    pdf.ln(10)

    # Patient's Info
    pdf.set_font("Arial", "U", 14)
    pdf.set_fill_color(211, 211, 211)
    pdf.cell(w=0, h=10, txt="Patient's Information", fill=1)


    pdf.ln(10)

    for dict_ in json_list:
        for k,v in dict_.items():
            if k == 'Patient Name':
                pdf.set_font("Arial", "B", 10)
                pdf.cell(100, 7, f"Patient Name: {v}", border=True)

    for dict_ in json_list:
        for k,v in dict_.items():
            if k == 'Phone Number':
                pdf.set_font("Arial", "B", 10)
                pdf.cell(0, 7, f"Phone Number: {v}", border=True, ln=True)

    for dict_ in json_list:
        for k,v in dict_.items():
            if k == 'Email':
                pdf.set_font("Arial", "B", 10)
                pdf.cell(100, 7, f"Email: {v}", border=True)

    for dict_ in json_list:
        for k,v in dict_.items():
            if k == 'Date and Time':
                pdf.set_font("Arial", "B", 10)
                pdf.cell(0, 7, f"Date: {v}", border=True, ln=True)


    pdf.ln(10)


    pdf.cell(100, 7, f"Are you having a pain today: Y", border=True)
    pdf.cell(0, 7, f"Severity of Pain: ", border=True, ln=True)

    pdf.ln(10)

    # Symptoms's Info
    pdf.set_font("Arial", "U", 14)
    pdf.set_fill_color(211, 211, 211)
    pdf.cell(w=0, h=10, txt="Patient's Symptoms", fill=1)
    pdf.ln(10)

    for dict_ in json_list:
        for k,v in dict_.items():
            if k not in ['Patient Name', 'Phone Number', 'Email', 'Date and Time', 'hospital_name']:
                pdf.set_font("Arial", "U", 12)
                pdf.cell(40, 7, f"{k}",  border=True)
                pdf.set_font("Arial", "", 10)
                pdf.multi_cell(0, 7, f"{v}", border=True)
                pdf.ln(3)

    # # Save the PDF file
    # pdf.output(filename)
    # pdf_content = pdf.output(dest='S').encode('latin-1') 
    # pdf_output = BytesIO(pdf_content)
    # return pdf_output
    # Save the PDF file
    pdf.output(filename)
    pdf_content = pdf.output(dest='S')  # Get PDF content as bytes
    pdf_output = BytesIO(pdf_content)   # Convert to BytesIO object
    return pdf_output
