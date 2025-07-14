import { ContactForm } from '@/components/ContactForm'

export const metadata = {
  title: 'Contact - Costa Rica Travel Blog',
  description: 'Get in touch with our team of Costa Rica travel experts.',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions about Costa Rica? We'd love to help you plan your adventure!
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <ContactForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">General Inquiries</h3>
                <p className="text-gray-600">
                  Have questions about our content or want to share your Costa Rica experiences? 
                  We'd love to hear from you!
                </p>
                <p className="text-primary font-medium mt-2">info@costaricatravel.com</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Travel Planning</h3>
                <p className="text-gray-600">
                  Need help planning your Costa Rica trip? Our travel experts are here to help 
                  with recommendations and insider tips.
                </p>
                <p className="text-primary font-medium mt-2">travel@costaricatravel.com</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Photography</h3>
                <p className="text-gray-600">
                  Interested in wildlife photography tours or have questions about capturing 
                  Costa Rica's natural beauty?
                </p>
                <p className="text-primary font-medium mt-2">photo@costaricatravel.com</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Best Time to Visit</h3>
                  <p className="text-gray-600">December to April (dry season)</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Currency</h3>
                  <p className="text-gray-600">Costa Rican Colón (CRC) and US Dollar</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Language</h3>
                  <p className="text-gray-600">Spanish (English widely spoken in tourist areas)</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Time Zone</h3>
                  <p className="text-gray-600">Central Standard Time (CST)</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Visa Requirements</h3>
                  <p className="text-gray-600">Most visitors can stay 90 days visa-free</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}