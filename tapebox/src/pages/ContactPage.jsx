import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <main className="flex-1 max-w-4xl mx-auto p-8 w-full">
      <h2 className="text-3xl sm:text-4xl text-orange-600 font-medium mb-4">Get In Touch</h2>
      <p className="text-gray-700 text-base sm:text-lg mb-12">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

      {submitted && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-300 rounded-lg text-orange-700 font-medium">
          Thank you for your message! We will get back to you soon.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl text-orange-600 font-medium mb-6">Send us a message</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input type="text" id="name" name="name" required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input type="email" id="email" name="email" required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
              <input type="text" id="subject" name="subject" required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea id="message" name="message" rows="5" required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition duration-300">
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl text-orange-600 font-medium mb-6">Contact Information</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">📍 Address</h4>
              <p className="text-gray-600">Habeeb Oyewole Street<br />Gbagada, Lagos</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">📞 Phone</h4>
              <p className="text-gray-600"><a href="tel:08140450440" className="text-orange-500 hover:text-orange-600">08140450440</a></p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">✉️ Email</h4>
              <p className="text-gray-600"><a href="mailto:balogujeremiah.8@gmail.com" className="text-orange-500 hover:text-orange-600">balogujeremiah.8@gmail.com</a></p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">🕒 Business Hours</h4>
              <p className="text-gray-600">Monday – Friday: 8am – 8pm<br />Saturday: 9am – 5pm<br />Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
