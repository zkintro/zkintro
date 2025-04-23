import { useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

const NewsletterForm = ({ title = 'Subscribe to the newsletter' }) => {
  const inputEl = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Direct Convertkit form submission
    const formId = '5378243' // Your Convertkit form ID from .env file
    const email = inputEl.current.value

    try {
      // Use ConvertKit's direct form submission endpoint
      const url = `https://app.convertkit.com/forms/${formId}/subscriptions`

      // Create a hidden form and submit it directly
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = url
      form.target = '_blank' // Open in new tab to avoid navigation
      form.style.display = 'none'

      // Add email input
      const emailInput = document.createElement('input')
      emailInput.type = 'email'
      emailInput.name = 'email_address'
      emailInput.value = email
      form.appendChild(emailInput)

      // Submit the form
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)

      // Show success message
      inputEl.current.value = ''
      setError(false)
      setSubscribed(true)
      setMessage('Successfully! 🎉 You are now subscribed.')
    } catch (error) {
      setError(true)
      setMessage('An error occurred. Please try again or contact us.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <div>
          <label className="sr-only" htmlFor="email-input">
            Email address
          </label>
          <input
            autoComplete="email"
            className="w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
            id="email-input"
            name="email"
            placeholder={subscribed ? "You're subscribed !  🎉" : 'Enter your email'}
            ref={inputEl}
            required
            type="email"
            disabled={subscribed || loading}
          />
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3">
          <button
            className={`w-full rounded-md bg-primary-500 py-2 px-4 font-medium text-white sm:py-0 ${subscribed || loading ? 'cursor-default' : 'hover:bg-primary-700 dark:hover:bg-primary-400'
              } focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`}
            type="submit"
            disabled={subscribed || loading}
          >
            {loading ? 'Processing...' : subscribed ? 'Thank you!' : 'Sign up'}
          </button>
        </div>
      </form>
      {error && (
        <div className="w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">{message}</div>
      )}
      {subscribed && !error && (
        <div className="w-72 pt-2 text-sm text-primary-500 dark:text-primary-400 sm:w-96">{message}</div>
      )}
    </div>
  )
}

export default NewsletterForm

export const BlogNewsletterForm = ({ title }) => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={title} />
    </div>
  </div>
)
