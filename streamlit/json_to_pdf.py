# from fpdf import FPDF

def generate_symptoms_pdf(data, filename="symptoms.pdf"):
    # Create a new FPDF object
    pdf = FPDF()

    # Add a new page
    pdf.add_page()

    # Set font properties
    pdf.set_font("Arial", "B", 16)

    # Add title
    pdf.cell(0, 10, "Symptom Checklist", align="C")
    pdf.ln(10)

    # Set font properties for symptom labels
    pdf.set_font("Arial", "B", 12)

    # Iterate through the data and add symptom labels and descriptions
    for dict_ in data:
        for symptom, description in dict_.items():
            pdf.cell(40, 10, symptom, align="L")
            pdf.set_font("Arial", "", 10)
            pdf.multi_cell(0, 5, description, align="L")
            pdf.set_font("Arial", "B", 12)
            pdf.ln(5)

    # Save the PDF file
    pdf.output(filename)