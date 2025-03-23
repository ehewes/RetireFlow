const questions = [
    {
        id: 1,
        question: "What is RetireFlow?",
        answer: "RetireFlow is a high-speed pension processing platform that modernizes retirement planning and management. It replaces outdated, paper-based systems with AI-driven automation for faster, error-free processing. By streamlining workflows, it ensures retirees receive benefits efficiently and without delays."
    },
    {
        id: 2,
        question: "How does it work?",
        answer:
            "RetireFlow uses AI and vector search to process pension applications quickly and accurately. It extracts key details using OCR, verifies records, and automates benefit calculations. Real-time status updates provide transparency, reducing the traditional waiting period.",
    },
    {
        id: 3,
        question: "Who is it for?",
        answer:
            "RetireFlow serves pension administrators, HR professionals, and individuals planning for retirement. Government agencies and financial institutions use it to modernize pension workflows. Retirees benefit from automated calculations and faster, more transparent processing",
    },
    {
        id: 4,
        question: "What are the benefits?",
        answer:
            "RetireFlow drastically cuts processing time, reducing pension approval from months to near-instant results. It enhances accuracy by eliminating manual errors and automating calculations. Real-time tracking, scalability, and improved security make it a superior alternative to traditional pension systems.",
    },
]
const FAQ = () => { 

    return (
        <div className="bg-white min-h-screen">
        <h1 className="mt-5 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5x; sm:items-center text-center">Frequently Asked Questions</h1>

            <div className="flex flex-col gap-5 mt-15 p-10">
                {questions.map((q) => (
                    <div key={q.id} className="bg-white flex flex-col rounded-xl shadow-md p-6 transition-shadow duration-600 ease-in-out hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-black mb-4 text-center">{q.question}</h2>
                        <p className="text-black text-center">{q.answer}</p>
                    </div>
                ))}
            </div>
    </div> 
  );

} 
export default FAQ;