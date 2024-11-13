import {useState} from 'react'
import axios from 'axios';
import PageHeader from '../components/PageHeader';

const formEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;

// Contact Form Component
const ContactForm = () => {
  // set up state for contact form submission
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // state for the form inputs:
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    //stop refreshing
    event.preventDefault();

    const contactForm = new FormData();
    contactForm.append("your-name", name);
    contactForm.append("your-email", email);
    contactForm.append("your-message", message);

    axios
      .post(formEndpoint, contactForm, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log(response);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  if (submitted) {
    // return success message
    return (
      <>
        <h3>Thank you!</h3>
        <p>We'll be in touch soon</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h3>Error!</h3>
        <p>Sorry, we were unable to send your message</p>
      </>
    )
  }
  
  // Form:
  return (
    <form
    onSubmit={handleSubmit}
    method="POST"
>
    <div>
        <label htmlFor="name">Name</label>
        <input
            type="text"
            name="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            required
        />
    </div>
    <div>
        <label htmlFor="email">Email</label>
        <input
            type="email"
            name="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
            required
        />
    </div>
    <div>
        <label htmlFor="message">Message</label>
        <textarea
            name="message"
            onChange={event => setMessage(event.target.value)}
            value={message}
            required
        />
    </div>
    <div>
        <button
            className="regular-button"
            type="submit"
        >
            Send a message
        </button>
    </div>
</form>
  )
};


const Contact = () => {
  return (
    <>
      <PageHeader title="Contact" image_url="/header_imgs/bg6.jpg"/>
        <div id='contact-container' className='container'>
          <div>
            <h2>Contact us</h2>
            <ContactForm />
          </div>
        </div>
    </>
  )
}

export default Contact
