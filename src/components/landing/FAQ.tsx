const faqs = [
  {
    question: 'Is Vizly free to use?',
    answer: 'Yes! All users can use up to 10 messages a month for free. After reaching the limit, you can upgrade your plan to get unlimited queries and more features.',
  },
  {
    question: 'How do I get started?',
    answer: 'Sign up to Vizly and immediately start asking questions and creating visualizations with your data. For more information, check out our documentation.',
  },
  {
    question: 'What data sources are supported?',
    answer: 'We currently support CSV, JSON, and Excel files. If you want Vizly to specialize in analyzing data from other sources, reach out to us.',
  },
  {
    question: 'Does Vizly have a student discount?',
    answer: 'Yes! We offer a 50% discount to all students and academics. Sign up with your academic email to have the discount automatically applied or email us.',
  },
];

export function FAQ() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Common questions
          </h2>
        </div>
        <dl className="mx-auto mt-16 max-w-2xl space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white p-8 rounded-lg shadow-sm">
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                {faq.question}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}