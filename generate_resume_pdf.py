import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, ListFlowable, ListItem
from reportlab.pdfgen import canvas

pdf_path = os.path.join(r"d:\portfolio\public", "Mamidala_Vijay_Kumar_Resume.pdf")
pdf_path_alt = os.path.join(r"d:\portfolio\public", "resume.pdf")

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles
primary_color = colors.HexColor("#1A365D")  # Deep classic navy
dark_color = colors.HexColor("#1E293B")
link_color = colors.HexColor("#0D6EFD")

name_style = ParagraphStyle(
    "ResumeName",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=18,
    leading=22,
    alignment=1, # Center
    textColor=primary_color
)

subtitle_style = ParagraphStyle(
    "ResumeSubtitle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10.5,
    leading=14,
    alignment=1,
    textColor=dark_color
)

contact_style = ParagraphStyle(
    "ResumeContact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=12,
    alignment=1,
    textColor=colors.HexColor("#334155")
)

heading_style = ParagraphStyle(
    "SectionHeading",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=13,
    textColor=primary_color,
    spaceAfter=2,
    textTransform="uppercase"
)

body_style = ParagraphStyle(
    "ResumeBody",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=11.5,
    textColor=dark_color
)

body_bold_style = ParagraphStyle(
    "ResumeBodyBold",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.5,
    leading=11.5,
    textColor=dark_color
)

bullet_style = ParagraphStyle(
    "ResumeBullet",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=11.5,
    textColor=dark_color,
    leftIndent=12,
    firstLineIndent=-8,
    spaceAfter=2
)

elements = []

# Header
elements.append(Paragraph("MAMIDALA VIJAY KUMAR", name_style))
elements.append(Spacer(1, 2))
elements.append(Paragraph("AI/ML Engineer | Generative AI | Full-Stack Developer", subtitle_style))
elements.append(Spacer(1, 2))
elements.append(Paragraph(
    '7569032323 | <a href="mailto:mamidalavijay04@gmail.com" color="#0D6EFD"><u>mamidalavijay04@gmail.com</u></a> | Hyderabad, Telangana',
    contact_style
))
elements.append(Paragraph(
    '<a href="https://github.com/Vijay1822" color="#0D6EFD"><u>github.com/Vijay1822</u></a> | <a href="https://www.linkedin.com/in/vijay-kumar-09b2bb36a" color="#0D6EFD"><u>linkedin.com/in/vijay-kumar-09b2bb36a</u></a>',
    contact_style
))
elements.append(Spacer(1, 6))

def add_section_header(title):
    elements.append(Paragraph(title, heading_style))
    elements.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=4))

# PROFESSIONAL SUMMARY
add_section_header("PROFESSIONAL SUMMARY")
summary_text = (
    "B.Tech Computer Science & Engineering (IoT) student at VNR VJIET with a 9.45 CGPA, focused on Artificial "
    "Intelligence, Generative AI, and full-stack development. Builds AI-powered web applications using Python, JavaScript, "
    "React, Node.js, MongoDB, RAG, and LLMs. Built and deployed BudgetMind, an AI-driven budget optimization and "
    "procurement memory platform. Participant in Smart India Hackathon and Adobe Hackathon; interested in AI agents "
    "and production-oriented software engineering."
)
elements.append(Paragraph(summary_text, body_style))
elements.append(Spacer(1, 5))

# EDUCATION
add_section_header("EDUCATION")
edu_table_data = [
    [
        Paragraph("<b>VNR VJIET, Hyderabad</b>", body_style),
        Paragraph("<b>Expected 2029</b>", ParagraphStyle("RightAlign", parent=body_style, alignment=2))
    ]
]
edu_table = Table(edu_table_data, colWidths=[380, 160])
edu_table.setStyle(TableStyle([
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("LEFTPADDING", (0,0), (-1,-1), 0),
    ("RIGHTPADDING", (0,0), (-1,-1), 0),
    ("TOPPADDING", (0,0), (-1,-1), 0),
    ("BOTTOMPADDING", (0,0), (-1,-1), 0),
]))
elements.append(edu_table)
elements.append(Paragraph("B.Tech in Computer Science & Engineering (IoT)", body_style))
elements.append(Paragraph("<b>CGPA: 9.45/10</b> | <b>Class XII:</b> 992 marks | <b>Class X:</b> 10.0 CGPA", body_style))
elements.append(Spacer(1, 5))

