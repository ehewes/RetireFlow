# RetireFlow
### HackLondon 2025 Submission
## **Potential Ideas**
- https://www.videcom.com
Modernise this, flight reservation system. Still highly used within the industry and could add some type of AI scheduling. ( anything AI 🤣 )

- RetireFlow, pension processing system to update a legacy industry.

# Pension Processing System Modernization

This project reimagines the U.S. federal pension processing system, managed by the Office of Personnel Management (OPM), using vector search for a hackathon demo. Below is an explanation of the current system and our approach to replicate and enhance it.

## Summary of the Current Pension Processing System

As of March 1, 2025, the OPM manages retirement applications for federal employees through an outdated, paper-based process:

- **Submission**: Federal employees submit paper applications to their agency’s HR office, containing details such as years of service, salary history, and benefit elections.
- **Transfer**: Applications are physically transported (e.g., via trucks) to the OPM Retirement Operations Center in Boyers, Pennsylvania, housed in a limestone mine facility known as Iron Mountain.
- **Manual Processing**: Over 700 workers manually process approximately 10,000 applications per month. They review files stored in manila envelopes and cardboard boxes, calculate benefits, and resolve discrepancies like court orders or incomplete forms.
- **Delays**: Processing takes an average of 57 days, with delays extending to 128+ days due to manual handling, understaffing, or complex cases such as workers’ compensation claims.
- **Output**: Retirees receive an initial payment and ongoing annuity, though status updates are minimal during the waiting period.

The system’s dependence on paper and manual labor results in inefficiencies, with digitization efforts (e.g., a pilot online platform) still incomplete.

---

## Hackathon Replication with Vector Search

For the hackathon, we’ve designed a digital alternative using **vector search** to streamline retirement application processing. Vector search employs embeddings—numerical representations of data—to enable rapid, semantic searches across structured or unstructured data, contrasting sharply with the OPM’s manual approach.

### Core System Design

#### 1. Data Ingestion
- **Input**: Retirement applications are simulated as structured data (e.g., JSON) or unstructured data (e.g., scanned PDFs), including fields like name, years of service, salary history, and benefit options.
- **Preprocessing**: Text is extracted from PDFs using OCR and converted into structured data for processing.

#### 2. Vectorization
- Embeddings are generated for key data points (e.g., employee profiles, service history) using a model that captures semantic meaning, allowing for fuzzy matching of incomplete or varied inputs.
- These embeddings are stored in a vector database optimized for fast retrieval.

#### 3. Search and Processing
- **Vector Search**: The system queries the vector database with an application’s embedding to match similar records, verify data accuracy, or identify discrepancies (e.g., mismatched service years).
- **Automation**: Benefits are calculated automatically using predefined rules, eliminating manual computation.

#### 4. Output
- A summary PDF is generated with processed details, such as the retiree’s name, calculated benefits, and approval status, and returned to the user.

### Enhancements

1. **Semantic Error Detection**:
   - Vector similarity identifies anomalies, such as inconsistencies between service years and salary history, for review.
2. **Natural Language Queries**:
   - Users can pose questions (e.g., “What’s my annuity?”), with vector search retrieving answers from the data.
3. **Multi-Modal Search**:
   - Image embeddings process scanned handwritten forms or signatures, reflecting real-world paper inputs.
4. **Real-Time Status**:
   - A dashboard displays application statuses (e.g., “Processing,” “Approved”), improving transparency over OPM’s limited updates.
5. **Scalability**:
   - The system handles thousands of applications efficiently using vector search.
6. **AI Chatbot**:
   - An NLP-driven assistant guides users through the submission process.

---

## Why It’s Better
- **Speed**: Processing occurs in seconds, not 57+ days.
- **Digital**: Fully automated, eliminating paper.
- **Accuracy**: Semantic matching reduces human error.
- **User-Friendly**: Offers instant feedback and accessible results.