# TECHNICAL SKILLS
add_section_header("TECHNICAL SKILLS")
elements.append(Paragraph("<b>Languages:</b> Python, Java, C++, JavaScript", body_style))
elements.append(Paragraph("<b>Frontend:</b> HTML, CSS, React", body_style))
elements.append(Paragraph("<b>Backend:</b> Node.js, Express.js", body_style))
elements.append(Paragraph("<b>AI/ML:</b> Machine Learning, Generative AI, LLMs, Retrieval-Augmented Generation (RAG)", body_style))
elements.append(Paragraph("<b>Databases:</b> MongoDB, Supabase, Firebase", body_style))
elements.append(Paragraph("<b>Tools & Platforms:</b> Git, GitHub, Netlify, Vercel, Arduino, Blynk", body_style))
elements.append(Spacer(1, 5))

# PROJECTS
add_section_header("PROJECTS")
proj_header_data = [
    [
        Paragraph("<b>BudgetMind — AI Budget Optimizer & Procurement Memory Agent</b>", body_style),
        Paragraph('<a href="https://github.com/Vijay1822/BudgetMind" color="#0D6EFD"><u>GitHub</u></a> | <a href="https://budgetmind3.netlify.app/" color="#0D6EFD"><u>Live Demo</u></a>', ParagraphStyle("RightLinks", parent=body_style, alignment=2))
    ]
]
proj_table = Table(proj_header_data, colWidths=[380, 160])
proj_table.setStyle(TableStyle([
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("LEFTPADDING", (0,0), (-1,-1), 0),
    ("RIGHTPADDING", (0,0), (-1,-1), 0),
    ("TOPPADDING", (0,0), (-1,-1), 0),
    ("BOTTOMPADDING", (0,0), (-1,-1), 0),
]))
elements.append(proj_table)
elements.append(Paragraph("<i>Python, JavaScript, React, Node.js, MongoDB, RAG, LLMs</i>", ParagraphStyle("ItalicStack", parent=body_style, fontName="Helvetica-Oblique", textColor=colors.HexColor("#475569"))))
elements.append(Spacer(1, 2))
elements.append(Paragraph("• Developed an AI-powered budgeting platform that analyzes requirements and available budget to generate minimal, complete, value-focused spending plans.", bullet_style))
elements.append(Paragraph("• Implemented procurement intelligence to flag unnecessary or duplicate expenses, compare options, and account for recurring costs, hidden costs, and contingency reserves.", bullet_style))
elements.append(Paragraph("• Built memory-driven workflows that learn from past purchases, vendor experiences, budget overruns, savings, and procurement outcomes.", bullet_style))
elements.append(Paragraph("• Deployed the application as a live web platform on Netlify and maintained the codebase on GitHub.", bullet_style))
elements.append(Spacer(1, 4))

# HACKATHONS & COMPETITIONS
add_section_header("HACKATHONS & COMPETITIONS")
elements.append(Paragraph("• <b>Smart India Hackathon (SIH)</b> — Participated in a national-level innovation and problem-solving competition.", bullet_style))
elements.append(Paragraph("• <b>Adobe Hackathon</b> — Advanced to Round 2.", bullet_style))
elements.append(Spacer(1, 4))

# CERTIFICATIONS
add_section_header("CERTIFICATIONS")
elements.append(Paragraph("• <b>AI Full-Stack Web Development</b>", bullet_style))
elements.append(Spacer(1, 4))

# CODING PROFILES
add_section_header("CODING PROFILES")
elements.append(Paragraph('• <b>LeetCode</b> — <a href="https://leetcode.com/u/Vijay_kumar2008" color="#0D6EFD"><u>leetcode.com/u/Vijay_kumar2008</u></a>', bullet_style))

doc.build(elements)

# Also write to resume.pdf
import shutil
shutil.copy(pdf_path, pdf_path_alt)

print(f"Successfully generated {pdf_path} and {pdf_path_alt}")
